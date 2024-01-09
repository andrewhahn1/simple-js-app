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

for (let i=0; i < pokemonList.length; i++){
    if (pokemonList[i].height < 5 && pokemonList[i].height > 2){
        document.write(pokemonList[i].name + ' height: ' + pokemonList[i].height + ' – What a good little guy!');
    }else if (pokemonList[i].height === 2){
        document.write(pokemonList[i].name + ' height: ' + pokemonList[i].height);
    }else {
        document.write(pokemonList[i].name + ' height: ' + pokemonList[i].height)
    }

}