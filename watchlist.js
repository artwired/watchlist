const watchlistText = document.getElementById("watchlist-text");
const watchlistHolder = document.getElementById("watchlist-holder");
const mainHolder = document.getElementById("main-holder");

let movieItems = JSON.parse(localStorage.getItem("imdbMovie"));

document.addEventListener("click", (e) => {
  if (e.target.dataset.removeFromWatchlist) {
    handleRemoveMovie(e.target.dataset.removeFromWatchlist);
  }
});
function renderWatchlist() {
  let output = ``;
  if (movieItems.length === 0) {
    mainHolder.classList.add("vertical-height");
    watchlistHolder.innerHTML = `
    <p class="watchlist-text" id="watchlist-text">Your watchlist is looking a little empty...</p>
    <a href="./index.html" class="find-movies-btn">Let's add some movies!</a>
    `;
  } else if (movieItems.length > 0) {
    mainHolder.classList.remove("vertical-height");
    for (let movie of movieItems) {
      output += `
              <div class="movie-card-holder">
                <img src="${
                  movie.Poster === "N/A"
                    ? "/images/movie-jacket-sub.png"
                    : movie.Poster
                }" class="movie-poster">
                <div class="movie-content-holder">
                  <div class="movie-and-rating-holder">
                    <h2 class="movie-title">${movie.Title}
                    <span class="movie-rating"><span class="star-emoji">⭐️</span>${
                      movie.imdbRating === "N/A"
                        ? "no rating"
                        : movie.imdbRating
                    }</span></h2>
                  </div>
                  <div class="time-and-genre-holder">
                    <div class="time-and-genre-container">
                      <p class="movie-time">${
                        movie.Runtime === "N/A" ? "" : movie.Runtime
                      }</p>
                      <p class="movie-genre">${
                        movie.Genre === "N/A" ? "" : movie.Genre
                      }</p>
                    </div>
                    <div class="add-to-watchlist-btn-holder">
                      <button class="remove-from-watchlist-btn" data-remove-from-watchlist=${
                        movie.imdbID
                      }>Remove</button>
                    </div>
                  </div>
                  <div class="plot-holder">
                    <p>${
                      movie.Plot === "N/A"
                        ? "<span class='no-description'>Plot not available.</span>"
                        : handlePlot(movie)
                    }</p>
                  </div>
                </div>
              </div>
              `;
    }
    watchlistHolder.innerHTML = output;
  }
}
renderWatchlist();
function handlePlot(fullString) {
  document.addEventListener("click", (e) => {
    if (e.target.dataset.readMore) {
      handleReadMore(e.target.dataset.readMore, e);
    } else if (e.target.dataset.readLess) {
      handleReadLess(e.target.dataset.readLess, e);
    }
  });
  let fullPlot = fullString.Plot;
  let shortPlot =
    fullPlot.split(/\s+/).slice(0, 22).join(" ") +
    `...<button class='read-more-btn' data-read-more=${fullString.imdbID}>Read More</button>`;

  if (fullPlot > fullPlot.split(/\s+/).slice(0, 22).join(" ")) {
    return shortPlot;
  } else {
    return fullPlot;
  }
  function handleReadMore(movieID, e) {
    if (movieID === fullString.imdbID) {
      e.target.parentNode.innerHTML =
        fullPlot +
        `<button class='read-more-btn' data-read-less=${fullString.imdbID}>Read Less</button>`;
    }
  }
  function handleReadLess(movieID, e) {
    if (movieID === fullString.imdbID) {
      e.target.parentNode.innerHTML = shortPlot;
    }
  }
}
function handleRemoveMovie(movieID) {
  const itemToRemove = movieItems.findIndex((movieItem) => {
    return movieItem.imdbID === movieID;
  });
  if (itemToRemove > -1) {
    movieItems.splice(itemToRemove, 1);
    localStorage.setItem("imdbMovie", JSON.stringify(movieItems));
    JSON.parse(localStorage.getItem("imdbMovie"));
    renderWatchlist();
  }
}
