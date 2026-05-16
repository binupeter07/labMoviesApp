import { useState } from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import { FantasyMovie } from "../types/movieAppTypes";

const genres = [
  "Action",
  "Adventure",
  "Animation",
  "Comedy",
  "Crime",
  "Documentary",
  "Drama",
  "Fantasy",
  "Horror",
  "Romance",
  "Science Fiction",
  "Thriller",
];

const FantasyMoviePage = () => {
  const [fantasy, setFantasy] = useState<FantasyMovie>({
    title: "",
    overview: "",
    genres: [],
    releaseDate: "",
    runtime: 0,
    productionCompany: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFantasy((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  const existing = JSON.parse(localStorage.getItem("fantasyMovies") || "[]");
  const updated = [...existing, fantasy];
  localStorage.setItem("fantasyMovies", JSON.stringify(updated));
  console.log("Fantasy Movie saved:", fantasy);
  setSubmitted(true);
};

  return (
    <Paper sx={{ p: 3, maxWidth: 600, margin: "auto" }}>
      <Typography variant="h4" gutterBottom>
        Create Fantasy Movie
      </Typography>

      {submitted ? (
        <>
          <Typography variant="h5" color="success.main" gutterBottom>
            🎬 Fantasy Movie Created!
          </Typography>
          <Typography><strong>Title:</strong> {fantasy.title}</Typography>
          <Typography><strong>Overview:</strong> {fantasy.overview}</Typography>
          <Typography><strong>Genres:</strong> {fantasy.genres.join(", ")}</Typography>
          <Typography><strong>Release Date:</strong> {fantasy.releaseDate}</Typography>
          <Typography><strong>Runtime:</strong> {fantasy.runtime} mins</Typography>
          <Typography><strong>Production Company:</strong> {fantasy.productionCompany}</Typography>
          <Button
            variant="contained"
            sx={{ mt: 2 }}
            onClick={() => setSubmitted(false)}
          >
            Create Another
          </Button>
        </>
      ) : (
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            required
            label="Title"
            name="title"
            value={fantasy.title}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            required
            label="Overview"
            name="overview"
            value={fantasy.overview}
            onChange={handleChange}
            multiline
            rows={4}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            required
            select
            label="Genre"
            name="genres"
            value={fantasy.genres[0] || ""}
            onChange={(e) =>
              setFantasy((prev) => ({ ...prev, genres: [e.target.value] }))
            }
            sx={{ mb: 2 }}
          >
            {genres.map((genre) => (
              <MenuItem key={genre} value={genre}>
                {genre}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            fullWidth
            required
            label="Release Date"
            name="releaseDate"
            type="date"
            value={fantasy.releaseDate}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            required
            label="Runtime (mins)"
            name="runtime"
            type="number"
            value={fantasy.runtime}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            required
            label="Production Company"
            name="productionCompany"
            value={fantasy.productionCompany}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
          >
            Create Movie
          </Button>
        </Box>
      )}
    </Paper>
  );
};

export default FantasyMoviePage;