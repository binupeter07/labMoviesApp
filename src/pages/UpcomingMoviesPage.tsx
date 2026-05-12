import { useState, useEffect } from "react";
import PageTemplate from "../components/TemplateMovieListPage";
import { DiscoverMovieOverviewProps } from "../types/movieAppTypes";
import { getUpcomingMovies } from "../api/tmdb-api";

const UpcomingMoviesPage = () => {
  const [movies, setMovies] = useState<DiscoverMovieOverviewProps[]>([]);

  useEffect(() => {
    getUpcomingMovies().then((movies) => {
      setMovies(movies);
    });
  }, []);

  return (
    <PageTemplate
      title="Upcoming Movies"
      movies={movies}
      action={() => <></>}
    />
  );
};

export default UpcomingMoviesPage;