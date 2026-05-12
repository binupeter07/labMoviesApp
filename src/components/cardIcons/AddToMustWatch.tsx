import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import { DiscoverMovieOverviewProps } from "../../types/movieAppTypes";

const AddToMustWatchIcon = (movie: DiscoverMovieOverviewProps) => {
  return (
    <PlaylistAddIcon color="primary" fontSize="large" />
  );
};

export default AddToMustWatchIcon;