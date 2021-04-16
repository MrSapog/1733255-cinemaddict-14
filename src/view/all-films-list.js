import {createElement} from '../utils';

const createAllFilmsListTemplate = () => {
  return `<section class="films-list">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
      <div class="films-list__container" id="all-films">
      </div>
    </section>`;
};

export default class AllFilmsList {
  constructor() {
    this._element = null;
  }
  getTemplate() {
    return createAllFilmsListTemplate();
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

