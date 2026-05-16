import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { MoviesContext } from "../contexts/moviesContext";

const PrivateRoute = ({ element: Element }: { element: JSX.Element }) => {
  const { isAuthenticated } = useContext(MoviesContext);

  return isAuthenticated ? Element : <Navigate to="/login" />;
};

export default PrivateRoute;