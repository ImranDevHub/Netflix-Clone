import movieTrailer from 'movie-trailer';
import { useEffect, useState } from 'react';
import axios from '../utils/axios';
import YoutubeModal from './YoutubeModal';

function Row({ fetchUrl, type, isLarge }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const base_img = 'https://image.tmdb.org/t/p/original';
  let movieName = '';

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(fetchUrl);
        setMovies(response.data.results);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [fetchUrl]);

  const handleTrailer = async movie => {
    const name = movie?.name || movie?.title || movie?.original_name;
    setSelectedMovie(() => movie);

    if (trailerUrl) {
      setTrailerUrl(''); // Close trailer if one is already playing
    } else {
      try {
        const url = await movieTrailer(name);
        if (url) {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get('v')); // Extract video ID
        } else {
          setTrailerUrl(''); // No trailer found
        }
        setModalShow(true); // Open modal regardless of trailer availability
      } catch (err) {
        console.error('Error fetching trailer:', err);
        setTrailerUrl(''); // No trailer found on error
        setModalShow(true); // Still open modal to show fallback message
      }
    }
  };

  return (
    <>
      <section className="row__section mt-5">
        <h2>{type}</h2>
        <div className="row">
          {movies?.map(movie => (
            <div className="row__col" key={movie.id}>
              <div
                onClick={() => handleTrailer(movie)}
                style={{ cursor: 'pointer' }}
              >
                <img
                  src={`${base_img}${
                    isLarge ? movie.poster_path : movie.backdrop_path
                  }`}
                  alt={movie.name || movie.title}
                  className={`row__posture${
                    isLarge ? ' row__posture--large' : ''
                  }`}
                />
              </div>
            </div>
          ))}
        </div>

        <YoutubeModal
          trailerUrl={trailerUrl && trailerUrl}
          selectedMovie={selectedMovie}
          show={modalShow}
          onHide={() => {
            setModalShow(false);
            setTrailerUrl('');
          }}
        />
      </section>
    </>
  );
}

export default Row;
