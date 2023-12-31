import { baseURL, key } from "./settings/config.js";

const formEl = document.getElementById("form-el");
const moviesHolder = document.getElementById("movies-holder");
const watchlistCheckBtn = document.getElementById("watchlist-check-btn");
let movieDescription = "";
let addIconDiv = "";

let watchlistArray = JSON.parse(localStorage.getItem("imdbMovie")) || [];

formEl.addEventListener("submit", (e) => {
  const searchFieldValue = document.getElementById("search-field").value.trim();
  const searchNotFoundHolder = document.getElementById(
    "search-not-found-holder"
  );
  const searchNotFoundText = document.getElementById("search-not-found-text");
  const introPrompt = document.getElementById("intro-prompt");
  const mainHolder = document.getElementById("main-holder");
  movieDescription = "";
  let imdbMovieIdArray = [];
  e.preventDefault();
  fetch(`${baseURL}?apikey=${key}&s=${searchFieldValue}&type=movie`)
    .then((res) => res.json())
    .then((movieData) => {
      document.getElementById("search-field").value;
      introPrompt.classList.add("hidden");
      mainHolder.classList.remove("vertical-height");
      if (movieData.Search === undefined) {
        moviesHolder.innerHTML = "";
        searchNotFoundHolder.classList.add("search-not-fount-vertical-height");
        searchNotFoundText.classList.remove("hidden");
        searchNotFoundText.textContent =
          "Unable to find what you’re looking for. Please try another search.";
      } else {
        searchNotFoundHolder.classList.remove(
          "search-not-fount-vertical-height"
        );
        searchNotFoundHolder.classList.add("hidden");
        searchNotFoundText.classList.add("hidden");
        for (let movie of movieData.Search) {
          imdbMovieIdArray.push(movie.imdbID);
        }
      }
    })
    .then(() => {
      for (let imdbMovieId of imdbMovieIdArray) {
        fetch(`${baseURL}?apikey=${key}&i=${imdbMovieId}&type=movie&plot=full`)
          .then((res) => res.json())
          .then((imdbMovieData) => {
            // console.log(imdbMovieData);
            document.addEventListener("click", (e) => {
              if (e.target.dataset.addToWatchlist) {
                handleWatchlistItem(
                  e.target.dataset.addToWatchlist,
                  imdbMovieData
                );
              }
            });
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
                    <p class="movie-time" data-duration=${
                      imdbMovieData.imdbID
                    }>${
              imdbMovieData.Runtime === "N/A" ? "" : imdbMovieData.Runtime
            }</p>
                    <p class="movie-genre">${
                      imdbMovieData.Genre === "N/A" ? "" : imdbMovieData.Genre
                    }</p>
                  </div>
                  <div class="add-to-watchlist-btn-holder">
                    <button class="add-to-watchlist-btn" data-add-to-watchlist=${
                      imdbMovieData.imdbID
                    }>Watchlist</button>
                    <div class="added-icon hidden">
                      Added
                    </div>
                  </div>
                </div>
                <div class="plot-holder">
                  <p>${
                    imdbMovieData.Plot === "N/A"
                      ? "<span class='no-description'>Plot not available.</span>"
                      : handlePlot(imdbMovieData)
                  }</p>
                </div>
              </div>
            </div>
            `;
            function handleWatchlistItem(watchlistItemID, imdbMovieData) {
              const addToWatchlistBtns = document.querySelectorAll(
                ".add-to-watchlist-btn"
              );
              for (let addToWatchlistBtn of addToWatchlistBtns) {
                const watchlistBtn = addToWatchlistBtn.dataset.addToWatchlist;

                if (watchlistBtn === watchlistItemID) {
                  addToWatchlistBtn.classList.add("hidden");
                  addToWatchlistBtn.nextElementSibling.classList.remove(
                    "hidden"
                  );
                }
              }
              if (imdbMovieData.imdbID === watchlistItemID) {
                let watchlistMovie = imdbMovieData;
                watchlistArray.push(watchlistMovie);
                // console.log(watchlistArray);
                localStorage.setItem(
                  "imdbMovie",
                  JSON.stringify(watchlistArray)
                );
              }
            }
            moviesHolder.innerHTML = movieDescription;

            const addToWatchlistBtns = document.querySelectorAll(
              ".add-to-watchlist-btn"
            );
            for (let watchlistArrayItem of watchlistArray) {
              let watchlistObjsIDs = watchlistArrayItem.imdbID;
              for (let eachAddToWatchlistBtn of addToWatchlistBtns) {
                let addToWatchlistBtnElIDs =
                  eachAddToWatchlistBtn.dataset.addToWatchlist;
                if (addToWatchlistBtnElIDs === watchlistObjsIDs) {
                  eachAddToWatchlistBtn.classList.add("hidden");
                  eachAddToWatchlistBtn.nextElementSibling.classList.remove(
                    "hidden"
                  );
                }
              }
            }

            const movieTimeHolders = document.querySelectorAll(".movie-time");
            for (let movieTimeHolder of movieTimeHolders) {
              if (movieTimeHolder.textContent === "") {
                movieTimeHolder.classList.remove("movie-time");
              }
            }
          });
      }
    });
  formEl.reset();
});

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
