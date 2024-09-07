import { useEffect, useState } from 'react';
import axios from '../utils/axios';
import request from '../utils/request';
import Button from './Button';

function Banner() {
  const [movie, setMovie] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(request.fetchNetflixOriginals);
        // console.log(response);
        const data = response.data;
        // console.log(data);
        const result =
          data.results[Math.floor(Math.random() * (data.results.length + 1))];
        console.log(Math.floor(Math.random() * (data.results.length + 1)));
        setMovie(() => result);
        // console.log(result);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  const truncate = function (str, len) {
    return str > 150 ? str.slice(0, str.length) + '...' : str;
  };
  console.log(movie);
  return (
    <>
      <section className="banner">
        <div
          className="banner__container"
          // style={{
          //   backgroundImage: `url('https://image.tmdb.org/t/p/original/${movie?.backdrop_path}')`,
          // }}
        >
          <img
            className="banner__img"
            src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
            alt={`${movie.name}`}
          />

          <div className="banner__content">
            <div>
              <h2 className="banner__title">
                {movie?.name || movie?.title || movie?.original_name}
              </h2>
            </div>
            <div>
              <Button className="btn button__light fw-bold fs-4">Play</Button>
              <Button className="btn bg-dark bg-gradient fw-bold fs-4 bg-opacity-25 ms-4  banner__my-list">
                My List
              </Button>
            </div>
            <p className="banner__overview">{truncate(movie?.overview, 150)}</p>
          </div>
        </div>
      </section>
    </>
  );
}

export default Banner;
