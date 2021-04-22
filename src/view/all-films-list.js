import AbstractView from './abstract.js';

const createAllFilmsListTemplate = () => {
  return `<section class="films-list">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
      <div class="films-list__container" id="all-films">
      </div>
    </section>`;
};

export default class AllFilmsList extends AbstractView {
  getTemplate() {
    return createAllFilmsListTemplate();
  }
}

