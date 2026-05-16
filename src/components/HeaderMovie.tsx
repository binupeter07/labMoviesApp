import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { MovieDetailsProps } from "../types/movieAppTypes";

const MovieHeader = (movie: MovieDetailsProps) => {
  const navigate = useNavigate();
  const favourites = JSON.parse(localStorage.getItem("favourites") || "[]");
  const isFavourite = favourites.find((f: { id: number }) => f.id === movie.id);

  return (
    <Box
      sx={{
        background: "linear-gradient(to right, #000000, #1a1a2e)",
        borderBottom: "2px solid #e50914",
        px: 3,
        py: 2,
        display: "flex",
        alignItems: "center",
        gap: 2,
      }}
    >
      <IconButton
        onClick={() => navigate(-1)}
        sx={{ color: "white", backgroundColor: "rgba(255,255,255,0.1)" }}
      >
        <ArrowBackIcon />
      </IconButton>

      {isFavourite && (
        <Avatar sx={{ backgroundColor: "#e50914" }}>
          <FavoriteIcon />
        </Avatar>
      )}

      <Box>
        <Typography variant="h4" sx={{ color: "white", fontWeight: "bold" }}>
          {movie.title}
        </Typography>
        <Typography variant="subtitle1" sx={{ color: "#aaaaaa", fontStyle: "italic" }}>
          {movie.tagline}
        </Typography>
      </Box>
    </Box>
  );
};

export default MovieHeader;