import AbstractView from './abstract.js';

const createMostCommentedFilmsListTemplate = () => {
  return `<section class="films-list films-list--extra">
      <h2 class="films-list__title">Most commented</h2>
      <div class="films-list__container" id="most-commented-films">
      </div>
    </section>`;
};

export default class MostCommentedFilmsList extends AbstractView {
  getTemplate() {
    return createMostCommentedFilmsListTemplate();
  }
}

