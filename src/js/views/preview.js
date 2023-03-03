import View from './View.js'

import incons from 'url:../../img/icons.svg'
class PreviewBookmark extends View {
    _parentE = document.querySelector('.bookmarks__list')
    _ErroMessage = ' Can`t find bookmark preview.Try agian'
    _message = ''
    _generateMarkup() {
       
        return this._data.map(rec => {
            return`
            <li class="preview">
            <a class="preview__link" href="#${rec.id}">
              <figure class="preview__fig">
                <img src="${rec.imageurl}" alt="${rec.title}" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${rec.title}</h4>
                <p class="preview__publisher">${rec.publisher}</p>
              </div>
              <div class="recipe__user-generated ${rec.key ? '': 'hidden'}">
              <svg>
                <use href="${incons}#icon-user"></use>
              </svg>
            </div>
            </a>
          </li>`
        }).join('')
    }
}
export default new PreviewBookmark()