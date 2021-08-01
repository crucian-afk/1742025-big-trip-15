import {rendereMenu} from './view/menu.js';
import {renderRouteInfoTemplate} from './view/route-info.js';
import {renderSortTemplate} from './view/sort.js';
import {addFormTemplate} from './view/add-form.js';
import {mainContentTemplate} from './view/main-content.js';
import {renderWaypointTemplate} from './view/waypoint.js';


const renderMarkup = (container, markup, place) => {
  container.insertAdjacentHTML(place, markup);
};

const menuContainer = document.querySelector('.trip-main__trip-controls');
renderMarkup(menuContainer, renderRouteInfoTemplate(), 'beforebegin');
renderMarkup(menuContainer, rendereMenu(), 'beforebegin');

const mainSectionContainer = document.querySelector('.trip-events');
renderMarkup(mainSectionContainer, renderSortTemplate(), 'afterbegin');
renderMarkup(mainSectionContainer, mainContentTemplate(), 'beforeend');

const eventsList = mainSectionContainer.querySelector('.trip-events__list');
renderMarkup(eventsList, addFormTemplate(), 'afterbegin');
renderMarkup(eventsList, renderWaypointTemplate(), 'beforeend');
