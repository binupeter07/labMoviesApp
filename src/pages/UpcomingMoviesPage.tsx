import PageTemplate from "../components/TemplateMovieListPage";
import { DiscoverMovieOverviewProps } from "../types/movieAppTypes";
import { getUpcomingMovies } from "../api/tmdb-api";
import AddToMustWatchIcon from "../components/cardIcons/AddToMustWatch";
import { useQuery } from "react-query";
import Spinner from "../components/Spinner";

const UpcomingMoviesPage = () => {
  const { data, error, isLoading, isError } = useQuery<DiscoverMovieOverviewProps[], Error>(
    "upcoming",
    getUpcomingMovies
  );

  if (isLoading) return <Spinner />;
  if (isError) return <h1>{error.message}</h1>;

  const movies = data ? data : [];

  return (
    <PageTemplate
      title="Upcoming Movies"
      movies={movies}
      action={(movie) => <AddToMustWatchIcon {...movie} />}
    />
  );
};

export default UpcomingMoviesPage;