import { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { BiSearchAlt } from 'react-icons/bi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import s from '../Searchbar/Searchbar.module.css';

export default function Searchbar({ getMovies }) {
  const [movies, setMovies] = useState('');
  const history = useHistory();
  const location = useLocation();

  const handleQueryChange = query => {
    history.push({
      ...location,
      search: `query=${query}`,
    });
  };

  //получение значения input
  const handleNameChange = e => {
    setMovies(e.currentTarget.value.toLowerCase());
  };

  //отправка значения из формы
  const handleSubmit = e => {
    e.preventDefault();

    if (movies.trim() === '') {
      toast.warn('Fill out the form');
      return;
    }

    getMovies(movies);
    setMovies('');
    handleQueryChange(movies);
  };

  return (
    <header className={s.Searchbar}>
      <form className={s.SearchForm} onSubmit={handleSubmit}>
        <input
          className={s.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search movies"
          value={movies}
          onChange={handleNameChange}
        />
        <button type="submit" className={s.SearchFormButton}>
          <BiSearchAlt style={{ marginRight: 8 }} />
        </button>
      </form>
    </header>
  );
}
