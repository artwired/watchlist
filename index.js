const formEl = document.getElementById("form-el");

formEl.addEventListener("submit", (e) => {
  const searchFieldValue = document.getElementById("search-field").value;
  const moviesHolder = document.getElementById("movies-holder");
  const introPrompt = document.getElementById("intro-prompt");
  const mainHolder = document.getElementById("main-holder");
  e.preventDefault();
  fetch(
    `http://www.omdbapi.com/?i=tt3896198&apikey=ef07b548&s=${searchFieldValue}`
  )
    .then((res) => res.json())
    .then((movieData) => {
      console.log(movieData);
      document.getElementById("search-field").value;
      introPrompt.classList.add("hidden");
      mainHolder.classList.remove("vertical-height");
      let movieDescription = "";
      for (let movie of movieData.Search) {
        console.log(movie);
        movieDescription += `
          <div class="movie-card-holder" data-id="${movie.imdbID}">
          <img src="${movie.Poster}" class="movie-poster">
            <div class="movie-info-holder">
              <div>
              <h2 class="movie-title">${movie.Title}</h2>
              <div>ratings</div>
              </div>
            </div>
          </div>
       `;
      }

      moviesHolder.innerHTML = movieDescription;
    });
  formEl.reset();
});
