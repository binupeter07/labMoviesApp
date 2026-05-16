import PageTemplate from "../components/TemplateMovieListPage";
import { DiscoverMovieOverviewProps } from "../types/movieAppTypes";
import { getNowPlayingMovies } from "../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from "../components/Spinner";
import AddToFavouritesIcon from "../components/cardIcons/AddToFavourites";

const NowPlayingPage = () => {
  const { data, error, isLoading, isError } = useQuery<DiscoverMovieOverviewProps[], Error>(
    "nowPlaying",
    getNowPlayingMovies
  );

  if (isLoading) return <Spinner />;
  if (isError) return <h1>{error.message}</h1>;

  const movies = data ? data : [];

  return (
    <PageTemplate
      title="Now Playing"
      movies={movies}
      action={(movie) => <AddToFavouritesIcon {...movie} />}
    />
  );
};

export default NowPlayingPage;