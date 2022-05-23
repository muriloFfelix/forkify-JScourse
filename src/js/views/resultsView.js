import View from './view';
import previewView from './previewView';
import icons from 'url:../../img/icons.svg';

class ResultsView extends View {
  _parentEL = document.querySelector('.results');
  _errorMessage = `No recipes for this query x.x wtf you searching fr >.>`;
  _message = '';

  _generateMarkup() {
    return this._data.map(result => previewView.render(result, false)).join('');
  }
}

export default new ResultsView();
