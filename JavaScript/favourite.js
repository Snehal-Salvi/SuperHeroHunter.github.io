// Function to retrieve favourites from Local Storage
function getfavourites() {
    const favouritesJSON = localStorage.getItem('favourites');
    return favouritesJSON ? JSON.parse(favouritesJSON) : [];
}

// Function to save favourites to Local Storage
function savefavourites(favourites) {
    localStorage.setItem('favourites', JSON.stringify(favourites));
}
const favouriteList = document.getElementById('favourite-list');

// Function to retrieve and display favourite characters
function displayfavourites() {
    const favourites = getfavourites();

    if (favourites.length === 0) {
        favouriteList.innerHTML = '<span class="message">No favourite characters added.</span>';
        return;
    }

    favourites.forEach(character => {
        const listItem = document.createElement('li');
        
        // Create a div to contain the character info
        const characterInfo = document.createElement('div');
        characterInfo.classList.add('character-info');
        
        // Create an image element
        const characterImage = document.createElement('img');
        characterImage.src = `${character.thumbnail.path}.${character.thumbnail.extension}`;
        characterImage.alt = character.name;
        
        // Create a paragraph for the character's name
        const characterName = document.createElement('p');
        characterName.textContent = character.name;
        
        // Create a delete icon
        const deleteIcon = document.createElement('i');
        deleteIcon.classList.add('fa', 'fa-trash', 'delete-icon');
        
        deleteIcon.addEventListener('click', () => removefavourite(character));

        // Append the image, name, and delete icon to the characterInfo div
        characterInfo.appendChild(characterImage);
        characterInfo.appendChild(characterName);
        characterInfo.appendChild(deleteIcon);
        
        // Append the characterInfo div to the list item
        listItem.appendChild(characterInfo);
        
        favouriteList.appendChild(listItem);
    });
}

// Function to remove a character from favourites
function removefavourite(character) {
    const favourites = getfavourites();
    const updatedfavourites = favourites.filter(favCharacter => favCharacter.id !== character.id);
    savefavourites(updatedfavourites);

    
    alert('Character deleted from favourites.');

    // Find and remove the character's list item from the displayed list
    const listItems = document.querySelectorAll('#favourite-list li');
    listItems.forEach((listItem) => {
        const characterInfo = listItem.querySelector('.character-info');
        if (characterInfo && characterInfo.querySelector('p').textContent === character.name) {
            listItem.remove();
        }
    });
}

// Initial call to display favourite characters when the favourite.html page loads
displayfavourites();

