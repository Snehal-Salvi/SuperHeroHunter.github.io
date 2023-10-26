//fetching elements by document.get 
let searchBar = document.getElementById("search-bar");
let searchResults = document.getElementById("search-results");

// Added eventListener to search bar
searchBar.addEventListener("input", () => searchHeros(searchBar.value));

// function to fetch API
async function searchHeros(textSearched) { 

     if (textSearched.length == 0) {
          searchResults.innerHTML = ``;
          return;
     }

     await fetch(`
https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${textSearched}&ts=1698253966886&apikey=1af980c964ec89cd3e70a22841cd6680&hash=dc49b569cadd957b690091d2ae379c65`)
          .then(res => res.json()) 
          .then(data => showSearchedResults(data.data.results)) 
}

//function to show Searched Results
function showSearchedResults(results) {
    searchResults.innerHTML = '';

    if (results.length === 0) {
        searchResults.innerHTML = 'No results found.';
        return;
    }

        const favourites = getfavourites(); 

        const resultList = document.createElement('ul');
        resultList.className = 'search-results-list';

        results.forEach(character => {
        const listItem = document.createElement('li');
        listItem.className = 'search-result-item';

        const characterName = document.createElement('h3');
        characterName.textContent = character.name;

        const characterImage = document.createElement('img');
        characterImage.src = `${character.thumbnail.path}.${character.thumbnail.extension}`;
        characterImage.alt = character.name;

        
        const moreInfoLink = document.createElement('a');
        moreInfoLink.href = 'superhero.html?id=' + character.id; 
        moreInfoLink.textContent = 'More Info';
        moreInfoLink.innerHTML = '<i class="fa-solid fa-circle-info"></i>';

        const favouriteButton = document.createElement('button');
        favouriteButton.innerHTML = favourites.some((favCharacter) => favCharacter.id === character.id) ? '&hearts; favourite' : '&hearts; Add to favourites';
        favouriteButton.addEventListener('click', () => addTofavourites(character));

        // Append elements to the list item
        listItem.appendChild(characterImage);
        listItem.appendChild(characterName);
        listItem.appendChild(favouriteButton);
        listItem.appendChild(moreInfoLink);
        resultList.appendChild(listItem);
    });

    searchResults.appendChild(resultList);
}

// Function to add a character to favourites
function addTofavourites(character) {
    // Get the current favourites from Local Storage
    const favourites = getfavourites();

    // Check if the character is already in favourites
    const characterExists = favourites.some((favCharacter) => favCharacter.id === character.id);

    if (!characterExists) {
        // Add the character to favourites
        favourites.push(character);
        savefavourites(favourites);

        // Change the button text after Added to favourites"
        const favouriteButton = event.target;
        favouriteButton.innerHTML = '&hearts;favourite';
        favouriteButton.disabled = true; // Optionally, you can disable the button after adding to prevent further clicks.
    } else {
        alert('Character is already in favourites.');
    }
}

// Function to retrieve favourites from Local Storage
function getfavourites() {
    const favouritesJSON = localStorage.getItem('favourites');
    return favouritesJSON ? JSON.parse(favouritesJSON) : [];
}

// Function to save favourites to Local Storage
function savefavourites(favourites) {
    localStorage.setItem('favourites', JSON.stringify(favourites));
}


