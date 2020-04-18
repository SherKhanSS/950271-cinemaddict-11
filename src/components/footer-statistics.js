import {AbstractComponent} from "./abstract-component.js";

const createFooterStatisticsTemplate = (quantity) => {
  return (
    `<p>${quantity} movies inside</p>`
  );
};


export class FooterStatisticsComponent extends AbstractComponent {
  constructor(quantity) {
    super();
    this._quantity = quantity;
  }

  getTemplate() {
    return createFooterStatisticsTemplate(this._quantity);
  }
}
