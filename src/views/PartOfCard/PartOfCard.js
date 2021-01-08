import s from '../PartOfCard/PartOfCard.module.css';
import { Link, useRouteMatch, useLocation } from 'react-router-dom';
import slugify from 'slugify';

const makeSlug = string => slugify(string, { lower: true });

export default function PartOfCard({ id, title, name, backdrop }) {
  const { url } = useRouteMatch();
  const location = useLocation();

  return (
    <>
      <li className={s.ImageGalleryItem}>
        <Link
          className={s.link}
          to={{
            pathname: `${url}/${makeSlug(`${title} ${id}`)}`,
            state: { from: location },
          }}
        >
          <img
            className={s.ImageGalleryItemImage}
            src={
              backdrop !== null
                ? `https://image.tmdb.org/t/p/w500${backdrop}`
                : 'https://dummyimage.com/480x600/2a2a2a/ffffff&text=foto'
            }
            alt={title}
          />
          <p className={s.text}>
            {' '}
            {name} {title}
          </p>
        </Link>
      </li>
    </>
  );
}
