import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getSimilarMovies } from "../api/tmdb-api";
import { DiscoverMovieOverviewProps } from "../types/movieAppTypes";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import MovieCard from "../components/MovieCard";
import Spinner from "../components/Spinner";
import AddToFavouritesIcon from "../components/cardIcons/AddToFavourites";

const SimilarMoviesPage = () => {
  const { id } = useParams();

  const { data, isLoading, isError, error } = useQuery<DiscoverMovieOverviewProps[], Error>(
    ["similar", id],
    () => getSimilarMovies(id || "")
  );

  if (isLoading) return <Spinner />;
  if (isError) return <h1>{error.message}</h1>;

  const movies = data ? data : [];

  return (
    <>
      <Paper sx={{ p: 3, mb: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Similar Movies
        </Typography>
      </Paper>
      <Grid container spacing={2}>
        {movies.map((movie) => (
          <Grid item key={movie.id} xs={12} sm={6} md={4} lg={3}>
            <MovieCard
              movie={movie}
              action={(movie) => <AddToFavouritesIcon {...movie} />}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default SimilarMoviesPage;