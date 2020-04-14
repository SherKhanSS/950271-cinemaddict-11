import {createElement} from "../utils.js";

const createMainNavigationTemplate = (navigationCount) => {

  const [watchlistCount, historyCount, favoritesCount] = navigationCount;

  return (
    `<nav class="main-navigation">
       <div class="main-navigation__items">
         <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
         <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${watchlistCount}</span></a>
         <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${historyCount}</span></a>
         <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${favoritesCount}</span></a>
       </div>
       <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
  );
};


export class MainNavigationComponent {
  constructor(navigationCount) {
    this._navigationCount = navigationCount;
    this._element = null;
  }

  getTemplate() {
    return createMainNavigationTemplate(this._navigationCount);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
