import {createMenu} from './view/menu.js';
import {createLists} from './view/films-lists.js';
import {createCard} from './view/film-card.js';
import {createMoreButton} from './view/more-button.js';
import {createUserRank} from './view/user-rank.js';

const ALL_MOVIES_FILMS_COUNT = 5;
const EXTRA_MOVIES_FILMS_COUNT = 2;
const siteHeader = document.querySelector('header');
const siteMain = document.querySelector('main');

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

render(siteHeader, createUserRank(), 'beforeend');
render(siteMain, createMenu(), 'beforeend');
render(siteMain, createLists(), 'beforeend');

const filmsBlock = siteMain.querySelector('.films');
const allMoviesList = filmsBlock.querySelector('.films-list');
const allMoviesListFilms = allMoviesList.querySelector('.films-list__container');
const extraMoviesListsFilms = filmsBlock.querySelectorAll('.films-list--extra .films-list__container');

for (let i = 0; i < ALL_MOVIES_FILMS_COUNT; i++) {
  render(allMoviesListFilms, createCard(), 'beforeend');
}

for (let i = 0; i < EXTRA_MOVIES_FILMS_COUNT; i++) {
  extraMoviesListsFilms.forEach((list) => {
    render(list, createCard(), 'beforeend');
  });
}

render(allMoviesList, createMoreButton(), 'beforeend');


