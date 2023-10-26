window.addEventListener('load', function () {
  // Retrieve the character ID from the URL
  const urlParams = new URLSearchParams(window.location.search);
  const characterId = urlParams.get('id');

  // Fetch the character data based on the characterId
  fetchCharacterData(characterId);
});

async function fetchCharacterData(characterId) {
  await fetch(
    `https://gateway.marvel.com:443/v1/public/characters/${characterId}?ts=1698253966886&apikey=1af980c964ec89cd3e70a22841cd6680&hash=dc49b569cadd957b690091d2ae379c65`
  )
    .then((res) => res.json())
    .then((data) => showSuperheroDetails(data.data.results[0])); // Assuming the response is an object with the character data
}

// Function to display superhero details on the page
function showSuperheroDetails(superhero) {
  // Get the elements 
  const superheroNameElement = document.getElementById('superhero-name');
  const superheroImageElement = document.getElementById('superhero-image');
  const superheroDescriptionElement = document.getElementById('superhero-description'); // New element for description
  const superheroComicsElement = document.getElementById('superhero-comics'); // New element for comics
  const superheroSeriesElement = document.getElementById('superhero-series'); // New element for series
  const superheroStoriesElement = document.getElementById('superhero-stories'); // New element for stories

  // Populate the elements with superhero data
  superheroNameElement.textContent = superhero.name;
  superheroImageElement.src = `${superhero.thumbnail.path}.${superhero.thumbnail.extension}`;
  superheroImageElement.alt = superhero.name;
  superheroDescriptionElement.textContent = superhero.description ? superhero.description : 'No description available';
  superheroComicsElement.textContent = `Comics: ${superhero.comics.available}`;
  superheroSeriesElement.textContent = `Series: ${superhero.series.available}`;
  superheroStoriesElement.textContent = `Stories: ${superhero.stories.available}`;
}

