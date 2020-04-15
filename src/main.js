import {ProfileRatingComponent} from "./components/profile-rating.js";
import {MainNavigationComponent} from "./components/main-navigation.js";
import {SortComponent} from "./components/sort.js";
import {ContentContainerComponent} from "./components/content-container.js";
import {FilmCardComponent} from "./components/film-card.js";
import {ShowMoreButtonComponent} from "./components/show-more-button.js";
import {FilmsListExtraContainerComponent} from "./components/films-list-extra-container.js";
import {FooterStatisticsComponent} from "./components/footer-statistics.js";
import {FilmDetailsComponent} from "./components/film-details.js";
import {NoDataComponent} from "./components/no-data.js";
import {films, navigationCount, profileRating} from "./mock/film.js";
import {EXTRA_FILM_CONTAINERS} from "./const.js";
import {render} from "./utils.js";

const EXTRA_FILM_COUNT = 2;
const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;

const bodyElement = document.querySelector(`body`);

const renderFilm = (filmsListElement, film) => {
  const showFilmDetails = () => {
    bodyElement.appendChild(filmDetailsComponent.getElement());
  };

  const hideFilmDetails = () => {
    bodyElement.removeChild(filmDetailsComponent.getElement());
  };

  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;
    if (isEscKey) {
      hideFilmDetails();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const filmCardComponent = new FilmCardComponent(film);

  filmCardComponent.getElement().addEventListener(`click`, (evt) => {
    const target = evt.target.classList;
    if (target.contains(`film-card__poster`)
      || target.contains(`film-card__title`)
      || target.contains(`film-card__comments`)) {
      evt.preventDefault();
      showFilmDetails();
      document.addEventListener(`keydown`, onEscKeyDown);
    }
  });

  const filmDetailsComponent = new FilmDetailsComponent(film);
  const closeButton = filmDetailsComponent.getElement().querySelector(`.film-details__close-btn`);

  closeButton.addEventListener(`click`, () => {
    hideFilmDetails();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  render(filmsListElement, filmCardComponent.getElement());
};

const headerElement = document.querySelector(`.header`);

render(headerElement, new ProfileRatingComponent(profileRating).getElement());

const mainElement = document.querySelector(`.main`);

render(mainElement, new MainNavigationComponent(navigationCount).getElement());
render(mainElement, new SortComponent().getElement());

const renderFilms = () => {
  if (films.length === 0) {
    render(mainElement, new NoDataComponent().getElement());
    return;
  }

  render(mainElement, new ContentContainerComponent().getElement());

  const filmsListContainerElement = mainElement.querySelector(`.films-list__container`);

  let showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;

  films.slice(0, showingFilmsCount)
    .forEach((film) => renderFilm(filmsListContainerElement, film));

  const filmsListElement = mainElement.querySelector(`.films-list`);

  render(filmsListElement, new ShowMoreButtonComponent().getElement());

  const showMoreButton = filmsListElement.querySelector(`.films-list__show-more`);

  showMoreButton.addEventListener(`click`, () => {
    const prevTasksCount = showingFilmsCount;
    showingFilmsCount = showingFilmsCount + SHOWING_FILMS_COUNT_BY_BUTTON;

    films.slice(prevTasksCount, showingFilmsCount)
      .forEach((film) => renderFilm(filmsListContainerElement, film));

    if (showingFilmsCount >= films.length) {
      showMoreButton.remove();
    }
  });

  const filmsElement = mainElement.querySelector(`.films`);

  for (const containerName of EXTRA_FILM_CONTAINERS) {
    render(filmsElement, new FilmsListExtraContainerComponent(containerName).getElement());
  }

  const [filmsTopRatedElement, filmsMostCommentedElement] = mainElement.querySelectorAll(`.films-list--extra > .films-list__container`);

  const topRatedFilms = films.slice().sort((a, b) => b.rating - a.rating);
  const mostCommentedFilms = films.slice().sort((a, b) => b.comments.length - a.comments.length);

  for (let i = 0; i < EXTRA_FILM_COUNT; i++) {
    renderFilm(filmsTopRatedElement, topRatedFilms[i]);
    renderFilm(filmsMostCommentedElement, mostCommentedFilms[i]);
  }
};

renderFilms();

const footerStatisticsElement = document.querySelector(`.footer__statistics`);

render(footerStatisticsElement, new FooterStatisticsComponent(films.length).getElement());
