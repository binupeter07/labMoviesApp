import { useState } from "react";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MonetizationIcon from "@mui/icons-material/MonetizationOn";
import StarRate from "@mui/icons-material/StarRate";
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";
import RateReviewIcon from "@mui/icons-material/RateReview";
import MovieIcon from "@mui/icons-material/Movie";
import { MovieDetailsProps } from "../types/movieAppTypes";
import { Link } from "react-router-dom";
import MovieReviews from './MovieReviews';
import MovieCredits from "./MovieCredits";

const MovieDetails = (movie: MovieDetailsProps) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <Box sx={{ color: "white" }}>


      <Typography variant="h5" sx={{ color: "#e50914", fontWeight: "bold", mb: 1 }}>
        Overview
      </Typography>
      <Typography variant="body1" sx={{ color: "#cccccc", mb: 3, lineHeight: 1.8 }}>
        {movie.overview}
      </Typography>


      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" sx={{ color: "#e50914", fontWeight: "bold", mb: 1 }}>
          Genres
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
          {movie.genres?.map((g) => (
            <Chip
              key={g.name}
              label={g.name}
              sx={{
                backgroundColor: "#e50914",
                color: "white",
                fontWeight: "bold",
              }}
            />
          ))}
        </Box>
      </Box>


      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 3 }}>
        <Chip
          icon={<AccessTimeIcon sx={{ color: "white !important" }} />}
          label={`${movie.runtime} min`}
          sx={{ backgroundColor: "#1f1f1f", color: "white" }}
        />
        <Chip
          icon={<MonetizationIcon sx={{ color: "white !important" }} />}
          label={`$${movie.revenue.toLocaleString()}`}
          sx={{ backgroundColor: "#1f1f1f", color: "white" }}
        />
        <Chip
          icon={<StarRate sx={{ color: "#f5c518 !important" }} />}
          label={`${movie.vote_average?.toFixed(1)} (${movie.vote_count} votes)`}
          sx={{ backgroundColor: "#1f1f1f", color: "white" }}
        />
        <Chip
          icon={<CalendarIcon sx={{ color: "white !important" }} />}
          label={`Released: ${movie.release_date}`}
          sx={{ backgroundColor: "#1f1f1f", color: "white" }}
        />
      </Box>


      <Box sx={{ display: "flex", gap: 2, mb: 4 }}>
        <Button
          variant="contained"
          startIcon={<RateReviewIcon />}
          onClick={() => setDrawerOpen(true)}
          sx={{
            backgroundColor: "#e50914",
            "&:hover": { backgroundColor: "#b20710" },
          }}
        >

        </Button>
        <Link to={`/movies/${movie.id}/similar`} style={{ textDecoration: "none" }}>
          <Button
            variant="outlined"
            startIcon={<MovieIcon />}
            sx={{
              borderColor: "#e50914",
              color: "#e50914",
              "&:hover": {
                borderColor: "#b20710",
                backgroundColor: "rgba(229,9,20,0.1)",
              },
            }}
          >
            Similar Movies
          </Button>
        </Link>
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" sx={{ color: "#e50914", fontWeight: "bold", mb: 2 }}>
          Cast
        </Typography>
        <MovieCredits movieId={movie.id} />
      </Box>


      <Drawer anchor="top" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <MovieReviews {...movie} />
      </Drawer>
    </Box>
  );
};

export default MovieDetails;