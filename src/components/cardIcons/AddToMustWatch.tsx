import { MouseEvent, useContext } from "react";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import { DiscoverMovieOverviewProps } from "../../types/movieAppTypes";
import { MoviesContext } from "../../contexts/moviesContext";
import IconButton from "@mui/material/IconButton";

const AddToMustWatchIcon = (movie: DiscoverMovieOverviewProps) => {
  const context = useContext(MoviesContext);

  const onUserSelect = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    context.addToMustWatch(movie);
  };

  return (
    <IconButton aria-label="add to must watch" onClick={onUserSelect}>
      <PlaylistAddIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default AddToMustWatchIcon;