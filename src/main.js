import {ProfileRatingComponent} from "./components/profile-rating.js";
import {FooterStatisticsComponent} from "./components/footer-statistics.js";
import {films, profileRating} from "./mock/film.js";
import {render} from "./utils/render.js";

import {renderFilms} from "./controllers/page-controller.js";

const headerElement = document.querySelector(`.header`);

render(headerElement, new ProfileRatingComponent(profileRating));

const footerStatisticsElement = document.querySelector(`.footer__statistics`);

render(footerStatisticsElement, new FooterStatisticsComponent(films.length));

renderFilms();
