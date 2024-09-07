import movieTrailer from 'movie-trailer';
import { useEffect, useState } from 'react';
import axios from '../utils/axios';
import Youtube from 'react-youtube';

function Row({ fetchUrl, type, isLarge }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState(null);

  const base_img = 'https://image.tmdb.org/t/p/original';

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
    if (trailerUrl) {
      setTrailerUrl(''); // Close trailer if one is already playing
    } else {
      try {
        const url = await movieTrailer(
          movie?.name || movie?.title || movie?.original_name
        );
        if (url) {
          const urlParams = new URLSearchParams(new URL(url).search);
          //  console.log(urlParams.get('v'));
          setTrailerUrl(urlParams.get('v')); // Extract video ID
        }
      } catch (err) {
        console.error('Error fetching trailer:', err);
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
        {trailerUrl && (
          <Youtube
            videoId={trailerUrl}
            opts={{
              width: '100%',
              height: '390',
              playerVars: { autoplay: 1 },
            }}
            onReady={event => event.target.mute()}
          />
        )}
      </section>
    </>
  );
}

export default Row;
