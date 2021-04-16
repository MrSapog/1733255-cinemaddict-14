import {createElement} from '../utils';

const createFooterStatisticTemplate = (amount) => {
  let moviesSpelling = 'movies';
  if (amount === 1) {
    moviesSpelling = 'movie';
  }
  return `<p>${amount} ${moviesSpelling} inside</p>`;
};

export default class FooterStatistic {
  constructor(amount) {
    this._amount = amount;
    this._element = null;
  }
  getTemplate() {
    return createFooterStatisticTemplate(this._amount);
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
