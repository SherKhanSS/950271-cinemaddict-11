import {createElement} from "../utils.js";

const createFilmsListExtraContainerTemplate = (filmsExtra) => {
  return (
    `<section class="films-list--extra">
      <h2 class="films-list__title">${filmsExtra}</h2>
      <div class="films-list__container">
      </div>
    </section>`
  );
};


export class FilmsListExtraContainerComponent {
  constructor(filmsExtra) {
    this._filmsExtra = filmsExtra;
    this._element = null;
  }

  getTemplate() {
    return createFilmsListExtraContainerTemplate(this._filmsExtra);
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
