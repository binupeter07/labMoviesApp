import { useContext } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";
import StarRateIcon from "@mui/icons-material/StarRate";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import img from '../images/film-poster-placeholder.png';
import { DiscoverMovieOverviewProps } from "../types/movieAppTypes";
import { Link } from "react-router-dom";
import { MoviesContext } from "../contexts/moviesContext";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";

interface MovieCardProps {
  movie: DiscoverMovieOverviewProps;
  action: (m: DiscoverMovieOverviewProps) => React.ReactNode;
}

const MovieCard = ({ movie, action }: MovieCardProps) => {
  const { favourites, mustWatch } = useContext(MoviesContext);
  const isFavourite = favourites.find((id) => id === movie.id) ? true : false;
  const isMustWatch = mustWatch.find((id) => id === movie.id) ? true : false;

  return (
    <Card
      sx={{
        maxWidth: 345,
        backgroundColor: "#1f1f1f",
        color: "white",
        borderRadius: 3,
        transition: "transform 0.3s, box-shadow 0.3s",
        "&:hover": {
          transform: "scale(1.03)",
          boxShadow: "0 8px 20px rgba(229, 9, 20, 0.4)",
        },
      }}
    >
      <CardHeader
        avatar={
          isFavourite ? (
            <Avatar sx={{ backgroundColor: "#e50914" }}>
              <FavoriteIcon />
            </Avatar>
           ) : isMustWatch ? (
              <Avatar sx={{ backgroundColor: "rgb(255, 0, 0)" }}>
                <BookmarkAddIcon />
              </Avatar>
           ):null
          }
        title={
          <Typography
            variant="h6"
            component="p"
            sx={{
              color: "white",
              fontWeight: "bold",
              fontSize: "0.95rem",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {movie.title}
          </Typography>
        }
        sx={{ backgroundColor: "#141414", pb: 1 }}
      />
      <CardMedia
        sx={{
          height: 400,
          objectFit: "cover",
        }}
        image={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
            : img
        }
      />
      <CardContent sx={{ backgroundColor: "#1f1f1f", pb: 1 }}>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <Typography
              variant="body2"
              sx={{ color: "#aaaaaa", display: "flex", alignItems: "center", gap: 0.5 }}
            >
              <CalendarIcon fontSize="small" sx={{ color: "#e50914" }} />
              {movie.release_date}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography
              variant="body2"
              sx={{ color: "#aaaaaa", display: "flex", alignItems: "center", gap: 0.5 }}
            >
              <StarRateIcon fontSize="small" sx={{ color: "#f5c518" }} />
              {movie.vote_average?.toFixed(1)}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions
        sx={{
          backgroundColor: "#141414",
          justifyContent: "space-between",
          px: 2,
          pb: 2,
        }}
      >
        {action(movie)}
        <Link to={`/movies/${movie.id}`} style={{ textDecoration: "none" }}>
          <Button
            variant="contained"
            size="small"
            sx={{
              backgroundColor: "#e50914",
              color: "white",
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: "#b20710",
              },
            }}
          >
            More Info
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
};

export default MovieCard;