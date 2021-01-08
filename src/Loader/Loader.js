import Loader from 'react-loader-spinner';
import PropTypes from 'prop-types';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

export default function ImagePendingView() {
  return (
    <Loader
      type="Audio"
      color="#ff6b08"
      height={80}
      width={80}
      style={{
        display: 'block',
        marginLeft: 600,
      }}
    />
  );
}

Loader.propTypes = {
  marginLeft: PropTypes.number,
};
