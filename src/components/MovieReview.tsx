import { MovieReviewProps } from "../types/movieAppTypes";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const MovieReview = (props: MovieReviewProps) => {
  return (
    <Box sx={{ color: "white", p: 2 }}>
      <Typography variant="h6" sx={{ color: "#e50914", mb: 2 }}>
        Review By: {props.author}
      </Typography>
      <Typography variant="body1" sx={{ color: "white", lineHeight: 1.8 }}>
        {props.content}
      </Typography>
    </Box>
  );
};

export default MovieReview;