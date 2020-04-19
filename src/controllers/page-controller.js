import {SortComponent} from "../components/sort.js";
import {ContentContainerComponent} from "../components/content-container.js";
import {FilmCardComponent} from "../components/film-card.js";
import {ShowMoreButtonComponent} from "../components/show-more-button.js";
import {FilmDetailsComponent} from "../components/film-details.js";
import {NoDataComponent} from "../components/no-data.js";
import {SortType} from "../components/sort.js";
import {render, remove} from "../utils/render.js";

const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;

const renderFilm = (filmsListElement, film) => {
  const bodyElement = document.querySelector(`body`);
  const filmCardComponent = new FilmCardComponent(film);
  const filmDetailsComponent = new FilmDetailsComponent(film);

  const showFilmDetails = () => {
    bodyElement.append(filmDetailsComponent.getElement());
  };

  const hideFilmDetails = () => {
    filmDetailsComponent.getElement().remove();
  };

  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;
    if (isEscKey) {
      hideFilmDetails();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  filmCardComponent.setClickHandler((evt) => {
    evt.preventDefault();
    showFilmDetails();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  filmDetailsComponent.setClickHandler(() => {
    hideFilmDetails();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  render(filmsListElement, filmCardComponent);
};

const getSortedFilms = (films, sortType, from, to) => {
  let sortedFilms = [];
  const showingFilms = films.slice();

  switch (sortType) {
    case SortType.DATE:
      sortedFilms = showingFilms.sort((a, b) => b.year - a.year);
      break;
    case SortType.RATING:
      sortedFilms = showingFilms.sort((a, b) => b.rating - a.rating);
      break;
    case SortType.DEFAULT:
      sortedFilms = showingFilms;
      break;
  }

  return sortedFilms.slice(from, to);
};

const renderFilms = (filmListElement, films) => {
  films.forEach((film) => {
    renderFilm(filmListElement, film);
  });
};

class PageController {
  constructor(container) {
    this._container = container;

    this._sortComponent = new SortComponent();
    this._newnoDataComponent = new NoDataComponent();
    this._contentContainerComponent = new ContentContainerComponent();
    this._showMoreButtonComponent = new ShowMoreButtonComponent();
  }

  render(films) {
    let showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;
    const container = this._container;

    const renderShowLoadButtom = () => {
      if (showingFilmsCount >= films.length) {
        return;
      }

      render(filmsListElement, this._showMoreButtonComponent);

      this._showMoreButtonComponent.setClickHandler(() => {
        const prevFilmsCount = showingFilmsCount;
        showingFilmsCount += SHOWING_FILMS_COUNT_BY_BUTTON;

        const sortedFilms = getSortedFilms(films, this._sortComponent.getSortType(), prevFilmsCount, showingFilmsCount);

        renderFilms(filmsListContainerElement, sortedFilms);

        if (showingFilmsCount >= films.length) {
          remove(this._showMoreButtonComponent);
        }
      });
    };

    if (films.length === 0) {
      render(container, this._newnoDataComponent);
      return;
    }

    render(container, this._sortComponent);
    render(container, this._contentContainerComponent);

    const filmsListContainerElement = container.querySelector(`.films-list__container`);

    renderFilms(filmsListContainerElement, films.slice(0, showingFilmsCount));

    const filmsListElement = container.querySelector(`.films-list`);

    renderShowLoadButtom();

    this._sortComponent.setSortTypeChangeHandler((sortType) => {
      showingFilmsCount = SHOWING_FILMS_COUNT_BY_BUTTON;

      const sortedFilms = getSortedFilms(films, sortType, 0, showingFilmsCount);

      filmsListContainerElement.innerHTML = ``;

      renderFilms(filmsListContainerElement, sortedFilms);
      renderShowLoadButtom();
    });

  }
}

export {renderFilm, PageController};
