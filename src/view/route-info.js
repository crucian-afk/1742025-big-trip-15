import AbstractView from './abstract.js';

const createRouteInfoTemplate = () => (`<section class="trip-main__trip-info  trip-info">
  <div class="trip-info__main">
    <h1 class="trip-info__title">Amsterdam &mdash; Moscow &mdash; Geneva</h1>

    <p class="trip-info__dates">Mar 18&nbsp;&mdash;&nbsp;20</p>
  </div>

  <p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">1725</span>
  </p>
</section>
`);

export default class RouteInfo extends AbstractView {
  getTemplate() {
    return createRouteInfoTemplate();
  }
}
