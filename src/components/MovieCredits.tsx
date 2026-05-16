import { useQuery } from "react-query";
import { getMovieCredits } from "../api/tmdb-api";
import { CastMember } from "../types/movieAppTypes";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
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
    <>
      <Typography variant="h5" gutterBottom>
        Cast
      </Typography>
      <Grid container spacing={2}>
        {cast.map((member) => (
          <Grid item key={member.id} xs={6} sm={4} md={3} lg={2}>
            <Card>
              <CardMedia
                component="img"
                image={
                  member.profile_path
                    ? `https://image.tmdb.org/t/p/w185/${member.profile_path}`
                    : "https://via.placeholder.com/185x278?text=No+Image"
                }
                alt={member.name}
                sx={{ height: 150, objectFit: "cover" }}
              />
              <CardContent>
                <Typography variant="body2" fontWeight="bold">
                  {member.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {member.character}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default MovieCredits;