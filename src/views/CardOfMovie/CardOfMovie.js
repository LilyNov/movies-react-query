import { useLocation, useHistory } from 'react-router-dom';
import s from '../CardOfMovie/CardOfMovie.module.css';

export default function CardOfMovie({ title, image, overview, part }) {
  const location = useLocation();
  const history = useHistory();

  const onGoBack = () => {
    history.push(location?.state?.from ?? '/movies');
  };

  return (
    <>
      <button className={s.btn} type="button" onClick={onGoBack}>
        Back
      </button>

      <section className={s.card}>
        <img src={image} alt={title} />
        <div className={s.cardAbout}>
          <h2 className={s.title}>{title}</h2>
          <p className={s.text}>
            {part[0]} <br />
            {part[1]}
          </p>
          <p className={s.text}>{overview}</p>
        </div>
      </section>
    </>
  );
}
