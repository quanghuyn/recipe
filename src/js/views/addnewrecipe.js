import View from './View.js'

import { Fraction } from 'fractional'

  class addNewRecipeView extends View {
    _parentE = document.querySelector('.upload')
    _window = document.querySelector('.add-recipe-window ')
    _overlay = document.querySelector('.overlay ')
    _btnaddnew = document.querySelector('.nav__btn--add-recipe ')
    _btnclose = document.querySelector('.btn--close-modal ')
    _message = 'Recipe was successfully uploaded'
    constructor() {
        super()
        this.addHandlerShowWindow()
        this.handlerCloseWindow()
    }
    addHandlerShowWindow() {
        console.log(1);
        this._btnaddnew.addEventListener('click' , () => {
             this._overlay.classList.remove('hidden')
             this._window.classList.remove('hidden')
        })
    }

    handlerCloseWindow() {
        this._btnclose.addEventListener('click', () => {
            this._overlay.classList.add('hidden')
            this._window.classList.add('hidden')
        })
        this._overlay.addEventListener('click', (e)=> {
            this._overlay.classList.add('hidden')
             this._window.classList.add('hidden')

        })
    }

    addHandlerUpload(hanlder) {
         const a =  this._parentE
        this._parentE.addEventListener('submit', (e) => {
            e.preventDefault()
            const dataArray =  [...new FormData(a)]
            const data = Object.fromEntries(dataArray)
            hanlder(data)
   
        })
    }
  }
  export default new addNewRecipeView()