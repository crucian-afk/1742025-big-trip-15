import {generatePoints} from './mock/point.js';
import {RenderPosition, render, replace} from './view/utils/render.js';
import Menu from './view/menu.js';
import RouteInfo from './view/route-info.js';
import Filters from './view/filters.js';
import EventsSort from './view/events-sort.js';
import EventList from './view/event-list.js';
import Event from './view/event.js';
import EditForm from './view/edit-form.js';
import NoEvents from './view/no-events.js';

const pointsCount = 10;
const wayPoints = new Array(pointsCount).fill(null).map(generatePoints);

const tripMain = document.querySelector('.trip-main');
const tripControlsFilters = document.querySelector('.trip-controls__filters');
const tripEvents = document.querySelector('.trip-events');
const tripControlsNavigation = document.querySelector('.trip-controls__navigation');
const events = new EventList();
const noEventsMessage = new NoEvents();

if (pointsCount > 0) {
  render(tripMain, new RouteInfo(), RenderPosition.AFTERBEGIN);
  render(tripEvents, new EventsSort(), RenderPosition.AFTERBEGIN);
}
if (pointsCount === 0) {
  render(tripEvents, noEventsMessage, RenderPosition.BEFOREEND);
}

render(tripEvents, events, RenderPosition.BEFOREEND);
render(tripControlsNavigation, new Menu(), RenderPosition.BEFOREEND);
render(tripControlsFilters, new Filters(), RenderPosition.BEFOREEND);


const renderEvent = (list, data) => {
  const eventPoint = new Event(data);
  const editForm = new EditForm(data);
  const editFormElement = editForm.getElement();

  const replaceEventToForm = () => {
    replace(eventPoint, editForm);
  };

  const replaceFormToEvent = () => {
    replace(editForm, eventPoint);
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      replaceEventToForm();
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };

  eventPoint.setEditClickHandler(() => {
    if (editFormElement) {
      render(events, editFormElement, RenderPosition.AFTERBEGIN);
    }
    replaceFormToEvent();
    document.addEventListener('keydown', onEscKeyDown);
  });

  editForm.setformCloseHandler(() => {
    replaceEventToForm();
  });

  editForm.setformSubmitHandler(() => {
    replaceEventToForm();

  });

  render(events, eventPoint, RenderPosition.BEFOREEND);
};

for (let i = 0; i < wayPoints.length; i++) {
  renderEvent(events, wayPoints[i]);
}
