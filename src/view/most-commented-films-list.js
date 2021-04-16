import {createElement} from '../utils';

const createMostCommentedFilmsListTemplate = () => {
  return `<section class="films-list films-list--extra">
      <h2 class="films-list__title">Most commented</h2>
      <div class="films-list__container" id="most-commented-films">
      </div>
    </section>`;
};

export default class MostCommentedFilmsList {
  constructor() {
    this._element = null;
  }
  getTemplate() {
    return createMostCommentedFilmsListTemplate();
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

