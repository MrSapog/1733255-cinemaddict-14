import FilmCardView from '../view/film-card';
import FilmPopUpView from '../view/popup';
import {renderElement, replace, RenderPosition, remove} from '../utils/render';

export default class Film {
  constructor(filmListContainer, changeData) {
    this._filmListContainer = filmListContainer;
    this._changeData = changeData;
    this._filmCardComponent = null;
    this._filmPopUpComponent = null;
    this._renderPopUp = this._renderPopUp.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
  }
  init(film) {
    this._film = film;
    const prevFilmCardComponent = this._filmCardComponent;
    const prevFilmPopUpComponent = this._filmCardComponent;
    this._filmCardComponent = new FilmCardView(film);
    this._filmPopUpComponent = new FilmPopUpView(film);
    this._filmCardComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    console.log(prevFilmCardComponent)
    if (prevFilmCardComponent === null || prevFilmPopUpComponent === null) {
      // renderElement(this._filmListContainer, this._filmCardComponent, RenderPosition.BEFOREEND);
      this._renderFilm();
      return;
    }
    if (this._filmCardComponent.getElement().contains(prevFilmCardComponent.getElement())) {
      console.log('2')
      replace(this._filmCardComponent, prevFilmCardComponent);
    }
    if (this._filmPopUpComponent.getElement().contains(prevFilmCardComponent.getElement())) {
      replace(this._filmPopUpComponent, prevFilmPopUpComponent);
    }
    remove(prevFilmCardComponent);
    remove(prevFilmPopUpComponent);
  }
  _renderPopUp() {
    const siteBody = document.querySelector('body');
    siteBody.classList.add('hide-overflow');
    siteBody.appendChild(this._filmPopUpComponent.getElement());
    const filmPopUpCloseButton = this._filmPopUpComponent.getElement().querySelector('.film-details__close-btn');
    filmPopUpCloseButton.addEventListener('click', () => {
      siteBody.classList.remove('hide-overflow');
      siteBody.removeChild(this._filmPopUpComponent.getElement());
    });
  }
  _renderFilm() {
    renderElement(this._filmListContainer, this._filmCardComponent, RenderPosition.BEFOREEND);
    const filmCardPoster = this._filmCardComponent.getElement().querySelector('img');
    filmCardPoster.addEventListener('click', this._renderPopUp);
    const filmCardTitle = this._filmCardComponent.getElement().querySelector('h3');
    filmCardTitle.addEventListener('click', this._renderPopUp);
    const filmCardComments = this._filmCardComponent.getElement().querySelector('.film-card__comments');
    filmCardComments.addEventListener('click', this._renderPopUp);
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
