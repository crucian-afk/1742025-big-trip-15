import {generatePoints} from './mock/point.js';
import Trip from './presenter/trip.js';
import {POINTS_COUNT} from './presenter/trip.js';

const wayPoints = new Array(POINTS_COUNT).fill(null).map(generatePoints);

const tripMain = document.querySelector('.trip-main');
const tripControlsFilters = document.querySelector('.trip-controls__filters');
const tripEvents = document.querySelector('.trip-events');
const tripControlsNavigation = document.querySelector('.trip-controls__navigation');

const tripPresenter = new Trip(tripMain, tripControlsFilters, tripEvents, tripControlsNavigation);

tripPresenter.init(wayPoints);
