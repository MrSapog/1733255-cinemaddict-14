import AbstractView from './abstract';

const createFooterStatisticTemplate = (amount) => {
  let moviesSpelling = 'movies';
  if (amount === 1) {
    moviesSpelling = 'movie';
  }
  return `<p>${amount} ${moviesSpelling} inside</p>`;
};

export default class FooterStatistic extends AbstractView {
  constructor(amount) {
    super();
    this._amount = amount;
  }
  getTemplate() {
    return createFooterStatisticTemplate(this._amount);
  }
}
