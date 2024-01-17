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
   //button for Pokemon List
    function addListItem(pokemon){
        let pokemonList = document.querySelector('.pokemon-list');
        let listItem = document.createElement('li');
        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('button-class');
        listItem.appendChild(button);
        pokemonList.appendChild(listItem);
        button.addEventListener('click', function (event){
            pokemonRepository.showDetails(pokemon);
        });
    }
   
    function showDetails(pokemon){
        console.log(pokemon);
    }

    return {
        getAll: getAll,
        add: add,
        addListItem: addListItem,
        showDetails: showDetails,
    }

})();

console.log(pokemonRepository.getAll());

pokemonRepository.getAll().forEach(function(pokemon){
   pokemonRepository.addListItem(pokemon);
  });