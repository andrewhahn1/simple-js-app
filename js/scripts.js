let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  
  function add (pokemon){
    if (typeof pokemon === "object" && "name" in pokemon) {
      pokemonList.push(pokemon);
    } else {
      console.log("pokemon is not correct");
    }
  }

  function getAll () {
    return pokemonList;
}
  //button for Pokemon List
  function addListItem(pokemon){
      let pokemonList = document.querySelector('.list-group');
      let listItem = document.createElement('li');
      classList.add('list-group-item');
      pokemonList.appendChild('li');
      
      let button = document.createElement('button');
      button.innerText = pokemon.name;
      listItem.appendChild(button);
      button.classList.add('btn', 'btn-secondary');
      button.setAttribute('data-target', '#exampleModal');
      button.setAttribute('data-toggle', 'modal');
      pokemonList.appendChild(listItem);
      addEventListenerToButton(button, pokemon)

      button.addEventListener('click', function (event){
          showDetails(pokemon);
      });
  }

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    })
    .then(function (details) {
      //Pokemon details//
      item.imageUrl = details.sprites.front_default;
      item.imageUrlBack = details.sprites.back_default;
      item.height = details.height;
      item.weight = details.weight;
      item.types = details.types;
      item.abilities = details.abilites;
    })
    .catch(function (e) {
      console.error(e);
    });
  }

  // Modal for pokemonList
  let modalContainer = document.querySelector('.modal');
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      openModal(pokemon);
    });
  }
  
  function openModal(pokemon) {
    let modalBody = $('.modal-body');
    let modalTitle = $('modal-title');
    let modalHeader = $('.modal-header');
    let modalFooter = $('.modal-footer');
    let modalContent= $('.modal-content');
    
    //empty Modal content//
    modalTitle.empty();
    modalBody.empty();
  
    // let modal = document.createElement('div');
    // modal.classList.add('modal');

    //Pokemon details//
    let nameElement = $('<h1>' + pokemon.name + '</h1>');
    
    let imageElementFront = document.createElement('img');
    imageElementFront.classList.add('modal-img');
    imageElementFront.src = pokemon.imageUrlFront;
    imageElementFront.alt = 'Front image of ' + pokemon.name;

    let imageElementBack = document.createElement('img');
    imageElementBack.classList.add('modal-img');
    imageElementBack.src = pokemon.imageUrlBack;
    imageElementBack.alt = 'Back image of ' + pokemon.name;

    let typesElement = document.createElement('p');
    typesElement.innerText = 'Types: ' + pokemon.types;

    let heightElement = document.createElement('p');
    heightElement.innerText = 'Height: ' + pokemon.height;

    let weightElement = document.createElement('p');
    weightElement.innerText = 'Weight: ' + pokemon.weight;

    let abilitiesElement = document.createElement('p');
    abilitiesElement.innerText = 'Abilities: ' + pokemon.abilities;

    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'Close';
    closeButtonElement.addEventListener('click', hideModal);

     //Add Pokemon image to modal
    // let imageElement = document.createElement('img');
    // imageElement.src = pokemon.imageUrl;
    // imageElement.alt = pokemon.name;

    modal.appendChild(closeButtonElement);
    modalTitle.appendChild(nameElement);
    modalBody.appendChild(imageElementFront);
    modalBody.appendChild(imageElementBack);
    modalBody.appendChild(typesElement);
    modalBody.appendChild(weightElement);
    modalBody.appendChild(heightElement);
    modalBody.appendChild(abilitiesElement);

    modalContent.appendChild(modalHeader);
    modalContent.appendChild(modalBody);
    modalContent.appendChild(modalFooter);

    modal.appendChild(modalContent);
    modal.classList.add('is-visible');
  }

  function hideModal() {
    modalContainer.classList.remove('is-visible');
  }
  
  window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
    hideModal();
  }
});

modalContainer.addEventListener('click', (e) => {
  let target = e.target;
  if (target === modalContainer) {
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
