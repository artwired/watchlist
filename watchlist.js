const watchlistText = document.getElementById("watchlist-text");
const watchlistHolder = document.getElementById("watchlist-holder");
watchlistText.textContent = "test 1, 2, 3";

let output = ``;
let movieItem = JSON.parse(localStorage.getItem("imdbMovie"));

for (let movie of movieItem) {
  output += `
    <h1>${movie.Title}</h1>
  `;
}
watchlistHolder.innerHTML = output;
