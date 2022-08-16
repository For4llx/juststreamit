import "../styles/index.scss";

import { banner } from "./banner";
import { moviesList } from "./movies";
import { movieDetails } from "./movieDetails";
import { button } from "./button";

export const app = async () => {
  //data
  const api = "http://127.0.0.1:8000/api/v1/titles/";
  const topRatedMoviesUrl = `${api}?sort_by=-imdb_score&page_size=7`;
  const actionMoviesUrl = `${api}?genre=action&sort_by=-imdb_score&page_size=7`;
  const comedyMoviesUrl = `${api}?genre=comedy&sort_by=-imdb_score&page_size=7`;
  const dramaMoviesUrl = `${api}?genre=drama&sort_by=-imdb_score&page_size=7`;
  let topRatedMovies = await getData(topRatedMoviesUrl);
  let actionMovies = await getData(actionMoviesUrl);
  let comedyMovies = await getData(comedyMoviesUrl);
  let dramaMovies = await getData(dramaMoviesUrl);

  //HTML elements
  const bannerMovie = banner(topRatedMovies.results[0]);
  const previousTopRatedButton = button("previousTopRated", "previous-button");
  const nextTopRatedButton = button("nextTopRated", "next-button");
  const previousActionButton = button("previousAction", "previous-button");
  const nextActionButton = button("nextAction", "next-button");
  const previousComedyButton = button("previousComedy", "previous-button");
  const nextComedyButton = button("nextComedy", "next-button");
  const previousDramaButton = button("previousDrama", "previous-button");
  const nextDramaButton = button("nextDrama", "next-button");
  const topRatedMoviesList = moviesList(topRatedMovies.results, "topRated");
  const actionMoviesList = moviesList(actionMovies.results, "action");
  const comedyMoviesList = moviesList(comedyMovies.results, "comedy");
  const dramaMoviesList = moviesList(dramaMovies.results, "drama");

  // logic
  async function getData(url) {
    /* get data from api via url */
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  async function handlePlayButton(e) {
    /* display moviedetails on click */
    const url = `http://127.0.0.1:8000/api/v1/titles/${e.target.id}`;
    const movies = await getData(url);
    document.getElementById("root").innerHTML += movieDetails(movies);
  }

  function handleCloseButton() {
    /* close moviedetails on click */
    document.getElementById("modal").remove();
  }

  async function handleNextTopRatedButton() {
    topRatedMovies = await getData(topRatedMovies.next);
    document.getElementById("topRated").innerHTML = moviesList(
      topRatedMovies.results,
      "topRated"
    );
  }

  async function handlePreviousTopRatedButton() {
    topRatedMovies = await getData(topRatedMovies.previous);
    document.getElementById("topRated").innerHTML = moviesList(
      topRatedMovies.results,
      "topRated"
    );
  }

  async function handleNextActionButton() {
    actionMovies = await getData(actionMovies.next);
    document.getElementById("action").innerHTML = moviesList(
      actionMovies.results,
      "action"
    );
  }

  async function handlePreviousActionButton() {
    actionMovies = await getData(actionMovies.previous);
    document.getElementById("action").innerHTML = moviesList(
      actionMovies.results,
      "action"
    );
  }

  async function handleNextComedyButton() {
    comedyMovies = await getData(comedyMovies.next);
    document.getElementById("comedy").innerHTML = moviesList(
      comedyMovies.results,
      "comedy"
    );
  }

  async function handlePreviousComedyButton() {
    dramaMovies = await getData(dramaMovies.previous);
    document.getElementById("comedy").innerHTML = moviesList(
      dramaMovies.results,
      "drama"
    );
  }

  async function handleNextDramaButton() {
    dramaMovies = await getData(dramaMovies.next);
    document.getElementById("drama").innerHTML = moviesList(
      dramaMovies.results,
      "drama"
    );
  }

  async function handlePreviousDramaButton() {
    comedyMovies = await getData(comedyMovies.previous);
    document.getElementById("drama").innerHTML = moviesList(
      comedyMovies.results,
      "comedy"
    );
  }

  //DOM manipulations
  document.addEventListener("click", async (e) => {
    if (e.target && e.target.classList.contains("playButton")) {
      handlePlayButton(e);
    }
    if (e.target && e.target.classList.contains("closeButton")) {
      handleCloseButton();
    }
    if (e.target && e.target.id == "nextTopRated") {
      handleNextTopRatedButton();
    }
    if (e.target && e.target.id == "previousTopRated") {
      handlePreviousTopRatedButton();
    }
    if (e.target && e.target.id == "nextAction") {
      handleNextActionButton();
    }
    if (e.target && e.target.id == "previousAction") {
      handlePreviousActionButton();
    }
    if (e.target && e.target.id == "nextComedy") {
      handleNextComedyButton();
    }
    if (e.target && e.target.id == "previousComedy") {
      handlePreviousComedyButton();
    }
    if (e.target && e.target.id == "nextDrama") {
      handleNextDramaButton();
    }
    if (e.target && e.target.id == "previousDrama") {
      handlePreviousDramaButton();
    }
  });

  //view
  document.getElementById("root").innerHTML = /*html*/ `
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
          ${bannerMovie}
        </section>
        <section>
          <h1>Films les mieux notés</h1>
          <div class="roller">
            ${previousTopRatedButton}
            ${topRatedMoviesList}
            ${nextTopRatedButton}
          </div>
        </section>
        <section>
          <h1>Films d'action les mieux notés</h1>
          <div class="roller">
            ${previousActionButton}
            ${actionMoviesList}
            ${nextActionButton}
          </div>
        </section>
        <section>
          <h1>Films de comédie les mieux notés</h1>
          <div class="roller">
            ${previousComedyButton}
            ${comedyMoviesList}
            ${nextComedyButton}
          </div>
        </section>
        <section>
          <h1>Films de drama les mieux notés</h1>
          <div class="roller">
            ${previousDramaButton}
            ${dramaMoviesList}
            ${nextDramaButton}
          </div>
        </section>
      </main>
  `;
};
