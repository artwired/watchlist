const formEl = document.getElementById("form-el");
const moviesHolder = document.getElementById("movies-holder");
let movieDescription = "";
formEl.addEventListener("submit", (e) => {
  const searchFieldValue = document.getElementById("search-field").value;
  const introPrompt = document.getElementById("intro-prompt");
  const mainHolder = document.getElementById("main-holder");
  movieDescription = "";
  e.preventDefault();
  fetch(
    `http://www.omdbapi.com/?apikey=ef07b548&s=${searchFieldValue}&type=movie`
  )
    .then((res) => res.json())
    .then((movieData) => {
      document.getElementById("search-field").value;
      introPrompt.classList.add("hidden");
      mainHolder.classList.remove("vertical-height");
      imdbMovieIdArray = [];
      for (let movie of movieData.Search) {
        imdbMovieIdArray.push(movie.imdbID);
      }
    })
    .then(() => {
      for (let imdbMovieId of imdbMovieIdArray) {
        fetch(
          `http://www.omdbapi.com/?apikey=ef07b548&i=${imdbMovieId}&type=movie`
        )
          .then((res) => res.json())
          .then((imdbMovieData) => {
            console.log(imdbMovieData);
            movieDescription += `
            <div class="movie-card-holder">
              <img src="${
                imdbMovieData.Poster === "N/A"
                  ? "/images/movie-jacket-sub.png"
                  : imdbMovieData.Poster
              }" class="movie-poster">
              <div class="movie-content-holder">
                <div class="movie-and-rating-holder">
                  <h2 class="movie-title">${imdbMovieData.Title}
                  <span class="movie-rating"><span class="star-emoji">⭐️</span>${
                    imdbMovieData.imdbRating === "N/A"
                      ? "no rating"
                      : imdbMovieData.imdbRating
                  }</span></h2>
                </div>
                <div class="time-and-genre-holder">
                  <div class="time-and-genre-container">
                    <p class="movie-time">${
                      imdbMovieData.Runtime === "N/A"
                        ? ""
                        : imdbMovieData.Runtime
                    }</p>
                    <p class="movie-genre">${
                      imdbMovieData.Genre === "N/A" ? "" : imdbMovieData.Genre
                    }</p>
                  </div>
                  <div>
                    <button class="add-to-watchlist-btn">Watchlist</button>
                  </div>
                </div>
                <div class="plot-holder">
                  <p>${
                    imdbMovieData.Plot === "N/A" ? "" : imdbMovieData.Plot
                  }</p>
                </div>
              </div>
            </div>
            `;
            moviesHolder.innerHTML = movieDescription;
          });
      }
    });
  formEl.reset();
});
