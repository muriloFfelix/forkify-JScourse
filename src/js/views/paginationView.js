import View from './view';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentEL = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentEL.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');

      if (!btn) return;

      const goToPage = +btn.dataset.goto;

      handler(goToPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // Only page 1 (<=10 results)
    if (numPages === 1) return '';

    // Page 1 of n
    if (curPage === 1) {
      return this.#generateMarkupButtonRight(curPage);
    }
    // Last page
    if (curPage === numPages) {
      return this.#generateMarkupButtonLeft(curPage);
    }
    // Inbetween pages
    if (curPage < numPages) {
      return [
        this.#generateMarkupButtonLeft(curPage),
        this.#generateMarkupButtonRight(curPage),
      ].join('');
    }
  }

  #generateMarkupButtonLeft(curPage) {
    return `
    <button data-goto="${
      curPage - 1
    }" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span> Page ${curPage - 1}</span>
    </button>
    `;
  }

  #generateMarkupButtonRight(curPage) {
    return `
    <button data-goto="${
      curPage + 1
    }" class="btn--inline pagination__btn--next">
        <span> Page ${curPage + 1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
    </button>
    `;
  }
}

export default new PaginationView();
