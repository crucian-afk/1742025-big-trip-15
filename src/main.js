import {generatePoints} from './mock/point.js';
import {RenderPosition, render, replace} from './view/utils/render.js';
import Menu from './view/menu.js';
import RouteInfo from './view/route-info.js';
import Filters from './view/filters.js';
import PointsSort from './view/points-sort.js';
import EventList from './view/event-list.js';
import Event from './view/event.js';
import EditForm from './view/edit-form.js';

const pointsCount = 10;
const wayPoints = new Array(pointsCount).fill(null).map(generatePoints);

const tripMain = document.querySelector('.trip-main');
const tripControlsFilters = document.querySelector('.trip-controls__filters');
const tripEvents = document.querySelector('.trip-events');
const tripControlsNavigation = document.querySelector('.trip-controls__navigation');
const events = new EventList();

render(tripEvents, events, RenderPosition.BEFOREEND);
render(tripMain, new RouteInfo(), RenderPosition.AFTERBEGIN);
render(tripControlsNavigation, new Menu(), RenderPosition.BEFOREEND);
render(tripControlsFilters, new Filters(), RenderPosition.BEFOREEND);
render(tripEvents, new PointsSort(), RenderPosition.AFTERBEGIN);

const renderEvent = (list, data) => {
  const eventPoint = new Event(data);
  const editForm = new EditForm(data);
  const editFormElement = editForm.getElement();

  const replacePointToForm = () => {
    replace(eventPoint, editForm);
  };

  const replaceFormToEvent = () => {
    replace(editForm, eventPoint);
  };

  eventPoint.setEditClickHandler(() => {
    if (editFormElement) {
      render(events, editFormElement, RenderPosition.AFTERBEGIN);
    }
    replaceFormToEvent();
  });
  editForm.setformCloseHandler(() => {
    replacePointToForm();
  });
  editForm.setformSubmitHandler(() => {
    replacePointToForm();
  });

  render(events, eventPoint, RenderPosition.BEFOREEND);
};

for (let i = 0; i < wayPoints.length; i++) {
  renderEvent(events, wayPoints[i]);
}
