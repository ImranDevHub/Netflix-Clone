import request from '../utils/request';
import Row from './Row';

const rowOptions = [
  {
    url: request.fetchNetflixOriginals,
    type: 'Netflix Originals',
    isLarge: true,
  },
  {
    url: request.fetchTrending,
    type: 'Trending',
  },
  {
    url: request.fetchTopRatedMovies,
    type: 'Top Rated',
  },
  {
    url: request.fetchActionMovies,
    type: 'Action Movies',
  },
  {
    url: request.fetchComedy,
    type: 'Comedy',
  },
  {
    url: request.fetchHorror,
    type: 'Horror Movies',
  },
  {
    url: request.fetchRomance,
    type: 'Romance Movies',
  },
  {
    url: request.fetchDocumentary,
    type: 'Documentary Movies',
  },
  {
    url: request.fetchTvShow,
    type: 'Tv Show',
  },
];

// const { url, type, isLarge } = rowOptions[1];

function Rows() {
  return (
    <>
      {/* <Row fetchUrl={url} type={type} isLarge={isLarge} /> */}
      {rowOptions?.map(({ url, type, isLarge }) => (
        <Row
          key={type} // Use type for unique keys instead of index
          fetchUrl={url}
          type={type}
          isLarge={isLarge}
        />
      ))}
    </>
  );
}

export default Rows;
