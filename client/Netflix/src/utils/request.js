const API_KEY = import.meta.env.VITE_API_KEY;

const request = {
  fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
  fetchNetflixOriginals: `/discover/tv?include_adult=true&language=en-US&sort_by=popularity.desc&with_networks=213&api_key=${API_KEY}`,
  fetchTopRatedMovies: `/movie/top_rated?language=en-US&api_key=${API_KEY}`,
  fetchActionMovies: `/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=28&api_key=${API_KEY}`,
  fetchComedy: `/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=35&api_key=${API_KEY}`,
  fetchHorror: `/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=27&api_key=${API_KEY}`, // Added API Key
  fetchRomance: `/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=10749&api_key=${API_KEY}`,
  fetchDocumentary: `/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=99&api_key=${API_KEY}`, // Added API Key
  fetchTvShow: `/tv/popular?language=en-US&page=1&api_key=${API_KEY}`, // Fixed API Key placement
};

export default request;
