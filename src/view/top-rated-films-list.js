import {createElement} from '../utils';

const createTopRatedFilmsListTemplate = () => {
  return `<section class="films-list films-list--extra">
      <h2 class="films-list__title">Top rated</h2>
      <div class="films-list__container" id="top-rated-films">
      </div>
    </section>`;
};

export default class TopRatedFilmsList {
  constructor() {
    this._element = null;
  }
  getTemplate() {
    return createTopRatedFilmsListTemplate();
  }
  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }
  removeElement() {
    this._element = null;
  }
}

