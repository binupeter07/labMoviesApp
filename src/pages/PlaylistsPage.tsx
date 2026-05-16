import { useState } from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { Playlist } from "../types/movieAppTypes";


const PlaylistsPage = () => {
  const [playlists, setPlaylists] = useState<Playlist[]>(
    JSON.parse(localStorage.getItem("playlists") || "[]")
  );

  const [title, setTitle] = useState("");
  const [theme, setTheme] = useState("");

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const newPlaylist: Playlist = {
      id: Date.now().toString(),
      title,
      theme,
      movies: [],
    };
    const updated = [...playlists, newPlaylist];
    localStorage.setItem("playlists", JSON.stringify(updated));
    setPlaylists(updated);
    setTitle("");
    setTheme("");
  };

  const handleDelete = (id: string) => {
    const updated = playlists.filter((p) => p.id !== id);
    localStorage.setItem("playlists", JSON.stringify(updated));
    setPlaylists(updated);
  };

  return (
    <>
      <Paper sx={{ p: 3, mb: 2 }}>
        <Typography variant="h4" gutterBottom>
          My Playlists
        </Typography>
        <Box component="form" onSubmit={handleCreate}>
          <TextField
            required
            label="Playlist Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            sx={{ mr: 2, mb: 2 }}
          />
          <TextField
            required
            label="Theme"
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            sx={{ mr: 2, mb: 2 }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 1 }}
          >
            Create Playlist
          </Button>
        </Box>
      </Paper>

      {playlists.length === 0 ? (
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6">
            No playlists yet! Create one above.
          </Typography>
        </Paper>
      ) : (
        <Grid container spacing={2}>
          {playlists.map((playlist) => (
            <Grid item key={playlist.id} xs={12} sm={6} md={4}>
              <Card>
                <CardHeader
                  title={playlist.title}
                  subheader={`Theme: ${playlist.theme}`}
                />
                <CardContent>
                  <Typography variant="body2" gutterBottom>
                    <strong>Movies:</strong>{" "}
                    {playlist.movies.length === 0
                      ? "No movies added yet"
                      : playlist.movies.map((m) => m.title).join(", ")}
                  </Typography>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDelete(playlist.id)}
                    sx={{ mt: 1 }}
                  >
                    Delete Playlist
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

export default PlaylistsPage;