import {AbstractComponent} from "./abstract-component.js";

const createProfileRatingTemplate = (rating) => {
  return (
    `<section class="header__profile profile">
      <p class="profile__rating">${rating}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
  );
};

export class ProfileRatingComponent extends AbstractComponent {
  constructor(rating) {
    super();
    this._rating = rating;
  }

  getTemplate() {
    return createProfileRatingTemplate(this._rating);
  }
}
