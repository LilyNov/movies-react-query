import {
  Route,
  useParams,
  useRouteMatch,
  NavLink,
  useLocation,
} from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { animateScroll as scroll } from 'react-scroll';

import { useState, useEffect } from 'react';
import * as moviesAPI from '../../service/home-app';
import StatusError from '../../StatusError/StatusError';
import CardOfMovie from '../CardOfMovie/CardOfMovie';
import Cast from '../Cast/Cast';
import Reviews from '../Reviews/Reviews';
import s from '../MovieDetailsPage/MovieDetailsPage.module.css';

export default function MovieDetailsPage() {
  const queryClient = new QueryClient();

  const location = useLocation();
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');
  const { url, path } = useRouteMatch();
  const { slug } = useParams();
  const movieId = slug.match(/[a-zA-Z0-9]+$/)[0];
  const movieImg = `https://image.tmdb.org/t/p/w500/${movies.backdrop_path}`;

  useEffect(() => {
    setStatus('pending');

    moviesAPI
      .fetchMoviesInfo(movieId)
      .then(newMovies => {
        setMovies(newMovies);
        setStatus('resolved');
      })
      .catch(error => {
        setError(error);
        setStatus('rejected');
      });
  }, [movieId]);

  return (
    <div>
      {status === 'rejected' && (
        <StatusError message={error.message} style={{ textAlign: 'center' }} />
      )}
      {status === 'resolved' && (
        <>
          <CardOfMovie
            title={movies.title}
            image={
              movies.backdrop_path !== null
                ? movieImg
                : 'https://dummyimage.com/640x480/2a2a2a/ffffff&text=Foto'
            }
            overview={movies.overview}
            part={movies.genres.map(movie => movie.name)}
          />
          <section className={s.about}>
            <NavLink
              onClick={() => {
                scroll.scrollToBottom();
              }}
              to={{
                pathname: `${url}/cast`,
                state: { from: location },
              }}
              className={s.link}
              activeClassName={s.activeLink}
            >
              Cast
            </NavLink>
            <NavLink
              onClick={() => {
                scroll.scrollToBottom();
              }}
              to={{
                pathname: `${url}/reviews`,
                state: { from: location },
              }}
              className={s.link}
              activeClassName={s.activeLink}
            >
              Reviews
            </NavLink>
          </section>
        </>
      )}

      <QueryClientProvider client={queryClient}>
        <Route path={`${path}/cast`}>
          <Cast />
        </Route>

        <Route path={`${path}/reviews`}>
          <Reviews />
        </Route>
      </QueryClientProvider>
    </div>
  );
}
