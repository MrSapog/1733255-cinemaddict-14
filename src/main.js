import {generateFilm} from './mock/film.js';
import {generateFilter} from './mock/filters.js';
import FilmBoardPresenter from './presenter/board.js';

export const TOTAL_FILMS_COUNT = 20;

const generatedFilms = new Array(TOTAL_FILMS_COUNT).fill().map(() => generateFilm());
const generatedFilters = generateFilter(generatedFilms);

const siteHeader = document.querySelector('header');
const siteMain = document.querySelector('main');
const siteFooter = document.querySelector('.footer__statistics');

const boardPresenter = new FilmBoardPresenter(siteHeader, siteMain, siteFooter, generatedFilters);

boardPresenter.init(generatedFilms);

