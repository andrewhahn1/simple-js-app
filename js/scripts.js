let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  let modal = document.querySelector('.modal');

  function add(pokemon) {
    if (typeof pokemon === "object" && "name" in pokemon) {
      pokemonList.push(pokemon);
    } else {
      console.log("pokemon is not correct");
    }
  }

  function getAll() {
    return pokemonList;
  }

  function addListItem(pokemon) {
    let pokemonList = document.querySelector('.list-group');
    let listItem = document.createElement('li');
    listItem.classList.add('list-group-item');
    pokemonList.appendChild(listItem);

    let button = document.createElement('button');
    button.innerText = pokemon.name;
    listItem.appendChild(button);
    button.classList.add('btn', 'btn-secondary');
    button.setAttribute('data-target', '#exampleModal');
    button.setAttribute('data-toggle', 'modal');

    button.addEventListener('click', async function (event) {
      await loadDetails(pokemon);
      showDetails(pokemon);
    });
  }

  async function loadDetails(pokemon) {
    let response = await fetch(pokemon.detailsUrl);
    let details = await response.json();
    pokemon.imageUrlFront = details.sprites.front_default;
    pokemon.imageUrlBack = details.sprites.back_default;
    pokemon.height = details.height;
    pokemon.weight = details.weight;
    pokemon.types = details.types;
    pokemon.abilities = details.abilities;
    return pokemon;
  }

  function showDetails(pokemon) {
    let modalBody = document.querySelector('.modal-body');
    let modalTitle = document.querySelector('.modal-title');

    modalTitle.innerHTML = '';
    modalBody.innerHTML = '';

    //Pokemon details//
    let nameElement = document.createElement('h1')
    nameElement.innerHTML = pokemon.name
    
    let imageElementFront = document.createElement('img');
    imageElementFront.classList.add('modal-img');
    imageElementFront.src = pokemon.imageUrlFront;
    imageElementFront.alt = 'Front image of ' + pokemon.name;

    let imageElementBack = document.createElement('img');
    imageElementBack.classList.add('modal-img');
    imageElementBack.src = pokemon.imageUrlBack;
    imageElementBack.alt = 'Back image of ' + pokemon.name;

    let typesElement = document.createElement('p');
    typesElement.innerHTML = 'Types: ';
    pokemon.types.forEach(function(type) {
      typesElement.innerText += ' ' + type.type.name;
    });

    let heightElement = document.createElement('p');
    heightElement.innerHTML = 'Height: ' + pokemon.height;

    let weightElement = document.createElement('p');
    weightElement.innerHTML = 'Weight: ' + pokemon.weight;

    let abilitiesElement = document.createElement('p');
    abilitiesElement.innerHTML = 'Abilities: ';
    pokemon.abilities.forEach(function(ability) {
      abilitiesElement.innerText += ' ' + ability.ability.name;
    });

    let closeButtonElement = document.querySelector('.close');

    modal.appendChild(closeButtonElement);
    modalTitle.appendChild(nameElement);
    modalBody.appendChild(imageElementFront);
    modalBody.appendChild(imageElementBack);
    modalBody.appendChild(typesElement);
    modalBody.appendChild(weightElement);
    modalBody.appendChild(heightElement);
    modalBody.appendChild(abilitiesElement);

    modal.classList.add('is-visible');
  }

  function hideModal() {
    modal.classList.remove('is-visible');
  }
  
  window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.classList.contains('is-visible')) {
    hideModal();
  }
});

modal.addEventListener('click', (e) => {
  let target = e.target;
  if (target === modal) {
    hideModal();
  }
});

  function loadList() {
      return fetch(apiUrl).then(function (response) {
        return response.json();
      }).then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url
          };
          add(pokemon);
        });
      }).catch(function (e) {
        console.error(e);
      })
    }


  return {
      getAll: getAll,
      add: add,
      addListItem: addListItem,
      loadList: loadList,
      loadDetails: loadDetails,
      showDetails: showDetails,
};
})();

pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});
