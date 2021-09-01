import EditForm from '../view/edit-form';
import Event from '../view/event';
import {render, RenderPosition, replace, remove} from '../view/utils/render';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class EventPresenter {
  constructor(eventListContainer, changeData, changeMode) {
    this._eventListContainer = eventListContainer;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._eventComponent = null;
    this._editFormComponent = null;
    this._mode = Mode.DEFAULT;

    this._handleEditClick = this._handleEditClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._handleFormClose = this._handleFormClose.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
  }

  init(data) {
    this.prevEventComponent = this._eventComponent;
    this.prevFormEditComponent = this._editFormComponent;

    this._event = data;
    this._eventComponent = new Event(data);
    this._editFormComponent = new EditForm(data);

    this._eventComponent.setEditClickHandler(this._handleEditClick);
    this._eventComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._editFormComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._editFormComponent.setFormCloseHandler(this._handleFormClose);
    this._editFormComponent.onEscKeyDownHandler(this._escKeyDownHandler);

    this.renderEventComponent();
    this.renderFormEditComponent();
  }

  destroy() {
    remove(this._eventComponent);
    remove(this._editFormComponent);
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceFormToEvent();
    }
  }

  renderEventComponent() {
    if (this.prevEventComponent === null || this.prevFormEditComponent === null) {
      render(this._eventListContainer, this._eventComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._mode === Mode.DEFAULT) {
      replace(this._eventComponent, this.prevEventComponent);
    }
  }

  renderFormEditComponent() {
    if (this._mode === Mode.EDITING) {
      replace(this._editFormComponent, this.prevFormEditComponent);
    }
  }

  _replaceEventToForm() {
    replace(this._editFormComponent, this._eventComponent);
    document.addEventListener('keydown', this._escKeyDownHandler);
    this._changeMode();
    this._mode = Mode.EDITING;
  }

  _replaceFormToEvent() {
    replace(this._eventComponent, this._editFormComponent);
    document.removeEventListener('keydown', this._escKeyDownHandler);
    this._mode = Mode.DEFAULT;
  }

  _escKeyDownHandler(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this._handleFormClose();
    }
  }

  _handleEditClick() {
    this._replaceEventToForm();
  }

  _handleFormSubmit() {
    this._replaceFormToEvent();
  }

  _handleFormClose() {
    this._replaceFormToEvent();
  }

  _handleFavoriteClick() {
    this._changeData(
      Object.assign(
        {},
        this._event,
        {
          isFavorite: !this._isFavorite,
        },
      ),
    );
  }
}
