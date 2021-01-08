import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import StatusError from '../../StatusError/StatusError';
import s from '../HomePage/HomePage.module.css';
import PartOfCard from '../PartOfCard/PartOfCard';
import { KEY, BASE_URL } from '../../service/home-app';

export default function Cast() {
  const { slug } = useParams();
  const movieId = slug.match(/[a-zA-Z0-9]+$/)[0];
  const { data, status } = useQuery('cast', () =>
    fetch(
      `${BASE_URL}/movie/${movieId}/credits?api_key=${KEY}&language=en-US`,
    ).then(res => res.json()),
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
            {data.cast.map(actor => (
              <PartOfCard
                backdrop={actor.profile_path}
                name={actor.name}
                key={actor.id}
              />
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
