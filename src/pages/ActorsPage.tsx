import { useState } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useQuery } from "react-query";
import { getPopularActors } from "../api/tmdb-api";
import { Actor } from "../types/movieAppTypes";
import ActorCard from "../components/ActorCard";
import Spinner from "../components/Spinner";

const ActorsPage = () => {
  const [nameFilter, setNameFilter] = useState("");

  const { data, isLoading, isError, error } = useQuery<Actor[], Error>(
    "actors",
    getPopularActors
  );

  if (isLoading) return <Spinner />;
  if (isError) return <h1>{error.message}</h1>;

  const actors = data ? data : [];

  const displayedActors = nameFilter
    ? actors.filter((a) =>
        a.name.toLowerCase().includes(nameFilter.toLowerCase())
      )
    : actors;

  return (
    <>
      <Paper sx={{ p: 3, mb: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Popular Actors
        </Typography>
      </Paper>

      <Paper sx={{ p: 2, mb: 2 }}>
        <TextField
          fullWidth
          label="Filter by name"
          variant="outlined"
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
        />
      </Paper>

      <Grid container spacing={2} justifyContent="center">
  {displayedActors.map((actor) => (
    <Grid item key={actor.id} xs={6} sm={4} md={3} lg={2}>
            <ActorCard actor={actor} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default ActorsPage;