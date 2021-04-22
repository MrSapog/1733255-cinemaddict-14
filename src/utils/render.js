import FilmCardView from '../view/film-card.js';
import FilmPopUpView from '../view/popup.js';
import Abstract from '../view/abstract.js';

const siteBody = document.querySelector('body');

export const RenderPosition = {
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
};

export const renderElement = (container, element, place) => {
  if (container instanceof Abstract) {
    container = container.getElement();
  }
  if (element instanceof Abstract) {
    element = element.getElement();
  }
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

export const renderFilm = (list, film) => {
  const filmCardComponent = new FilmCardView(film);
  const filmPopUpComponent = new FilmPopUpView(film);
  renderElement(list, filmCardComponent, RenderPosition.BEFOREEND);
  const filmCardPoster = filmCardComponent.getElement().querySelector('img');
  const renderPopUp = () => {
    siteBody.classList.add('hide-overflow');
    siteBody.appendChild(filmPopUpComponent.getElement());
    const filmPopUpCloseButton = filmPopUpComponent.getElement().querySelector('.film-details__close-btn');
    filmPopUpCloseButton.addEventListener('click', () => {
      siteBody.classList.remove('hide-overflow');
      siteBody.removeChild(filmPopUpComponent.getElement());
    });
  };
  filmCardPoster.addEventListener('click', renderPopUp);
  const filmCardTitle = filmCardComponent.getElement().querySelector('h3');
  filmCardTitle.addEventListener('click', renderPopUp);
  const filmCardComments = filmCardComponent.getElement().querySelector('.film-card__comments');
  filmCardComments.addEventListener('click', renderPopUp);
};

export const remove = (component) => {
  if (!(component instanceof Abstract)) {
    throw new Error('Can remove only components');
  }

  component.getElement().remove();
  component.removeElement();
};
