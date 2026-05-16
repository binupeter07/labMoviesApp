import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { Actor } from "../types/movieAppTypes";

const ActorCard = ({ actor }: { actor: Actor }) => {
  return (
    <Card
      component={Link}
      to={`/actors/${actor.id}`}
      sx={{ 
        textDecoration: "none", 
        color: "inherit",
        maxWidth: 250,
        margin: "auto"
      }}
    >
      <CardHeader
        avatar={<Avatar>{actor.name[0]}</Avatar>}
        title={actor.name}
        subheader={actor.known_for_department}
      />
      <CardMedia
        component="img"
        image={
          actor.profile_path
            ? `https://image.tmdb.org/t/p/w185/${actor.profile_path}`
            : "https://via.placeholder.com/185x278?text=No+Image"
        }
        alt={actor.name}
        sx={{
          height: 250,
          width: "100%",
          objectFit: "contain",
          backgroundColor: "grey.100",
        }}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Known for: {actor.known_for.map(k => k.title || k.name).join(", ")}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ActorCard;