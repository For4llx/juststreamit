export function movieDetails(movie) {
  let genres = movie.genres.map((genre) => `<li>${genre}</li>`).join("");
  let actors = movie.actors.map((actor) => `<li>${actor}</li>`).join("");
  let countries = movie.countries
    .map((country) => `<li>${country}</li>`)
    .join("");

  return /*html*/ `
    <div class="modal" id="modal">
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
        <button type="button" class="movie__button closeButton">Close</button>
      </div>
    </div>
  `;
}
