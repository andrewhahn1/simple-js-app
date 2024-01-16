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

pokemonList.forEach(function(pokemon) {
    document.write(pokemon.name + ': ' + pokemon.height + '<br>' + 'type: ' + pokemon.types + '<br><br>');
  });

