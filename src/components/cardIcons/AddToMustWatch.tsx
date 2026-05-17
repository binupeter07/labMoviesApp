import { MouseEvent, useContext } from "react";
import IconButton from "@mui/material/IconButton";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import BookmarkRemoveIcon from "@mui/icons-material/BookmarkRemove";
import { MoviesContext } from "../../contexts/moviesContext";

const AddToMustWatchIcon = (movie: any) => {
  const context = useContext(MoviesContext);
  const isMustWatch = context.mustWatch.includes(movie.id);

  const onUserSelect = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (isMustWatch) {
      context.removeFromMustWatch(movie);
    } else {
      context.addToMustWatch(movie);
    }
  };

  return (
    <IconButton aria-label="add to must watch" onClick={onUserSelect}>
      {isMustWatch ? (
        <BookmarkRemoveIcon color="error" fontSize="large" />
      ) : (
        <BookmarkAddIcon color="primary" fontSize="large" />
      )}
    </IconButton>
  );
};

export default AddToMustWatchIcon;