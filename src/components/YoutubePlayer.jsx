import ReactPlayer from 'react-player'
import PropTypes from 'prop-types';
import Modal from './shared/Modal';

const YoutubePlayer = ({ selectedMovieTitle, videoKey }) => (
  <Modal title={selectedMovieTitle}>
    {videoKey ? (<ReactPlayer 
      className="video-player" 
      url={`https://www.youtube.com/watch?v=${videoKey}`} 
      controls={true}
      playing={true}
      data-testid="youtube-player"
    />) : (
      <div style={{ padding: "30px" }}>
        <h6>no trailer available. Try another movie</h6>
      </div>
    )}
  </Modal>
);

YoutubePlayer.propTypes = {
  selectedMovieTitle: PropTypes.string,
  videoKey: PropTypes.string,
}

export default YoutubePlayer;