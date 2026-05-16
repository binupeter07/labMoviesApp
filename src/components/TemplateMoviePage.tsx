import React, { useState, useEffect } from "react";
import MovieHeader from "./HeaderMovie";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Typography from "@mui/material/Typography";
import { getMovieImages } from "../api/tmdb-api";
import { MovieImage, MovieDetailsProps } from "../types/movieAppTypes";

interface TemplateMoviePageProps {
  movie: MovieDetailsProps;
  children: React.ReactElement;
}

const TemplateMoviePage = ({ movie, children }: TemplateMoviePageProps) => {
  const [images, setImages] = useState<MovieImage[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    getMovieImages(movie.id).then((images) => {
      setImages(images.slice(0, 10));
    });
  }, []);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <Box sx={{ backgroundColor: "#141414", minHeight: "100vh" }}>
      <MovieHeader {...movie} />

      <Grid container spacing={3} sx={{ p: 3 }}>
        <Grid item xs={12} md={3}>
          {images.length > 0 && (
            <Box>
              <img
                src={`https://image.tmdb.org/t/p/w500/${images[currentIndex].file_path}`}
                alt="Movie poster"
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "12px",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
                }}
              />
              <Box sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mt: 1,
                gap: 1,
              }}>
                <IconButton
                  onClick={handlePrev}
                  size="small"
                  sx={{
                    color: "white",
                    backgroundColor: "#e50914",
                    "&:hover": { backgroundColor: "#b20710" },
                  }}
                >
                  <ArrowBackIcon fontSize="small" />
                </IconButton>
                <Typography variant="body2" sx={{ color: "white" }}>
                  {currentIndex + 1} / {images.length}
                </Typography>
                <IconButton
                  onClick={handleNext}
                  size="small"
                  sx={{
                    color: "white",
                    backgroundColor: "#e50914",
                    "&:hover": { backgroundColor: "#b20710" },
                  }}
                >
                  <ArrowForwardIcon fontSize="small" />
                </IconButton>
              </Box>
            </Box>
          )}
        </Grid>

        <Grid item xs={12} md={9}>
          {children}
        </Grid>
      </Grid>
    </Box>
  );
};

export default TemplateMoviePage;