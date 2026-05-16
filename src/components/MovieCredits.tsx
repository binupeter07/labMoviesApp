import { useQuery } from "react-query";
import { getMovieCredits } from "../api/tmdb-api";
import { CastMember } from "../types/movieAppTypes";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Spinner from "./Spinner";

interface MovieCreditsProps {
  movieId: number;
}

const MovieCredits = ({ movieId }: MovieCreditsProps) => {
  const { data, isLoading, isError } = useQuery<CastMember[], Error>(
    ["credits", movieId],
    () => getMovieCredits(movieId.toString())
  );

  if (isLoading) return <Spinner />;
  if (isError) return <h1>Error loading credits</h1>;

  const cast = data ? data.slice(0, 8) : [];

  return (
    <Grid container spacing={2}>
      {cast.map((member) => (
        <Grid item key={member.id} xs={6} sm={4} md={3}>
          <Card
            sx={{
              backgroundColor: "#1f1f1f",
              color: "white",
              borderRadius: 2,
              transition: "transform 0.2s",
              "&:hover": { transform: "scale(1.03)" },
            }}
          >
            <CardMedia
              component="img"
              image={
                member.profile_path
                  ? `https://image.tmdb.org/t/p/w185/${member.profile_path}`
                  : "https://via.placeholder.com/185x278?text=No+Image"
              }
              alt={member.name}
              sx={{ height: 220, objectFit: "contain", backgroundColor: "#2f2f2f" }}
            />
            <CardContent sx={{ p: 1 }}>
              <Typography variant="body2" fontWeight="bold" sx={{ color: "white" }}>
                {member.name}
              </Typography>
              <Typography variant="body2" sx={{ color: "#aaaaaa" }}>
                {member.character}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default MovieCredits;