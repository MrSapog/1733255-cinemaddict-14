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
    this._topRatedFilmsListComponent = new TopRatedFilmsListView();
    this._mostCommentedFilmsListComponent = new MostCommentedFilmsListView();
    this._footerStatisticComponent = new FooterStatisticView(TOTAL_FILMS_COUNT);
    this._handleFilmChange = this._handleFilmChange.bind(this);
  }
  init(films) {
    this._films = films.slice();
    renderElement(this._boardHeader, this._userRankComponent, RenderPosition.BEFOREEND);
    renderElement(this._boardContainer, this._menuComponent, RenderPosition.BEFOREEND);
    renderElement(this._boardContainer, this._sortMenuComponent, RenderPosition.BEFOREEND);
    renderElement(this._boardContainer, this._listsComponent, RenderPosition.BEFOREEND);
    renderElement(this._boardFooter, this._footerStatisticComponent, RenderPosition.BEFOREEND);
    this._renderBoard();
  }
  _handleFilmChange(updatedFilm) {
    console.log(this._films.find((prevFilm) => prevFilm.id === updatedFilm.id));
    this._films = updateItem(this._films, updatedFilm);
    console.log(updatedFilm);
    this._filmPresenter[updatedFilm.id].init(updatedFilm);
  }
  _renderAllFilmsList(films) {
    renderElement(this._listsComponent, this._allFilmsListComponent, RenderPosition.BEFOREEND);
    const allFilmsList = this._allFilmsListComponent.getElement().querySelector('#all-films');
    for (let i = 0; i < RENDER_FILMS_COUNT && i < TOTAL_FILMS_COUNT; i++) {
      const filmPresenter = new FilmPresenter(allFilmsList, this._handleFilmChange);
      filmPresenter.init(films[i]);
      this._filmPresenter[films[i].id] = filmPresenter;
    }
    if (films.length > RENDER_FILMS_COUNT) {
      this._renderMoreButton(films, allFilmsList);
    }
  }
  _renderTopRatedFilmsList(films) {
    renderElement(this._listsComponent, this._topRatedFilmsListComponent, RenderPosition.BEFOREEND);
    const topRatedFilmsList = this._topRatedFilmsListComponent.getElement().querySelector('#top-rated-films');
    const generatedFilmsByRating = films.slice().sort((a, b) => b.rating - a.rating);
    for (let i = 0; i < RENDER_EXTRA_FILMS_COUNT; i++) {
      const filmPresenter = new FilmPresenter(topRatedFilmsList, this._handleFilmChange);
      filmPresenter.init(generatedFilmsByRating[i]);
    }
  }
  _renderMostCommentedFilmsList(films) {
    renderElement(this._listsComponent, this._mostCommentedFilmsListComponent, RenderPosition.BEFOREEND);
    const mostCommentedFilmsList = this._mostCommentedFilmsListComponent.getElement().querySelector('#most-commented-films');
    const generatedFilmsByCommentsCount = films.slice().sort((a, b) => b.comments.length - a.comments.length);
    for (let i = 0; i < RENDER_EXTRA_FILMS_COUNT; i++) {
      const filmPresenter = new FilmPresenter(mostCommentedFilmsList, this._handleFilmChange);
      filmPresenter.init(generatedFilmsByCommentsCount[i]);
    }
  }
  _handleMoreButtonClick(films, container, moreButtonComponent) {
    for (let i = this._renderFilmsCount; i < this._renderFilmsCount + RENDER_FILMS_COUNT; i++) {
      const filmPresenter = new FilmPresenter(container, this._handleFilmChange);
      filmPresenter.init(films[i]);
      if (i === TOTAL_FILMS_COUNT - 1) {
        remove(moreButtonComponent);
        return;
      }
    }
    this._renderFilmsCount += RENDER_FILMS_COUNT;
  }
  _renderMoreButton(films, container) {
    const moreButtonComponent = new MoreButtonView();
    const filmsList = this._listsComponent.getElement().querySelector('.films-list');
    renderElement(filmsList, moreButtonComponent, RenderPosition.BEFOREEND);
    moreButtonComponent.setClickHandler(() => {
      this._handleMoreButtonClick(films, container, moreButtonComponent);
    });
  }
  _renderBoard() {
    this._renderAllFilmsList(this._films);
    this._renderTopRatedFilmsList(this._films);
    this._renderMostCommentedFilmsList(this._films);
  }
}
