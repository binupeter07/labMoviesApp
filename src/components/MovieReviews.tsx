import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import { getMovieReviews } from "../api/tmdb-api";
import { excerpt } from "../util";
import { MovieDetailsProps, MovieReviewProps } from "../types/movieAppTypes";

const MovieReviews = (movie: MovieDetailsProps) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    getMovieReviews(movie.id).then((reviews) => {
      setReviews(reviews);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <TableContainer
      component={Paper}
      sx={{ backgroundColor: "#1f1f1f" }}
    >
      <Table aria-label="reviews table">
        <TableHead>
          <TableRow sx={{ backgroundColor: "#141414" }}>
            <TableCell sx={{ color: "#e50914", fontWeight: "bold" }}>
              Author
            </TableCell>
            <TableCell align="center" sx={{ color: "#e50914", fontWeight: "bold" }}>
              Excerpt
            </TableCell>
            <TableCell align="right" sx={{ color: "#e50914", fontWeight: "bold" }}>
              More
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reviews.map((r: MovieReviewProps) => (
            <TableRow
              key={r.id}
              sx={{
                "&:hover": { backgroundColor: "#2f2f2f" },
                borderBottom: "1px solid #333",
              }}
            >
              <TableCell sx={{ color: "white" }} component="th" scope="row">
                {r.author}
              </TableCell>
              <TableCell sx={{ color: "#aaaaaa" }}>
                {excerpt(r.content ?? "")}
              </TableCell>
              <TableCell align="right">
                <Link
                  to={`/reviews/${r.id}`}
                  state={{ review: r, movie: movie }}
                  style={{ color: "#e50914", textDecoration: "none", fontWeight: "bold" }}
                >
                  Full Review
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MovieReviews;