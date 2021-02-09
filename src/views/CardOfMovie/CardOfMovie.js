import { useLocation, useHistory } from "react-router-dom";
import s from "../CardOfMovie/CardOfMovie.module.css";

export default function CardOfMovie({ movies }) {
  const location = useLocation();
  const history = useHistory();

  const onGoBack = () => {
    history.push(location?.state?.from ?? "/movies");
  };

  return (
    <>
      <button className={s.btn} type="button" onClick={onGoBack}>
        Back
      </button>

      <section className={s.card}>
        <img
          src={
            `https://image.tmdb.org/t/p/w500/${movies.backdrop_path}` ??
            "https://dummyimage.com/640x480/2a2a2a/ffffff&text=Foto"
          }
          alt={movies.title || movies.name}
        />
        <div className={s.cardAbout}>
          <h2 className={s.title}>{movies.title || movies.name}</h2>
          {movies.genres.map((movie) => (
            <p key={movie.name} className={s.text}>
              {movie.name} <br />
            </p>
          ))}

          <p className={s.text}>{movies.overview}</p>
        </div>
      </section>
    </>
  );
}
