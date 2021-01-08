import { useQuery } from 'react-query';
import { Link, useLocation } from 'react-router-dom';
import slugify from 'slugify';
import StatusError from '../../StatusError/StatusError';
import s from '../HomePage/HomePage.module.css';
import { KEY, BASE_URL } from '../../service/home-app';

const makeSlug = string => slugify(string, { lower: true });

export default function HomePage() {
  const location = useLocation();
  const { data, status } = useQuery('homePage', () =>
    fetch(`${BASE_URL}/trending/all/day?api_key=${KEY}`).then(res =>
      res.json(),
    ),
  );

  return (
    <div>
      {status === 'error' && (
        <StatusError
          message={'not found anything'}
          style={{ textAlign: 'center' }}
        />
      )}

      {status === 'success' && (
        <>
          <ul className={s.ItemList}>
            {data.results.map(
              ({ id, title, name, backdrop_path, vote_average }) => (
                <li className={s.ImageGalleryItem} key={id}>
                  <Link
                    className={s.link}
                    to={{
                      pathname: `movies/${makeSlug(`${title} ${id}`)}`,
                      state: { from: location },
                    }}
                  >
                    <img
                      className={s.ImageGalleryItemImage}
                      src={
                        backdrop_path !== null
                          ? `https://image.tmdb.org/t/p/w500${backdrop_path}`
                          : 'https://dummyimage.com/480x600/2a2a2a/ffffff&text=Movie+foto'
                      }
                      alt={title}
                    />
                    <div className={s.about}>
                      <p className={s.text}>
                        {name} {title}
                      </p>
                      <p className={s.rating}>{vote_average}</p>
                    </div>
                  </Link>
                </li>
              ),
            )}
          </ul>
        </>
      )}
    </div>
  );
}
