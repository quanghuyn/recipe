class SearchView {
    _parentE = document.querySelector('.search')
    clearInput(){
      const a = this._parentE.querySelector('.search__field').value = ' '
      
    }
    getQuery(){
       const a = this._parentE.querySelector('.search__field').value
       this.clearInput()
       return a

    }

    addHandlerSearch(handler) {
        this._parentE.addEventListener('submit', function(e){
            e.preventDefault()          
            handler()
            
        })
    }
    
    render(){
        this.HandlerSearch(xp)

    }

}
export default new SearchView