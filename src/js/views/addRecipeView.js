import View from './view';
import icons from 'url:../../img/icons.svg';

class AddRecipeView extends View {
  _parentEL = document.querySelector('.upload');
  _message = "ayyyy new recipe dropped!!! let's check out :D";

  #window = document.querySelector('.add-recipe-window');
  #overlay = document.querySelector('.overlay');
  #btnOpen = document.querySelector('.nav__btn--add-recipe');
  #btnClose = document.querySelector('.btn--close-modal');

  constructor() {
    super();
    this.#addHandlerShowWindow();
    this.#addHandlerHideWindow();
  }

  toggleWindow() {
    this.#overlay.classList.toggle('hidden');
    this.#window.classList.toggle('hidden');
  }

  #addHandlerShowWindow() {
    this.#btnOpen.addEventListener('click', this.toggleWindow.bind(this));
  }

  #addHandlerHideWindow() {
    this.#btnClose.addEventListener('click', this.toggleWindow.bind(this));
    this.#overlay.addEventListener('click', this.toggleWindow.bind(this));
  }

  addHandlerUpload(handler) {
    this._parentEL.addEventListener('submit', function (e) {
      e.preventDefault();
      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr);
      handler(data);
    });
  }

  _generateMarkup() {}
}

export default new AddRecipeView();
