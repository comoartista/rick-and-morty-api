let characters = []; // Define an empty array to store the character data

let page = 1

fetchCharacters() // Call the function of unloading the first characters

// Function for unloading characters
function fetchCharacters () {
  const url = `https://rickandmortyapi.com/api/character?page=${page}`

  fetch(url)
  .then(response => response.json())
  .then(data => {
    characters = [...characters, ...data.results]
    createCard(data.results)
    console.log(data)
  })
  .catch(error => console.log(error))
}

  //Search
  const searchInput = document.querySelector('#search-input');
  searchInput.addEventListener('input', handleSearch);
  
  function handleSearch() {
    const searchText = searchInput.value.toLowerCase();
    const filteredCharacters = characters.filter(character =>
      character.name.toLowerCase().startsWith(searchText)
    );
    clearCards();
    createCard(filteredCharacters);
  }

  const cardsContainer = document.querySelector('.cards__container')

//Creating character cards
  function createCard (characters) {
    characters.forEach(character => {
      const card = document.createElement('card')
      card.classList.add('card')

      const cardContent = document.createElement('div')
      cardContent.classList.add('card__content')

      const img = document.createElement('img')
      img.src = character.image
      img.alt = 'image'
      img.width = '100'

      const name = document.createElement('h3')
      name.textContent = character.name

      const info = document.createElement('div')
      info.classList.add('card__status')
      const mark = document.createElement('div')
    
      const status = document.createElement('div')
      status.textContent = character.status

      if (character.status === 'Alive') {
        mark.classList.add('status-alive')
      } else {
        mark.classList.add('status-alive', 'status-alive--dead')
      }

      const speciesText = document.createElement('p')
      speciesText.classList.add('card__descr')
      speciesText.textContent = 'Species:'

      const species = document.createElement('div')
      species.textContent = character.species

      const descr = document.createElement('p')
      descr.classList.add('card__descr')
      descr.textContent = 'Last known location:'

      const location = document.createElement('p');
      location.textContent = character.location.name

      info.append(mark, status, species)
      cardContent.append(img, name, info, speciesText, species, descr, location)

      card.append(img, cardContent)
      cardsContainer.append(card)
    });
  }

  function clearCards() {
    while (cardsContainer.firstChild) {
      cardsContainer.removeChild(cardsContainer.firstChild);
    }
  }

  // Scroll event handler
  window.addEventListener('scroll', () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement
    if (scrollTop + clientHeight >= scrollHeight - 100) {
      page++
      fetchCharacters() // Call the function to unload the following characters
    }
  })


  
  