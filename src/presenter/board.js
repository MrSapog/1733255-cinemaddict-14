import UserRankView from '../view/user-rank.js';
import MenuView from '../view/menu.js';
import SortMenuView from '../view/sort-menu.js';
import ListsView from '../view/films-lists.js';
import AllFilmsListView from '../view/all-films-list.js';
import TopRatedFilmsListView from '../view/top-rated-films-list.js';
import MostCommentedFilmsListView from '../view/most-commented-films-list.js';
import MoreButtonView from '../view/more-button.js';
import FooterStatisticView from '../view/statistic.js';
import FilmPresenter from './film.js';
import {renderElement, remove, RenderPosition} from '../utils/render.js';
import {updateItem} from '../utils/common.js';
import {TOTAL_FILMS_COUNT} from '../main.js';

const RENDER_FILMS_COUNT = 5;
const RENDER_EXTRA_FILMS_COUNT = 2;

export default class FilmBoard {
  constructor(boardHeader, boardContainer, boardFooter, filters) {
    this._filmPresenter = {};
    this._renderFilmsCount = RENDER_FILMS_COUNT;
    this._boardHeader = boardHeader;
    this._boardContainer = boardContainer;
    this._boardFooter = boardFooter;
    this._userRankComponent = new UserRankView();
    this._menuComponent = new MenuView(filters);
    this._sortMenuComponent = new SortMenuView();
    this._listsComponent = new ListsView();
    this._allFilmsListComponent = new AllFilmsListView();
    this._allFilmsListContainer = this._allFilmsListComponent.getElement().querySelector('#all-films');
    this._topRatedFilmsListComponent = new TopRatedFilmsListView();
    this._mostCommentedFilmsListComponent = new MostCommentedFilmsListView();
    this._moreButtonComponent = new MoreButtonView();
    this._footerStatisticComponent = new FooterStatisticView(TOTAL_FILMS_COUNT);
    this._handleFilmChange = this._handleFilmChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
  }
  init(films, filmsByRating, filmsByComments) {
    this._films = films.slice();
    this._filmsByRating = filmsByRating.slice();
    this._filmsByComments= filmsByComments.slice();
    renderElement(this._boardHeader, this._userRankComponent, RenderPosition.BEFOREEND);
    renderElement(this._boardContainer, this._menuComponent, RenderPosition.BEFOREEND);
    renderElement(this._boardContainer, this._sortMenuComponent, RenderPosition.BEFOREEND);
    renderElement(this._boardContainer, this._listsComponent, RenderPosition.BEFOREEND);
    renderElement(this._listsComponent, this._allFilmsListComponent, RenderPosition.BEFOREEND);
    renderElement(this._listsComponent, this._topRatedFilmsListComponent, RenderPosition.BEFOREEND);
    renderElement(this._listsComponent, this._mostCommentedFilmsListComponent, RenderPosition.BEFOREEND);
    renderElement(this._boardFooter, this._footerStatisticComponent, RenderPosition.BEFOREEND);
    this._renderBoard();
  }
  _handleModeChange() {
    Object
      .values(this._filmPresenter)
      .forEach((presenter) => presenter.resetMode());
  }
  _handleFilmChange(updatedFilm) {
    this._films = updateItem(this._films, updatedFilm);
    this._filmsByRating = updateItem(this._filmsByRating, updatedFilm);
    this._filmsByComments = updateItem(this._filmsByComments, updatedFilm);
    this._filmPresenter[updatedFilm.id].init(updatedFilm);
  }
  _renderFilm(list, film) {
    const filmPresenter = new FilmPresenter(list, this._handleFilmChange, this._handleModeChange);
    filmPresenter.init(film);
    this._filmPresenter[film.id] = filmPresenter;
  }
  _renderFilms(from, to, list, films) {
    films
      .slice(from, to)
      .forEach((film) => this._renderFilm(list, film));
  }
  _renderAllFilmsList(films) {
    this._renderFilms(0, Math.min(films.length, RENDER_FILMS_COUNT), this._allFilmsListContainer, this._films);
    if (films.length > RENDER_FILMS_COUNT) {
      this._renderMoreButton(this._allFilmsListContainer);
    }
  }
  _renderTopRatedFilmsList(films) {
    const topRatedFilmsList = this._topRatedFilmsListComponent.getElement().querySelector('#top-rated-films');
    this._renderFilms(0, Math.min(films.length, RENDER_EXTRA_FILMS_COUNT), topRatedFilmsList, this._filmsByRating);
  }
  _renderMostCommentedFilmsList(films) {
    const mostCommentedFilmsList = this._mostCommentedFilmsListComponent.getElement().querySelector('#most-commented-films');
    this._renderFilms(0, Math.min(films.length, RENDER_EXTRA_FILMS_COUNT), mostCommentedFilmsList, this._filmsByComments);
  }
  _handleMoreButtonClick(container) {
    this._renderFilms(this._renderFilmsCount, this._renderFilmsCount + RENDER_FILMS_COUNT, container);
    this._renderFilmsCount += RENDER_FILMS_COUNT;
    if (this._renderFilmsCount >= this._films.length) {
      remove(this._moreButtonComponent);
    }
  }
  _renderMoreButton() {
    renderElement(this._allFilmsListComponent, this._moreButtonComponent, RenderPosition.BEFOREEND);
    this._moreButtonComponent.setClickHandler(() => {
      this._handleMoreButtonClick(this._allFilmsListContainer);
    });
  }
  _renderBoard() {
    this._renderAllFilmsList(this._films);
    this._renderTopRatedFilmsList(this._filmsByRating);
    this._renderMostCommentedFilmsList(this._filmsByComments);
  }
}
