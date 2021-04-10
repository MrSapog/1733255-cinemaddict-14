import {createMenu} from './view/menu.js';
import {createLists} from './view/films-lists.js';
import {createFooterStatistic} from './view/statistic.js';
import {createCard} from './view/film-card.js';
import {createMoreButton} from './view/more-button.js';
import {createUserRank} from './view/user-rank.js';
import {createFilmDetailsPopup} from './view/popup.js';
import {generateFilm} from './mock/film.js';
import {generateFilter} from './mock/filters.js';

const TOTAL_FILMS_COUNT = 20;
const RENDER_FILMS_COUNT = 5;
const RENDER_EXTRA_FILMS_COUNT = 2;
const siteHeader = document.querySelector('header');
const siteMain = document.querySelector('main');
const siteFooter = document.querySelector('.footer__statistics');

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const generatedFilms = new Array(TOTAL_FILMS_COUNT).fill().map(() => generateFilm());
const generatedFilters = generateFilter(generatedFilms);

render(siteHeader, createUserRank(), 'beforeend');
render(siteMain, createMenu(generatedFilters), 'beforeend');
render(siteMain, createLists(), 'beforeend');

const filmsBlock = siteMain.querySelector('.films');
const allMoviesList = filmsBlock.querySelector('.films-list');
const allMoviesListFilms = document.getElementById('all-films');
const topRatedMoviesListFilms = document.getElementById('top-rated-films');
const mostCommentedMoviesListFilms = document.getElementById('most-commented-films');

render(allMoviesListFilms, createFilmDetailsPopup(generatedFilms[0]), 'beforeend');

for (let i = 0; i < RENDER_FILMS_COUNT && i < TOTAL_FILMS_COUNT; i++) {
  render(allMoviesListFilms, createCard(generatedFilms[i]), 'beforeend');
}

const generatedFilmsByRating = generatedFilms.slice().sort((a, b) => b.rating - a.rating);

for (let i = 0; i < RENDER_EXTRA_FILMS_COUNT; i++) {
  render(topRatedMoviesListFilms, createCard(generatedFilmsByRating[i]), 'beforeend');
}

const generatedFilmsByCommentsCount = generatedFilms.slice().sort((a, b) => b.comments.length - a.comments.length);

for (let i = 0; i < RENDER_EXTRA_FILMS_COUNT; i++) {
  render(mostCommentedMoviesListFilms, createCard(generatedFilmsByCommentsCount[i]), 'beforeend');
}

render(siteFooter, createFooterStatistic(TOTAL_FILMS_COUNT), 'beforeend');

if (generatedFilms.length > RENDER_FILMS_COUNT) {
  render(allMoviesList, createMoreButton(), 'beforeend');
}

const showMoreButton = document.querySelector('.films-list__show-more');

let renderedFilms = RENDER_FILMS_COUNT;

if (showMoreButton) {
  showMoreButton.addEventListener('click', () => {
    for (let i = renderedFilms; i < renderedFilms + RENDER_FILMS_COUNT; i++) {
      render(allMoviesListFilms, createCard(generatedFilms[i]), 'beforeend');
      if (i === TOTAL_FILMS_COUNT - 1) {
        showMoreButton.style.display = 'none';
        return;
      }
    }
    renderedFilms += RENDER_FILMS_COUNT;
  });
}

