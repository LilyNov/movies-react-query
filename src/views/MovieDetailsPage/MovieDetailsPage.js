import {
  Route,
  useParams,
  useRouteMatch,
  NavLink,
  useLocation,
} from "react-router-dom";
import { useQuery } from "react-query";
import { QueryClient, QueryClientProvider } from "react-query";
import { animateScroll as scroll } from "react-scroll";
import { KEY, BASE_URL } from "../../service/home-app";
import StatusError from "../../StatusError/StatusError";
import CardOfMovie from "../CardOfMovie/CardOfMovie";
import Cast from "../Cast/Cast";
import Reviews from "../Reviews/Reviews";
import s from "../MovieDetailsPage/MovieDetailsPage.module.css";

export default function MovieDetailsPage() {
  const queryClient = new QueryClient();

  const location = useLocation();
  const { url, path } = useRouteMatch();
  const { slug } = useParams();
  const movieId = slug.match(/[a-zA-Z0-9]+$/)[0];
  const { data, status } = useQuery("movieDetailsPage", () =>
    fetch(
      `${BASE_URL}/movie/${movieId}?api_key=${KEY}&language=en-US`
    ).then((res) => res.json())
  );

  return (
    <div>
      {status === "error" && (
        <StatusError
          message={data.status_message}
          style={{ textAlign: "center" }}
        />
      )}
      {status === "success" && (
        <>
          <CardOfMovie movies={data} />
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
