import {rendereMenu} from './view/menu.js';
import {renderRouteInfoTemplate} from './view/route-info.js';
import {renderSortTemplate} from './view/sort.js';
import {addFormTemplate} from './view/add-form.js';
import {mainContentTemplate} from './view/main-content.js';
import {renderWaypointTemplate} from './view/waypoint.js';
import {generatePoints} from './mock/point.js';

const POINTS_COUNT = 17;
const points = new Array(POINTS_COUNT).fill().map(generatePoints);

const renderMarkup = (container, markup, place) => {
  container.insertAdjacentHTML(place, markup);
};

const menuContainer = document.querySelector('.trip-main__trip-controls');
renderMarkup(menuContainer, renderRouteInfoTemplate(points[0]), 'beforebegin');
renderMarkup(menuContainer, rendereMenu(), 'beforeend');

const mainSectionContainer = document.querySelector('.trip-events');
renderMarkup(mainSectionContainer, renderSortTemplate(), 'afterbegin');
renderMarkup(mainSectionContainer, mainContentTemplate(), 'beforeend');

const eventsList = mainSectionContainer.querySelector('.trip-events__list');
renderMarkup(eventsList, addFormTemplate(points[0]), 'afterbegin');

points.forEach((point) => {
  renderMarkup(eventsList, renderWaypointTemplate(point), 'beforeend');
});
