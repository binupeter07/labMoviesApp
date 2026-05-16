import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getActorDetails, getActorMovies } from "../api/tmdb-api";
import { ActorDetails, DiscoverMovieOverviewProps } from "../types/movieAppTypes";
import Spinner from "../components/Spinner";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import MovieCard from "../components/MovieCard";

const ActorDetailsPage = () => {
  const { id } = useParams();

  const { data: actor, isLoading: actorLoading, isError: actorError } = useQuery<ActorDetails, Error>(
    ["actor", id],
    () => getActorDetails(id || "")
  );

  const { data: movies, isLoading: moviesLoading } = useQuery<DiscoverMovieOverviewProps[], Error>(
    ["actorMovies", id],
    () => getActorMovies(id || "")
  );

  if (actorLoading || moviesLoading) return <Spinner />;
  if (actorError) return <h1>Error loading actor details</h1>;

  return (
    <>
      {actor ? (
        <>
          <Paper sx={{ p: 3, mb: 2 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={3}>
                <Avatar
                  src={
                    actor.profile_path
                      ? `https://image.tmdb.org/t/p/w500/${actor.profile_path}`
                      : undefined
                  }
                  alt={actor.name}
                  sx={{ width: 200, height: 200 }}
                />
              </Grid>
              <Grid item xs={12} md={9}>
                <Typography variant="h4" gutterBottom>
                  {actor.name}
                </Typography>
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  {actor.known_for_department}
                </Typography>
                {actor.birthday && (
                  <Typography variant="body1" gutterBottom>
                    Born: {actor.birthday}
                    {actor.place_of_birth ? ` in ${actor.place_of_birth}` : ""}
                  </Typography>
                )}
                <Typography variant="body1" gutterBottom>
                  {actor.biography || "No biography available."}
                </Typography>
              </Grid>
            </Grid>
          </Paper>

          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              Known For
            </Typography>
            <Grid container spacing={2}>
              {movies?.slice(0, 8).map((movie) => (
                <Grid item key={movie.id} xs={12} sm={6} md={4} lg={3}>
                  <MovieCard movie={movie} action={() => <></>} />
                </Grid>
              ))}
            </Grid>
          </Paper>
        </>
      ) : (
        <p>Waiting for actor details</p>
      )}
    </>
  );
};

export default ActorDetailsPage;