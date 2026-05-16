import { useState } from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { FantasyMovie } from "../types/movieAppTypes";

const FantasyMovieListPage = () => {
  const [movies, setMovies] = useState<FantasyMovie[]>(
    JSON.parse(localStorage.getItem("fantasyMovies") || "[]")
  );

  const handleDelete = (index: number) => {
    const updated = movies.filter((_, i) => i !== index);
    localStorage.setItem("fantasyMovies", JSON.stringify(updated));
    setMovies(updated);
  };

  return (
    <>
      <Paper sx={{ p: 3, mb: 2 }}>
        <Typography variant="h4" gutterBottom>
          My Fantasy Movies
        </Typography>
        <Button
          component={Link}
          to="/movies/fantasy"
          variant="contained"
          color="primary"
        >
          Create New Fantasy Movie
        </Button>
      </Paper>

      {movies.length === 0 ? (
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6">
            No fantasy movies yet! Create one now.
          </Typography>
        </Paper>
      ) : (
        <Grid container spacing={2}>
          {movies.map((movie, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <Card>
                <CardHeader title={movie.title} />
                <CardContent>
                  <Typography variant="body2" gutterBottom>
                    <strong>Overview:</strong> {movie.overview}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    <strong>Genre:</strong> {movie.genres.join(", ")}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    <strong>Release Date:</strong> {movie.releaseDate}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    <strong>Runtime:</strong> {movie.runtime} mins
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    <strong>Production Company:</strong> {movie.productionCompany}
                  </Typography>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDelete(index)}
                    sx={{ mt: 1 }}
                  >
                    Delete
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
};

export default FantasyMovieListPage;