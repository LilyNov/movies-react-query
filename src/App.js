import { Switch, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Loader from './Loader/Loader';
import Container from './Container/Container';
import AppBar from './AppBar/AppBar';
import { QueryClient, QueryClientProvider } from 'react-query';

const HomePage = lazy(() =>
  import('./views/HomePage/HomePage.js' /*webpackChunkName: "home-page" */),
);
const MoviesPage = lazy(() =>
  import('./views/MoviesPage.js' /*webpackChunkName: "movies-page" */),
);
const NotFoundView = lazy(() =>
  import('./views/NotFoundView.js' /*webpackChunkName: "notFound-page" */),
);
const MovieDetailsPage = lazy(() =>
  import(
    './views/MovieDetailsPage/MovieDetailsPage.js' /*webpackChunkName: "movieDetails-page" */
  ),
);

export default function App() {
  const queryClient = new QueryClient();

  return (
    <Container>
      <AppBar />

      <Suspense fallback={<Loader />}>
        <Switch>
          <QueryClientProvider client={queryClient}>
            <Route path="/" exact>
              <HomePage />
            </Route>

            <Route path="/movies" exact>
              <MoviesPage />
            </Route>

            <Route path="/movies/:slug">
              <MovieDetailsPage />
            </Route>
          </QueryClientProvider>
          <Route>
            <NotFoundView path="/" />
          </Route>
        </Switch>
      </Suspense>
    </Container>
  );
}
