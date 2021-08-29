import EventList from '../view/event-list.js';
import EventsSort from '../view/events-sort.js';
import NoEvents from '../view/no-events.js';
import {render, RenderPosition} from '../view/utils/render.js';
import RouteInfo from '../view/route-info';
import EventPresenter from './event-presenter';
import Filters from '../view/filters';
import Menu from '../view/menu';
import {updateItem} from '../view/utils/common';

export const POINTS_COUNT = 10; // 10

export default class Trip {
  constructor(routeInfoContainer, filtersContainer, eventListContainer, menuContainer) {
    this._routeInfoContainer = routeInfoContainer;
    this._filtersContainer = filtersContainer;
    this._eventListContainer = eventListContainer;
    this._menuContainer = menuContainer;
    this._eventPresenter = new Map();

    this._tripComponent = new EventList();
    this._sortComponent = new EventsSort();
    this._noEventsComponent = new NoEvents();
    this._routeInfoComponent = new RouteInfo();
    this._filtersComponent = new Filters();
    this._menuComponent = new Menu();

    this._handleEventChange = this._handleEventChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
  }

  init(tripEvents) {
    this._tripEvents = tripEvents.slice();

    render(this._eventListContainer, this._tripComponent, RenderPosition.AFTERBEGIN);

    this._renderEventList();
    this._tripEvents.forEach((event) => this._renderEvent(event));
  }

  _handleModeChange() {
    this._eventPresenter.forEach((presenter) => presenter.resetView());
  }

  _handleEventChange(updatedEvent) {
    this._tripEvents = updateItem(this._tripEvents, updatedEvent);
    this._eventPresenter.get(updatedEvent.id).init(updatedEvent);
  }

  _renderSort() {
    render(this._tripComponent, this._sortComponent, RenderPosition.BEFOREEND);
  }

  _renderFilter() {
    render(this._filtersContainer, this._filtersComponent, RenderPosition.AFTERBEGIN);
  }

  _renderMenu() {
    render(this._menuContainer, this._menuComponent, RenderPosition.BEFOREEND);
  }

  _renderRouteInfo() {
    render(this._routeInfoContainer, this._routeInfoComponent, RenderPosition.AFTERBEGIN);
  }

  _renderEventList() {
    if (POINTS_COUNT === 0) {
      this._renderNoEvents();
      return;
    }

    this._renderRouteInfo();
    this._renderSort();
    this._renderFilter();
    this._renderMenu();

  }

  _renderEvent(data) {
    const eventPresenter = new EventPresenter(this._tripComponent, this._handleEventChange, this._handleModeChange);
    eventPresenter.init(data);
    this._eventPresenter.set(data.id, eventPresenter);
  }

  _renderNoEvents() {
    render(this._eventListContainer, this._noEventsComponent, RenderPosition.AFTERBEGIN);
  }
}
