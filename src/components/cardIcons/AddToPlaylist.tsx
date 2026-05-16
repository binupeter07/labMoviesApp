import { MouseEvent, useState } from "react";
import IconButton from "@mui/material/IconButton";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { DiscoverMovieOverviewProps, Playlist } from "../../types/movieAppTypes";

const AddToPlaylistIcon = (movie: DiscoverMovieOverviewProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAddToPlaylist = (playlistId: string) => {
    const playlists: Playlist[] = JSON.parse(
      localStorage.getItem("playlists") || "[]"
    );

    const updated = playlists.map((p) => {
      if (p.id === playlistId) {
        // Check if movie already in playlist
        const alreadyAdded = p.movies.find((m) => m.id === movie.id);
        if (!alreadyAdded) {
          return { ...p, movies: [...p.movies, movie] };
        }
      }
      return p;
    });

    localStorage.setItem("playlists", JSON.stringify(updated));
    handleClose();
  };

  const playlists: Playlist[] = JSON.parse(
    localStorage.getItem("playlists") || "[]"
  );

  return (
    <>
      <IconButton aria-label="add to playlist" onClick={handleClick}>
        <PlaylistAddIcon color="primary" fontSize="large" />
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {playlists.length === 0 ? (
          <MenuItem disabled>No playlists created yet</MenuItem>
        ) : (
          playlists.map((playlist) => (
            <MenuItem
              key={playlist.id}
              onClick={() => handleAddToPlaylist(playlist.id)}
            >
              {playlist.title}
            </MenuItem>
          ))
        )}
      </Menu>
    </>
  );
};

export default AddToPlaylistIcon;