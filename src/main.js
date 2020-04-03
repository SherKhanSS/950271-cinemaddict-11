import {createProfileRatingTemplate} from "./components/profile-rating.js";
import {createMainNavigationTemplate} from "./components/main-navigation.js";
import {createSortTemplate} from "./components/sort.js";
import {createContentContainerTemplate} from "./components/content-container.js";
import {createFilmCardTemplate} from "./components/film-card.js";
import {createShowMoreButtonTemplate} from "./components/show-more-button.js";
import {createFilmsListExtraContainerTemplate} from "./components/films-list-extra-container.js";
import {createFooterStatisticsTemplate} from "./components/footer-statistics.js";

const FILM_COUNT = 5;
const EXTRA_FILM_COUNT = 2;
const EXTRA_FILM_LIST = 2;

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const headerElement = document.querySelector(`.header`);

render(headerElement, createProfileRatingTemplate());

const mainElement = document.querySelector(`.main`);

render(mainElement, createMainNavigationTemplate());
render(mainElement, createSortTemplate());
render(mainElement, createContentContainerTemplate());

const filmsListContainerElement = mainElement.querySelector(`.films-list__container`);

for (let i = 0; i < FILM_COUNT; i++) {
  render(filmsListContainerElement, createFilmCardTemplate());
}

const filmsListElement = mainElement.querySelector(`.films-list`);

render(filmsListElement, createShowMoreButtonTemplate());

const filmsElement = mainElement.querySelector(`.films`);

for (let i = 0; i < EXTRA_FILM_LIST; i++) {
  render(filmsElement, createFilmsListExtraContainerTemplate());
}

const [filmsTopRatedElement, filmsMostCommentedElement] = mainElement.querySelectorAll(`.films-list--extra > .films-list__container`);

for (let i = 0; i < EXTRA_FILM_COUNT; i++) {
  render(filmsTopRatedElement, createFilmCardTemplate());
  render(filmsMostCommentedElement, createFilmCardTemplate());
}

const footerStatisticsElement = document.querySelector(`.footer__statistics`);

render(footerStatisticsElement, createFooterStatisticsTemplate());
