import {generateFilm} from './mock/film.js';
import {generateFilter} from './mock/filters.js';
import {renderElement, renderFilm, remove, RenderPosition} from './utils/render.js';
import UserRankView from './view/user-rank.js';
import MenuView from './view/menu.js';
import SortMenuView from './view/sort-menu.js';
import ListsView from './view/films-lists.js';
import AllFilmsListView from './view/all-films-list.js';
import TopRatedFilmsListView from './view/top-rated-films-list.js';
import MostCommentedFilmsListView from './view/most-commented-films-list.js';
import MoreButtonView from './view/more-button.js';
import FooterStatisticView from './view/statistic.js';

const TOTAL_FILMS_COUNT = 20;
const RENDER_FILMS_COUNT = 5;
const RENDER_EXTRA_FILMS_COUNT = 2;
const siteHeader = document.querySelector('header');
const siteMain = document.querySelector('main');
const siteFooter = document.querySelector('.footer__statistics');

const generatedFilms = new Array(TOTAL_FILMS_COUNT).fill().map(() => generateFilm());
const generatedFilters = generateFilter(generatedFilms);

const userRank = new UserRankView();
renderElement(siteHeader, userRank, RenderPosition.BEFOREEND);

const menuComponent = new MenuView(generatedFilters);
renderElement(siteMain, menuComponent, RenderPosition.BEFOREEND);

const sortMenuComponent = new SortMenuView();
renderElement(siteMain, sortMenuComponent, RenderPosition.BEFOREEND);

const listsComponent = new ListsView();
renderElement(siteMain, listsComponent, RenderPosition.BEFOREEND);

const allFilmsListComponent = new AllFilmsListView();
renderElement(listsComponent, allFilmsListComponent, RenderPosition.BEFOREEND);

const topRatedFilmsListComponent = new TopRatedFilmsListView();
renderElement(listsComponent, topRatedFilmsListComponent, RenderPosition.BEFOREEND);

const mostCommentedFilmsListComponent = new MostCommentedFilmsListView();
renderElement(listsComponent, mostCommentedFilmsListComponent, RenderPosition.BEFOREEND);

const footerStatisticComponent = new FooterStatisticView(TOTAL_FILMS_COUNT);
renderElement(siteFooter, footerStatisticComponent, RenderPosition.BEFOREEND);

const filmsList = listsComponent.getElement().querySelector('.films-list');
const allFilmsList = allFilmsListComponent.getElement().querySelector('#all-films');
const topRatedFilmsList = topRatedFilmsListComponent.getElement().querySelector('#top-rated-films');
const mostCommentedFilmsList = mostCommentedFilmsListComponent.getElement().querySelector('#most-commented-films');

for (let i = 0; i < RENDER_FILMS_COUNT && i < TOTAL_FILMS_COUNT; i++) {
  renderFilm(allFilmsList, generatedFilms[i]);
}

const generatedFilmsByRating = generatedFilms.slice().sort((a, b) => b.rating - a.rating);

for (let i = 0; i < RENDER_EXTRA_FILMS_COUNT; i++) {
  renderFilm(topRatedFilmsList, generatedFilmsByRating[i]);
}

const generatedFilmsByCommentsCount = generatedFilms.slice().sort((a, b) => b.comments.length - a.comments.length);

for (let i = 0; i < RENDER_EXTRA_FILMS_COUNT; i++) {
  renderFilm(mostCommentedFilmsList, generatedFilmsByCommentsCount[i]);
}

if (generatedFilms.length > RENDER_FILMS_COUNT) {
  const moreButtonComponent = new MoreButtonView();
  renderElement(filmsList, moreButtonComponent, RenderPosition.BEFOREEND);
  let renderedFilms = RENDER_FILMS_COUNT;
  moreButtonComponent.setClickHandler(() => {
    for (let i = renderedFilms; i < renderedFilms + RENDER_FILMS_COUNT; i++) {
      renderFilm(allFilmsList, generatedFilms[i]);
      if (i === TOTAL_FILMS_COUNT - 1) {
        remove(moreButtonComponent);
        return;
      }
    }
    renderedFilms += RENDER_FILMS_COUNT;
  });
}

