import {createProfileRatingTemplate} from "./components/profile-rating.js";
import {createMainNavigationTemplate} from "./components/main-navigation.js";
import {createSortTemplate} from "./components/sort.js";
import {createContentContainerTemplate} from "./components/content-container.js";
import {createFilmCardTemplate} from "./components/film-card.js";
import {createShowMoreButtonTemplate} from "./components/show-more-button.js";
import {createFilmsListExtraContainerTemplate} from "./components/films-list-extra-container.js";
import {createFooterStatisticsTemplate} from "./components/footer-statistics.js";
import {createFilmDetailsTemplate} from "./components/film-details.js";
import {generateFilms} from "./mock/film.js";
import {getRandomInteger} from "./utils.js";
import {profileRating} from "./mock/profile-rating.js";
import {EXTRA_FILM_CONTAINERS} from "./const.js";

const FILM_COUNT = 20;
const EXTRA_FILM_COUNT = 2;
const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;

const films = generateFilms(FILM_COUNT);

const navigationQuantity = [
  getRandomInteger(0, films.length),
  getRandomInteger(0, films.length),
  getRandomInteger(0, films.length),
];

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const headerElement = document.querySelector(`.header`);

render(headerElement, createProfileRatingTemplate(profileRating));

const mainElement = document.querySelector(`.main`);

render(mainElement, createMainNavigationTemplate(navigationQuantity));
render(mainElement, createSortTemplate());
render(mainElement, createContentContainerTemplate());

const filmsListContainerElement = mainElement.querySelector(`.films-list__container`);

let showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;

films.slice(0, showingFilmsCount)
  .forEach((film) => render(filmsListContainerElement, createFilmCardTemplate(film)));

const filmsListElement = mainElement.querySelector(`.films-list`);

render(filmsListElement, createShowMoreButtonTemplate());

const showMoreButton = filmsListElement.querySelector(`.films-list__show-more`);

showMoreButton.addEventListener(`click`, () => {
  const prevTasksCount = showingFilmsCount;
  showingFilmsCount = showingFilmsCount + SHOWING_FILMS_COUNT_BY_BUTTON;

  films.slice(prevTasksCount, showingFilmsCount)
    .forEach((film) => render(filmsListContainerElement, createFilmCardTemplate(film)));

  if (showingFilmsCount >= films.length) {
    showMoreButton.remove();
  }
});

const filmsElement = mainElement.querySelector(`.films`);

for (const containerName of EXTRA_FILM_CONTAINERS) {
  render(filmsElement, createFilmsListExtraContainerTemplate(containerName));
}

const [filmsTopRatedElement, filmsMostCommentedElement] = mainElement.querySelectorAll(`.films-list--extra > .films-list__container`);

const topRatedFilms = films.slice().sort((a, b) => b.rating - a.rating);
const mostCommentedFilms = films.slice().sort((a, b) => b.comments.length - a.comments.length);

for (let i = 0; i < EXTRA_FILM_COUNT; i++) {
  render(filmsTopRatedElement, createFilmCardTemplate(topRatedFilms[i]));
  render(filmsMostCommentedElement, createFilmCardTemplate(mostCommentedFilms[i]));
}

const footerStatisticsElement = document.querySelector(`.footer__statistics`);

render(footerStatisticsElement, createFooterStatisticsTemplate(films.length));

const bodyElement = document.querySelector(`body`);

render(bodyElement, createFilmDetailsTemplate(films[0]));
document.querySelector(`.film-details`).style.display = `none`;
// временно попап скрыт
