import AbstractView from './abstract.js';

const createFilmCardTemplate = (film) => {
  const {title, poster, description, rating, year, duration, genres, isWatchlist, isWatched, isFavorite, comments} = film;
  const watchlistActive = isWatchlist ? 'film-card__controls-item--active' : '';
  const watchedActive = isWatched ? 'film-card__controls-item--active' : '';
  const favoriteActive = isFavorite ? 'film-card__controls-item--active' : '';
  return `<article class="film-card">
          <h3 class="film-card__title">${title}</h3>
          <p class="film-card__rating">${rating}</p>
          <p class="film-card__info">
            <span class="film-card__year">${year}</span>
            <span class="film-card__duration">${duration}</span>
            <span class="film-card__genre">${genres[0]}</span>
          </p>
          <img src="${poster}" alt="" class="film-card__poster">
          <p class="film-card__description">${description}</p>
          <a class="film-card__comments">${comments.length} comments</a>
          <div class="film-card__controls">
            <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${watchlistActive}" type="button">Add to watchlist</button>
            <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${watchedActive}" type="button">Mark as watched</button>
            <button class="film-card__controls-item button film-card__controls-item--favorite ${favoriteActive}" type="button">Mark as favorite</button>
          </div>
        </article>`;
};

export default class FilmCard extends AbstractView {
  constructor(film) {
    super();
    this._film = film;
    this._commentsClickHandler = this._commentsClickHandler.bind(this);
    this._titleClickHandler = this._titleClickHandler.bind(this);
    this._posterClickHandler = this._posterClickHandler.bind(this);
    this._watchlistClickHandler = this._watchlistClickHandler.bind(this);
    this._watchedClickHandler = this._watchedClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
  }
  getTemplate() {
    return createFilmCardTemplate(this._film);
  }
  _commentsClickHandler(evt) {
    evt.preventDefault();
    this._callback.commentsClick();
  }
  _titleClickHandler(evt) {
    evt.preventDefault();
    this._callback.titleClick();
  }
  _posterClickHandler(evt) {
    evt.preventDefault();
    this._callback.posterClick();
  }
  _watchlistClickHandler(evt) {
    evt.preventDefault();
    this._callback.watchlistClick();
  }
  _watchedClickHandler(evt) {
    evt.preventDefault();
    this._callback.watchedClick();
  }
  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();
  }
  setCommentsClickHandler(callback) {
    this._callback.commentsClick = callback;
    this.getElement().querySelector('.film-card__comments').addEventListener('click', this._commentsClickHandler);
  }
  setTitleClickHandler(callback) {
    this._callback.titleClick = callback;
    this.getElement().querySelector('h3').addEventListener('click', this._titleClickHandler);
  }
  setPosterClickHandler(callback) {
    this._callback.posterClick = callback;
    this.getElement().querySelector('img').addEventListener('click', this._posterClickHandler);
  }
  setWatchlistClickHandler(callback) {
    this._callback.watchlistClick = callback;
    this.getElement().querySelector('.film-card__controls-item--add-to-watchlist').addEventListener('click', this._watchlistClickHandler);
  }
  setWatchedClickHandler(callback) {
    this._callback.watchedClick = callback;
    this.getElement().querySelector('.film-card__controls-item--mark-as-watched').addEventListener('click', this._watchedClickHandler);
  }
  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector('.film-card__controls-item--favorite').addEventListener('click', this._favoriteClickHandler);
  }
}
