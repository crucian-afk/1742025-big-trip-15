import {generatePoints} from './mock/point.js';
import {renderElement, RenderPosition} from './view/utils.js';
import SiteNavigation from './view/menu.js';
import RouteInfo from './view/route-info.js';
import Filters from './view/filters.js';
import PointsSort from './view/sort.js';
import EventList from './view/event-list.js';
import Event from './view/event.js';
import Form from './view/add-form.js';

const POINTS_COUNT = 10;
const points = new Array(POINTS_COUNT).fill(null).map(generatePoints);

const routeInfoContainer = document.querySelector('.trip-main');
const filtersContainer = document.querySelector('.trip-controls__filters');
const mainContainer = document.querySelector('.trip-events');
const menuNavContainer = document.querySelector('.trip-controls__navigation');

const events = new EventList();
renderElement(mainContainer, events.getElement(), RenderPosition.BEFOREEND);
renderElement(routeInfoContainer, new RouteInfo().getElement(), RenderPosition.AFTERBEGIN);
renderElement(menuNavContainer, new SiteNavigation().getElement(), RenderPosition.BEFOREEND);
renderElement(filtersContainer, new Filters().getElement(), RenderPosition.BEFOREEND);
renderElement(mainContainer, new PointsSort().getElement(), RenderPosition.AFTERBEGIN);

const renderEvent = (list, data) => {
  const eventPoint = new Event(data).getElement();
  const editForm = new Form(data);
  const editFormElement = editForm.getElement();

  const openEditFormButton = eventPoint.querySelector('.event__rollup-btn');
  const closeEditFormButton = editFormElement.querySelector('.event__reset-btn');
  const eventList = document.querySelector('.trip-events__list');

  const replacePointToForm = () => {
    eventList.replaceChild(eventPoint, editFormElement);
  };

  const replaceFormToEvent = () => {
    eventList.replaceChild(editFormElement, eventPoint);
  };

  openEditFormButton.addEventListener('click', () => {
    if (editFormElement) {
      renderElement(events.getElement(), editFormElement, RenderPosition.AFTERBEGIN);
    }
  });
  closeEditFormButton.addEventListener('click', () => {
    replacePointToForm();
  });
  editFormElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
    replaceFormToEvent();
  });

  renderElement(events.getElement(), eventPoint, RenderPosition.BEFOREEND);
};

for (let i = 0; i < points.length; i++) {
  renderEvent(events, points[i]);
}
