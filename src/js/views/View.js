import incons from 'url:../../img/icons.svg'

export default class View {
    _data
    /**
     * Render the object to the DOM
     * @class
     * @param {Object | Object[]} data the data to be render ex: recipe
     * @returns{String} Return markup string
     */
    render(data) {
        if(!data || (Array.isArray(data)) && data.length === 0 ) return this.renderError()
        this._data = data
        const markup = this._generateMarkup()
        this.clear()
        this._parentE.insertAdjacentHTML('afterbegin', markup)
    }
    
    clear(){

        this._parentE.innerHTML = ' '
    }
    /**
     * render erro mess
     * @param {*} message  have mess error
     */
    renderError(message = this._ErroMessage){
      const markup = `<div class="error">
        <div>
          <svg>
            <use href="${incons}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>`
      this.clear()
      this._parentE.insertAdjacentHTML('afterbegin', markup)
    }
    
    renderMessage(message = this._message){
      const markup = `
      <div class="message">
      <div>
        <svg>
          <use href="${incons}#icon-smile"></use>
        </svg>
      </div>
      <p>
        ${message} :)
      </p>
    </div>
      `
      this.clear()
      this._parentE.insertAdjacentHTML('afterbegin', markup)
    }

    loadSpiner = function(){
        let markup = `<div class="spinner">
        <svg>
          <use href="${incons}#icon-loader"></use>
        </svg>
      </div>`
        this._parentE.innerHTML = ' '
        this._parentE.insertAdjacentHTML('afterbegin', markup )
    }
  }