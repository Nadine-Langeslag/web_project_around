export default class Section {
  constructor({ renderer }, container) {
    this._renderer = renderer;
    this._container = document.querySelector(container);
  }

  renderItems(items) {
    /* console.log("dentro de la clase");
    console.log(items);
    console.log(this._renderer); */
    items.forEach((item) => {
      const renderer = this._renderer(item);
      /* console.log(renderer); */

      this._container.append(renderer);
    });
  }
  addItem(item) {
    const element = this._renderer(item);
    this._container.append(element);
  }
}
