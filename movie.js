const movieId = new URLSearchParams(window.location.search).get('id');
const moviePage = document.getElementById('moviePage');

fetch(`https://www.omdbapi.com/?apikey=78198315&i=${movieId}`)
  .then(response => response.json())
  .then(data => {
    displayMovieDetails(data);
  })
  .catch(error => {
    console.log('Error:', error);
  });

const displayMovieDetails = movie => {
  const movieImg = document.createElement('img');
  movieImg.src = movie.Poster === 'N/A' ? 'no-poster.jpg' : movie.Poster;
  moviePage.appendChild(movieImg);

  const movieTitle = document.createElement('h2');
  movieTitle.innerText = movie.Title;
  moviePage.appendChild(movieTitle);

  const moviePlot = document.createElement('p');
  moviePlot.innerText = movie.Plot;
  moviePage.appendChild(moviePlot);

  // Add more information about the movie if needed
};
