import RateReviewIcon from "@mui/icons-material/RateReview";
import { MovieDetailsProps } from "../../types/movieAppTypes";

const WriteReviewIcon = (movie: MovieDetailsProps) => {
  return (
    <RateReviewIcon color="primary" fontSize="large" />
  );
};

export default WriteReviewIcon;