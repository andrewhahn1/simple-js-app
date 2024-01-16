let pokemonRepository = (function () {

    let pokemonList = [
        {
            name: 'Bulbasaur',
            height: 2.04,
            types: ['grass', 'poison']
        },
        {
            name: 'Charmander',
            height: 2,
            types: ['fire']
        },
        {
            name: 'Squirtle',
            height: 1.08,
            types: ['water']
        }
    ]
    
    function getAll () {
        return pokemonList;
    }
    
    function add (pokemon){
       pokemonList.push (pokemon); 
    }
   
    return {
        getAll: getAll,
        add: add,
    }

})();



pokemonRepository.getAll().forEach(function(pokemon){
    document.write(pokemon.name + ': ' + pokemon.height + '<br>' + 'type: ' + pokemon.types + '<br><br>');
  });