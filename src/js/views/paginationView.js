import View from './View.js'
import incons from 'url:../../img/icons.svg'

class PaginationView extends View {
    _parentE = document.querySelector('.pagination')

    addHandlerClick(handler){
        
        this._parentE.addEventListener('click', function(e){
            const btnPa= e.target.closest('.btn--inline')
            const numPage = +btnPa.dataset.goto
           handler(numPage)
                
            })
            // btnNext.onclick = function(){
            //     this._data.page = this._data.page + 1
            //     console.log(this._data.page);
            // }
        
    }

    _generateMarkup() {
        const numPage = Math.ceil(this._data.result.length /this._data.resultPerPage)
        //page 1 
        if(this._data.page === 1 && numPage > 1){
            return `
            <button class="btn--inline pagination__btn--next" data-goto ="${this._data.page + 1 }" >
                <span>Page ${this._data.page + 1 }</span>
                <svg class="search__icon">
                    <use href="${incons}#icon-arrow-right"></use>
                </svg>
          </button>`
        }
        // last page
        if(this._data.page === numPage && numPage > 1 ){
            return ` 
            <button class="btn--inline pagination__btn--prev"  data-goto ="${this._data.page - 1 }">
                <svg class="search__icon">
                    <use href="${incons}#icon-arrow-left"></use>
                </svg>
                 <span>Page ${this._data.page - 1 }</span>
            </button>`
        }
        // other page
        if(this._data.page > 1 && this._data.page < numPage ){
            return `
            <button class="btn--inline pagination__btn--prev"  data-goto ="${this._data.page - 1 }">
                <svg class="search__icon">
                    <use href="${incons}#icon-arrow-left"></use>
                 </svg>
            <span>Page ${this._data.page - 1 }</span>
            </button>

            <button class="btn--inline pagination__btn--next"  data-goto ="${this._data.page + 1 }">
                <span>Page ${this._data.page + 1 }</span>
                <svg class="search__icon">
                    <use href="${incons}#icon-arrow-right"></use>
                </svg>
            </button>
            `
        }
        if(numPage === 1 ){
            return ` `
            }
            
        }
        
    }
    export default new PaginationView()