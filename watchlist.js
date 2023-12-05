const watchlistText = document.getElementById("watchlist-text");
const watchlistHolder = document.getElementById("watchlist-holder");

let output = ``;
let movieItem = JSON.parse(localStorage.getItem("imdbMovie"));

if (movieItem) {
  for (let movie of movieItem) {
    output += `
    <h1>${movie.Title}</h1>
  `;
  }
  watchlistHolder.innerHTML = output;
} else {
  watchlistHolder.innerHTML = `
  <p class="watchlist-text" id="watchlist-text">Your watchlist is looking a little empty...</p>
  <a href="./index.html" class="find-movies-btn">Let's add some movies!</a>
  `;
}
