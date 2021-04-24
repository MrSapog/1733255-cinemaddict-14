import FilmCardView from '../view/film-card';
import FilmPopUpView from '../view/popup';
import {renderElement, replace, RenderPosition, remove} from '../utils/render';

const siteBody = document.querySelector('body');
const Mode = {
  CARD: 'CARD',
  POPUP: 'POPUP',
};

export default class Film {
  constructor(filmListContainer, changeData, changeMode) {
    this._filmListContainer = filmListContainer;
    this._changeData = changeData;
    this._changeMode = changeMode;
    this._filmCardComponent = null;
    this._filmPopUpComponent = null;
    this._mode = Mode.CARD;
    this._handleRenderPopUp = this._handleRenderPopUp.bind(this);
    this._handleWatchlistClick = this._handleWatchlistClick.bind(this);
    this._handleWatchedClick = this._handleWatchedClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleCloseButtonClick = this._handleCloseButtonClick.bind(this);
  }
  init(film) {
    this._film = film;
    const prevFilmCardComponent = this._filmCardComponent;
    const prevFilmPopUpComponent = this._filmPopUpComponent;
    this._filmCardComponent = new FilmCardView(film);
    this._filmPopUpComponent = new FilmPopUpView(film);
    this._filmCardComponent.setCommentsClickHandler(this._handleRenderPopUp);
    this._filmCardComponent.setTitleClickHandler(this._handleRenderPopUp);
    this._filmCardComponent.setPosterClickHandler(this._handleRenderPopUp);
    this._filmCardComponent.setWatchlistClickHandler(this._handleWatchlistClick);
    this._filmCardComponent.setWatchedClickHandler(this._handleWatchedClick);
    this._filmCardComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._filmPopUpComponent.setWatchlistClickHandler(this._handleWatchlistClick);
    this._filmPopUpComponent.setWatchedClickHandler(this._handleWatchedClick);
    this._filmPopUpComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._filmPopUpComponent.setCloseButtonClickHandler(this._handleCloseButtonClick);
    if (prevFilmCardComponent === null || prevFilmPopUpComponent === null) {
      renderElement(this._filmListContainer, this._filmCardComponent, RenderPosition.BEFOREEND);
      return;
    }
    if (this._mode === Mode.CARD) {
      replace(this._filmCardComponent, prevFilmCardComponent);
    }
    if (this._mode === Mode.POPUP) {
      replace(this._filmCardComponent, prevFilmCardComponent);
      replace(this._filmPopUpComponent, prevFilmPopUpComponent);
    }
    remove(prevFilmCardComponent);
    remove(prevFilmPopUpComponent);
  }
  resetMode() {
    this._mode = Mode.CARD;
  }
  _handleRenderPopUp() {
    const popUp = siteBody.querySelector('.film-details');
    if (popUp) {
      siteBody.removeChild(popUp);
      this._changeMode();
    }
    siteBody.classList.add('hide-overflow');
    renderElement(siteBody, this._filmPopUpComponent, RenderPosition.BEFOREEND);
    this._mode = Mode.POPUP;
  }
  _handleCloseButtonClick() {
    siteBody.classList.remove('hide-overflow');
    siteBody.removeChild(this._filmPopUpComponent.getElement());
    this._mode = Mode.CARD;
  }
  _handleWatchlistClick() {
    this._changeData(
      Object.assign(
        {},
        this._film,
        {
          isWatchlist: !this._film.isWatchlist,
        },
      ),
    );
  }
  _handleWatchedClick() {
    this._changeData(
      Object.assign(
        {},
        this._film,
        {
          isWatched: !this._film.isWatched,
        },
      ),
    );
  }
  _handleFavoriteClick() {
    this._changeData(
      Object.assign(
        {},
        this._film,
        {
          isFavorite: !this._film.isFavorite,
        },
      ),
    );
  }
}
