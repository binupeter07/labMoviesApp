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
        backgroundColor: "#1f1f1f",
        borderRadius: 3,
        transition: "transform 0.3s, box-shadow 0.3s",
        "&:hover": {
          transform: "scale(1.03)",
          boxShadow: "0 8px 20px rgba(229, 9, 20, 0.4)",
        },
      }}
    >
      <CardHeader
        avatar={
          <Avatar sx={{ backgroundColor: "#e50914" }}>
            {actor.name[0]}
          </Avatar>
        }
        title={
          <Typography variant="body1" sx={{ color: "white", fontWeight: "bold" }}>
            {actor.name}
          </Typography>
        }
        subheader={
          <Typography variant="body2" sx={{ color: "#aaaaaa" }}>
            {actor.known_for_department}
          </Typography>
        }
        sx={{ backgroundColor: "#141414", pb: 1 }}
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
          height: 220,
          objectFit: "contain",
          backgroundColor: "#2f2f2f",
        }}
      />
      <CardContent sx={{ backgroundColor: "#1f1f1f" }}>
        <Typography variant="body2" sx={{ color: "#aaaaaa" }}>
          Known for: {actor.known_for.map(k => k.title || k.name).join(", ")}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ActorCard;