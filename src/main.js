import {generatePoints} from './mock/point.js';
import {renderTemplate, RenderPosition} from './view/utils.js';
import SiteNavigation from './view/menu.js';
import RouteInfo from './view/route-info.js';
import Filters from './view/filters.js';
import PointsSort from './view/sort.js';
import EventList from './view/event-list.js';
import Event from './view/event.js';
import Form from './view/add-form.js';
// import {createArr, getRandomArrayElement, getRandomInt} from './view/utils.js';

const POINTS_COUNT = 3;
const points = new Array(POINTS_COUNT).fill(null).map(generatePoints);

const routeInfoContainer = document.querySelector('.trip-main');
const filtersContainer = document.querySelector('.trip-controls__filters');
const mainContainer = document.querySelector('.trip-events');
const eventsContainer = document.querySelector('.page-main');
const menuNavContainer = document.querySelector('.trip-controls__navigation');

const events = new EventList().getTemplate();
renderTemplate(mainContainer, events, RenderPosition.BEFOREEND);
renderTemplate(routeInfoContainer, new RouteInfo().getTemplate(), RenderPosition.AFTERBEGIN);
renderTemplate(menuNavContainer, new SiteNavigation().getTemplate(), RenderPosition.BEFOREEND);
renderTemplate(filtersContainer, new Filters().getTemplate(), RenderPosition.BEFOREEND);
renderTemplate(mainContainer, new PointsSort().getTemplate(), RenderPosition.BEFOREEND);

const renderEvent = (list, data) => {
  const eventPoint = new Event(data).getElement();
  const editForm = new Form(data).getElement();

  const openEditFormButton = eventPoint.querySelector('.event__rollup-btn'); // is not a function
  const closeEditFormButton = editForm.querySelector('.event__rollup-btn'); // is not a function
  const editFormElement = eventsContainer.querySelector('form'); // is not a function

  const replacePointToForm = () => {
    events.replaceChild(eventPoint, editForm);
  };

  const replaceFormToEvent = () => {
    events.replaceChild(editForm, eventPoint);
  };

  openEditFormButton.addEventListener('click', () => replacePointToForm());
  closeEditFormButton.addEventListener('click', () => replaceFormToEvent());
  editFormElement.addEventListener('submit', () => replaceFormToEvent());

  renderTemplate(events, eventPoint, RenderPosition.BEFOREEND); // container.insertAdjacentHTML is not a function
};

for (let i = 0; i < points.length; i++) {
  renderEvent(events, points[i]);
}
