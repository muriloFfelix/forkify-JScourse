import View from './view';
import previewView from './previewView';
import icons from 'url:../../img/icons.svg';

class BookmarksView extends View {
  _parentEL = document.querySelector('.bookmarks__list');
  _errorMessage = `No bookmarks? lame!!!`;
  _message = '';

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  _generateMarkup() {
    return this._data.map(result => previewView.render(result, false)).join('');
  }
}

export default new BookmarksView();
