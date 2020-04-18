import {MainNavigationComponent} from "../components/main-navigation.js";
import {SortComponent} from "../components/sort.js";
import {ContentContainerComponent} from "../components/content-container.js";
import {FilmCardComponent} from "../components/film-card.js";
import {ShowMoreButtonComponent} from "../components/show-more-button.js";
import {FilmsListExtraContainerComponent} from "../components/films-list-extra-container.js";
import {FilmDetailsComponent} from "../components/film-details.js";
import {NoDataComponent} from "../components/no-data.js";
import {films, navigationCount} from "../mock/film.js";
import {EXTRA_FILM_CONTAINERS} from "../const.js";
import {render, remove} from "../utils/render.js";

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

  filmCardComponent.setClickHandler((evt) => {
    evt.preventDefault();
    showFilmDetails();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  const filmDetailsComponent = new FilmDetailsComponent(film);

  filmDetailsComponent.setClickHandler(() => {
    hideFilmDetails();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  render(filmsListElement, filmCardComponent);
};

const mainElement = document.querySelector(`.main`);

render(mainElement, new MainNavigationComponent(navigationCount));
render(mainElement, new SortComponent());

export const renderFilms = () => {
  if (films.length === 0) {
    render(mainElement, new NoDataComponent());
    return;
  }

  render(mainElement, new ContentContainerComponent());

  const filmsListContainerElement = mainElement.querySelector(`.films-list__container`);

  let showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;

  films.slice(0, showingFilmsCount)
    .forEach((film) => renderFilm(filmsListContainerElement, film));

  const filmsListElement = mainElement.querySelector(`.films-list`);

  const showMoreButton = new ShowMoreButtonComponent();

  render(filmsListElement, showMoreButton);

  showMoreButton.setClickHandler(() => {
    const prevTasksCount = showingFilmsCount;
    showingFilmsCount += SHOWING_FILMS_COUNT_BY_BUTTON;

    films.slice(prevTasksCount, showingFilmsCount)
      .forEach((film) => renderFilm(filmsListContainerElement, film));

    if (showingFilmsCount >= films.length) {
      remove(showMoreButton);
    }
  });

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

export class PageController {
  constructor(container) {
    this._container = container;

    this._mainNavigationComponent = new MainNavigationComponent();
    this._sortComponent = new SortComponent();
    this._contentContainerComponent = new ContentContainerComponent();
    this._filmCardComponent = new FilmCardComponent();
    this._showMoreButtonComponent = new ShowMoreButtonComponent();
    this._filmsListExtraContainerComponent = new FilmsListExtraContainerComponent();
    this._filmDetailsComponent = new FilmDetailsComponent();
    this._noDataComponent = new NoDataComponent();
  }

  render(tasks) {
    const renderLoadMoreButton = () => {
      if (showingTasksCount >= tasks.length) {
        return;
      }

      render(container, this._loadMoreButtonComponent, RenderPosition.BEFOREEND);

      this._loadMoreButtonComponent.setClickHandler(() => {
        const prevTasksCount = showingTasksCount;
        showingTasksCount = showingTasksCount + SHOWING_TASKS_COUNT_BY_BUTTON;

        const sortedTasks = getSortedTasks(tasks, this._sortComponent.getSortType(), prevTasksCount, showingTasksCount);

        renderTasks(taskListElement, sortedTasks);

        if (showingTasksCount >= tasks.length) {
          remove(this._loadMoreButtonComponent);
        }
      });
    };

    const container = this._container.getElement();
    const isAllTasksArchived = tasks.every((task) => task.isArchive);

    if (isAllTasksArchived) {
      render(container, this._noTasksComponent, RenderPosition.BEFOREEND);
      return;
    }

    render(container, this._sortComponent, RenderPosition.BEFOREEND);
    render(container, this._tasksComponent, RenderPosition.BEFOREEND);

    const taskListElement = this._tasksComponent.getElement();

    let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;

    renderTasks(taskListElement, tasks.slice(0, showingTasksCount));
    renderLoadMoreButton();

    this._sortComponent.setSortTypeChangeHandler((sortType) => {
      showingTasksCount = SHOWING_TASKS_COUNT_BY_BUTTON;

      const sortedTasks = getSortedTasks(tasks, sortType, 0, showingTasksCount);

      taskListElement.innerHTML = ``;

      renderTasks(taskListElement, sortedTasks);
      renderLoadMoreButton();
    });
  }
}
