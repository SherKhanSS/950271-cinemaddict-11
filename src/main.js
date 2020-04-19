import {MainNavigationComponent} from "./components/main-navigation.js";
import {ProfileRatingComponent} from "./components/profile-rating.js";
import {FooterStatisticsComponent} from "./components/footer-statistics.js";
import {films, navigationCount, profileRating} from "./mock/film.js";
import {render} from "./utils/render.js";
import {PageController} from "./controllers/page-controller.js";
import {ExtraFilmsController} from "./controllers/extra-films-controller.js";

const headerElement = document.querySelector(`.header`);

render(headerElement, new ProfileRatingComponent(profileRating));

const mainElement = document.querySelector(`.main`);

render(mainElement, new MainNavigationComponent(navigationCount));

const footerStatisticsElement = document.querySelector(`.footer__statistics`);

render(footerStatisticsElement, new FooterStatisticsComponent(films.length));

const pageController = new PageController(mainElement);

pageController.render(films);

const extraFilmsController = new ExtraFilmsController(mainElement);

extraFilmsController.render(films);
