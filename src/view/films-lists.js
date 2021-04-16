import {createElement} from '../utils';

const createListsTemplate = () => {
  return '<section class="films"></section>';
};

export default class Lists {
  constructor() {
    this._element = null;
  }
  getTemplate() {
    return createListsTemplate();
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
