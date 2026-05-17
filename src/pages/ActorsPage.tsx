import { useState } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
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
    <Box sx={{ backgroundColor: "#141414", minHeight: "100vh", pb: 4 }}>
      {/* Header */}
      <Box
        sx={{
          background: "linear-gradient(to right, #000000, #1a1a2e)",
          borderBottom: "2px solid #e50914",
          px: 3,
          py: 2,
          mb: 3,
        }}
      >
        <Typography
          variant="h4"
          sx={{ color: "white", fontWeight: "bold", letterSpacing: 2 }}
        >
          Popular Actors
        </Typography>
      </Box>

      <Box sx={{ px: 3, mb: 3 }}>
        <TextField
          fullWidth
          label="Filter by name"
          variant="outlined"
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
          sx={{
            "& .MuiOutlinedInput-root": {
              color: "white",
              "& fieldset": { borderColor: "#e50914" },
              "&:hover fieldset": { borderColor: "#e50914" },
            },
            "& .MuiInputLabel-root": { color: "#aaaaaa" },
          }}
        />
      </Box>

      <Grid container spacing={2} sx={{ px: 3 }} justifyContent="center">
        {displayedActors.map((actor) => (
          <Grid item key={actor.id} xs={6} sm={4} md={3} lg={2}>
            <ActorCard actor={actor} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ActorsPage;