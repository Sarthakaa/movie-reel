const searchInput = document.getElementById('searchInput');
const suggestionsDiv = document.getElementById('suggestions');
const favoriteList = document.getElementById('favoriteList');

let timeoutId;

// Function to debounce the search input
const debounce = (func, delay) => {
  clearTimeout(timeoutId);
  timeoutId = setTimeout(func, delay);
};

// Function to search for movies based on the input value
const searchMovies = () => {
  const searchText = searchInput.value;

  if (searchText.length >= 3) {
    fetch(`https://www.omdbapi.com/?apikey=78198315&s=${searchText}`)
      .then(response => response.json())
      .then(data => {
        if (data.Response === 'True') {
          const movies = data.Search;
          displaySuggestions(movies);
        } else {
          suggestionsDiv.innerHTML = 'No results found';
        }
      })
      .catch(error => {
        console.log('Error:', error);
      });
  } else {
    suggestionsDiv.innerHTML = '';
  }
};

// Function to display search suggestions
const displaySuggestions = movies => {
  suggestionsDiv.innerHTML = '';

  movies.forEach(movie => {
    const movieDiv = document.createElement('div');
    movieDiv.classList.add('movie');

    const movieImg = document.createElement('img');
    movieImg.src = movie.Poster === 'N/A' ? 'no-poster.jpg' : movie.Poster;
    movieDiv.appendChild(movieImg);

    const movieTitle = document.createElement('span');
    movieTitle.classList.add('title');
    movieTitle.innerText = movie.Title;
    movieTitle.addEventListener('click', () => {
      showMovieDetails(movie.imdbID);
    });
    movieDiv.appendChild(movieTitle);

    const favoriteBtn = document.createElement('button');
    favoriteBtn.classList.add('favorite-btn');
    favoriteBtn.innerText = 'Favorite';
    favoriteBtn.addEventListener('click', () => {
      addMovieToFavorites(movie);
    });
    movieDiv.appendChild(favoriteBtn);

    suggestionsDiv.appendChild(movieDiv);
  });
};

// Function to add a movie to the favorite list
const addMovieToFavorites = movie => {
  const favoriteItem = document.createElement('li');
  favoriteItem.classList.add('favorite-item');

  const movieImg = document.createElement('img');
  movieImg.src = movie.Poster === 'N/A' ? 'no-poster.jpg' : movie.Poster;
  favoriteItem.appendChild(movieImg);

  const movieTitle = document.createElement('span');
  movieTitle.classList.add('title');
  movieTitle.innerText = movie.Title;
  movieTitle.addEventListener('click', () => {
    showMovieDetails(movie.imdbID);
  });
  favoriteItem.appendChild(movieTitle);

  const removeBtn = document.createElement('button');
  removeBtn.classList.add('remove-btn');
  removeBtn.innerText = 'Remove';
  removeBtn.addEventListener('click', () => {
    removeMovieFromFavorites(favoriteItem);
  });
  favoriteItem.appendChild(removeBtn);

  favoriteList.appendChild(favoriteItem);
};

// Function to remove a movie from the favorite list
const removeMovieFromFavorites = item => {
  favoriteList.removeChild(item);
};

// Function to show movie details page
const showMovieDetails = imdbID => {
  window.open(`movie.html?id=${imdbID}`, '_blank');
};

// Event listener for search input
searchInput.addEventListener('input', () => {
  debounce(searchMovies, 500);
});
