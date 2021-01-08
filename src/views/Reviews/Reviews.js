import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import StatusError from '../../StatusError/StatusError';
import { KEY, BASE_URL } from '../../service/home-app';

export default function Reviews() {
  const { slug } = useParams();
  const movieId = slug.match(/[a-zA-Z0-9]+$/)[0];
  const { data, status } = useQuery('reviews', () =>
    fetch(
      `${BASE_URL}/movie/${movieId}/reviews?api_key=${KEY}&language=en-US&page=1`,
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
          <ul>
            {data.results.map(({ id, content }) => (
              <li key={id} style={{ listStyle: 'none' }}>
                <p style={{ color: 'white' }}>{content}</p>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
