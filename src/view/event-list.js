import AbstractView from './abstract.js';

const createMainContentTemplate = () => '<ul class="trip-events__list"></ul>';

export default class EventList extends AbstractView {
  getTemplate() {
    return createMainContentTemplate();
  }
}
