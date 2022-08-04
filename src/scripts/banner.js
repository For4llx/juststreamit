export function banner(movie) {
  return /*html*/ `
    <div>
      <article class="movie">
        <figure class="movie__figure">
          <img src=${movie.image_url} class="movie__image" alt="Image du film"/>
        </figure>
        <div class="movie__body">
          <h1 class="movie__title">${movie.title}</h1>
          <button type="button" id=${movie.id} class="movie__button playButton">Play</button>
        </div>
      </article>
    </div>`;
}
