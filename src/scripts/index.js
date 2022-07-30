import "../styles/index.scss";

function createHTML() {
  let root = document.getElementById("root");

  root.innerHTML = /*html*/ `
  <header class="header">
      <h1>JustStreamIt</h1>
      <nav>
        <ul class="menu">
          <li><a href="#">Accueil</a></li>
          <li><a href="#">Catégories</a></li>
        </ul>
      </nav>
    </header>
    <main class="home">
      <section>
        <h1>Meilleur film</h1>
        <div id='best' class="best_movie__banner"></div>
      </section>
      <section>
        <h1>Films les mieux notés</h1>
        <ul id='topRated' class="movie-list"></ul>
      </section>
      <section>
        <h1>Films d'action les mieux notés</h1>
        <ul id='action' class="movie-list"></ul>
      </section>
      <section>
        <h1>Films de comédie les mieux notés</h1>
        <ul id='comedy' class="movie-list"></ul>
      </section>
      <section>
        <h1>Films de drama les mieux notés</h1>
        <ul id='drama' class="movie-list"></ul>
      </section>
    </main>
`;
}

async function getMovies(url) {
  try {
    let response = await fetch(url);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error(error);
  }
}

async function getMovie(url) {
  try {
    let response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
window.handleClose = function () {
  document.getElementById("modal").remove();
};

function movieDetails(movie) {
  let genres = movie.genres.map((genre) => `<li>${genre}</li>`).join("");
  let actors = movie.actors.map((actor) => `<li>${actor}</li>`).join("");
  let countries = movie.countries
    .map((country) => `<li>${country}</li>`)
    .join("");
  document.getElementById("root").innerHTML += /*html*/ `
    <article class="modal" id="modal">
      <div class="modal__container">
        <figure>
          <img src=${movie.image_url} alt="image du film"/>
        </figure>
        <ul>
          <li><h2>${movie.title}</h2></li>
          <li>
            <p>Genres :</p>
            <ul>
              ${genres}
            </ul>
          </li>
          <li><p>Date de sortie: ${movie.year}</p></li>
          <li><p>Note: ${movie.rated}</p></li>
          <li><p>Score: ${movie.imdb_score}</p></li>
          <li><p>Réalisateurs: ${movie.directors}</p></li>
          <li>
            <p>Acteurs :</p>
            <ul>
              ${actors}
            </ul>
          </li>
          <li><p>Durée: ${movie.duration} minutes</p></li>
          <li>
            <p>Pays :</p>
            <ul>
              ${countries}
            </ul>
          </li>
          <li>Description : ${movie.description}</li>
        </ul>
        <button onclick="window.handleClose()" type="button" class="movie__button">Close</button>
      </div>
    </article>
  `;
}

window.handleMovie = async function (id) {
  const url = `http://127.0.0.1:8000/api/v1/titles/${id}`;
  const movie = await getMovie(url);
  movieDetails(movie);
};

function createMovies(movies, id) {
  movies.map((movie) => {
    document.getElementById(id).innerHTML += /* html */ `
    <li>
      <article class="movie">
        <figure class="movie__figure">
          <img src=${movie.image_url} class="movie__image" alt="Image du film"/>
        </figure>
        <div class="movie__body">
          <h1 class="movie__title">${movie.title}</h1>
          <button onclick="window.handleMovie(${movie.id})" type="button" id=${movie.id} class="movie__button">Play</button>
        </div>
      </article>
    </li>
  `;
  });
}

async function main() {
  const bestMovieUrl =
    "http://127.0.0.1:8000/api/v1/titles/?sort_by=-imdb_score&page_size=7";
  const actionMovieUrl =
    "http://127.0.0.1:8000/api/v1/titles/?genre=action&sort_by=-imdb_score&page_size=7";
  const comedyMovieUrl =
    "http://127.0.0.1:8000/api/v1/titles/?genre=comedy&sort_by=-imdb_score&page_size=7";
  const dramaMovieUrl =
    "http://127.0.0.1:8000/api/v1/titles/?genre=drama&sort_by=-imdb_score&page_size=7";

  const bestMovies = await getMovies(bestMovieUrl);
  const topRatedActionMovies = await getMovies(actionMovieUrl);
  const topRatedComedyMovies = await getMovies(comedyMovieUrl);
  const topRatedDramaMovies = await getMovies(dramaMovieUrl);

  createHTML();
  createMovies([bestMovies[0]], "best");
  createMovies(bestMovies, "topRated");
  createMovies(topRatedComedyMovies, "comedy");
  createMovies(topRatedActionMovies, "action");
  createMovies(topRatedDramaMovies, "drama");
}

main();
