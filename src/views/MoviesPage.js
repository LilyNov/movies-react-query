import { useQuery } from "react-query";
import { useState } from "react";

import { ToastContainer } from "react-toastify";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import Loader from "../Loader/Loader";
import Searchbar from "./Searchbar/Searchbar";
import StatusError from "../StatusError/StatusError";
import PartOfCard from "./PartOfCard/PartOfCard";
import s from "./HomePage/HomePage.module.css";
import { KEY, BASE_URL } from "../service/home-app";

export default function MoviesPage() {
  const location = useLocation();
  const [querySearchParams, setQuery] = useState(
    new URLSearchParams(location.search).get("query") ?? []
  );

  const { data, status } = useQuery(["moviesPage", querySearchParams], () =>
    fetch(
      `${BASE_URL}/search/movie?api_key=${KEY}&query=${querySearchParams}&language=en-US&page=1&include_adult=false`
    ).then((response) => {
      if (querySearchParams.length === 0) {
        return;
      }
      if (response.ok) {
        return response.json();
      }
    })
  );

  console.log(data);

  return (
    <>
      <div>
        <Searchbar getMovies={setQuery} />

        {status === "idle" && <p style={{ textAlign: "center" }}>Let's Go!</p>}

        {status === "loading" && <Loader />}

        {status === "error" && (
          <StatusError
            message={"not found anything"}
            style={{ textAlign: "center" }}
          />
        )}

        {status === "success" && (
          <>
            <ul className={s.ItemList}>
              {data?.results?.map((movie) => (
                <PartOfCard
                  key={movie.id}
                  id={movie.id}
                  title={movie.title}
                  name={movie.name}
                  backdrop={movie.backdrop_path}
                />
              ))}
            </ul>
          </>
        )}
        <ToastContainer autoClose={3000} />
      </div>
    </>
  );
}

MoviesPage.propTypes = {
  querySearchParams: PropTypes.string,
};
