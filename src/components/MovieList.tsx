import Grid from "@mui/material/Grid";
import MovieCard from "./MovieCard";
import { BaseMovieListProps } from "../types/movieAppTypes";

const MovieList = ({ movies }: BaseMovieListProps) => {
  return (
    <>
      {movies.map((m) => (
        <Grid key={m.id} item xs={12} sm={6} md={4} lg={3} xl={2}>
          <MovieCard movie={m} />
        </Grid>
      ))}
    </>
  );
};

export default MovieList;