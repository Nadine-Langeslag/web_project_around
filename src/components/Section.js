export default class Section {
  constructor(collection, renderer, container) {
    this._collection = collection;
    this._renderer = renderer;
    this._container = container;
  }

  renderItems() {
    this._collection.forEach((item) => {
      const renderer = this._renderer(item);
      this._container.append(renderer);
    });
  }
}
