import {AbstractComponent} from "./abstract-component.js";

const createFilmsListExtraContainerTemplate = (filmsExtra) => {
  return (
    `<section class="films-list--extra">
      <h2 class="films-list__title">${filmsExtra}</h2>
      <div class="films-list__container">
      </div>
    </section>`
  );
};


export class FilmsListExtraContainerComponent extends AbstractComponent {
  constructor(filmsExtra) {
    super();
    this._filmsExtra = filmsExtra;
  }

  getTemplate() {
    return createFilmsListExtraContainerTemplate(this._filmsExtra);
  }
}
