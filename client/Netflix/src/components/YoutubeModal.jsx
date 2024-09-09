import Modal from 'react-bootstrap/Modal';
import Youtube from 'react-youtube';

function YoutubeModal(props) {
  const { trailerUrl, selectedMovie } = props;

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {selectedMovie?.name ||
            selectedMovie?.title ||
            selectedMovie?.original_title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {trailerUrl ? (
          <Youtube
            videoId={trailerUrl}
            opts={{
              width: '100%',
              height: '390',
              playerVars: { autoplay: 1 },
            }}
            onReady={event => event.target.mute()}
          />
        ) : (
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <h5>Trailer not available</h5>
            <p>We couldn't find a trailer for this movie.</p>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
}

export default YoutubeModal;
