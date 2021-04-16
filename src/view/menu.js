import {capitalizeFirstLetter, createElement} from '../utils.js';

const createMenuItem = (filter) => {
  const {name, count} = filter;
  return `<a href="#${name}" class="main-navigation__item">${capitalizeFirstLetter(name)} <span class="main-navigation__item-count">${count}</span></a>`;
};

const createMenu = (filters) => {
  const menuFilters = filters
    .map((filter) => createMenuItem(filter))
    .join('');
  return `<nav class="main-navigation">
    <div class="main-navigation__items">
      <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
      ${menuFilters}
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>`;
};

export default class Menu {
  constructor(filters) {
    this._filters = filters;
    this._element = null;
  }
  getTemplate() {
    return createMenu(this._filters);
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


