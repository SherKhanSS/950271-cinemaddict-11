import {FilmsListExtraContainerComponent} from "../components/films-list-extra-container.js";
import {EXTRA_FILM_CONTAINERS} from "../const.js";
import {renderFilm} from "./page-controller.js";
import {render} from "../utils/render.js";
import {films} from "../mock/film.js";

const EXTRA_FILM_COUNT = 2;

const mainElement = document.querySelector(`.main`);

export const renderExtraFilm = () => {
  if (films.length === 0) {
    return;
  }

  const filmsElement = mainElement.querySelector(`.films`);

  for (const containerName of EXTRA_FILM_CONTAINERS) {
    render(filmsElement, new FilmsListExtraContainerComponent(containerName));
  }

  const [filmsTopRatedElement, filmsMostCommentedElement] = mainElement.querySelectorAll(`.films-list--extra > .films-list__container`);

  const topRatedFilms = films.slice().sort((a, b) => b.rating - a.rating);
  const mostCommentedFilms = films.slice().sort((a, b) => b.comments.length - a.comments.length);

  for (let i = 0; i < EXTRA_FILM_COUNT; i++) {
    renderFilm(filmsTopRatedElement, topRatedFilms[i]);
    renderFilm(filmsMostCommentedElement, mostCommentedFilms[i]);
  }
};
