import {MainNavigationComponent} from "./components/main-navigation.js";
import {SortComponent} from "./components/sort.js";
import {ProfileRatingComponent} from "./components/profile-rating.js";
import {FooterStatisticsComponent} from "./components/footer-statistics.js";
import {films, navigationCount, profileRating} from "./mock/film.js";
import {render} from "./utils/render.js";

import {renderFilms} from "./controllers/page-controller.js";
import {renderExtraFilm} from "./controllers/extra-films-controller.js";

const headerElement = document.querySelector(`.header`);

render(headerElement, new ProfileRatingComponent(profileRating));

const mainElement = document.querySelector(`.main`);

render(mainElement, new MainNavigationComponent(navigationCount));
render(mainElement, new SortComponent());

const footerStatisticsElement = document.querySelector(`.footer__statistics`);

render(footerStatisticsElement, new FooterStatisticsComponent(films.length));

renderFilms();
renderExtraFilm();
