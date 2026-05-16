import React, { useState, useCallback } from "react";
import { MovieDetailsProps, Review } from "../types/movieAppTypes";

type MovieContextInterface = {
  favourites: number[];
  addToFavourites: ((movie: MovieDetailsProps) => void);
  removeFromFavourites: ((movie: MovieDetailsProps) => void);
  addReview: ((movie: MovieDetailsProps, review: Review) => void);
  mustWatch: number[];
  addToMustWatch: ((movie: MovieDetailsProps) => void);
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

const initialContextState: MovieContextInterface = {
  favourites: [],
  addToFavourites: () => {},
  removeFromFavourites: () => {},
  addReview: (movie, review) => { movie.id, review },
  mustWatch: [],
  addToMustWatch: () => {},
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
};

export const MoviesContext = React.createContext<MovieContextInterface>(initialContextState);

const MoviesContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [favourites, setFavourites] = useState<number[]>([]);
  const [myReviews, setMyReviews] = useState<Review[]>([]);
  const [mustWatch, setMustWatch] = useState<number[]>([]);

  const [isAuthenticated, setIsAuthenticated] = useState(
  !!localStorage.getItem("token")
);

const login = () => {
  setIsAuthenticated(true);
};

const logout = () => {
  localStorage.removeItem("token");
  setIsAuthenticated(false);
};
  const addToFavourites = useCallback((movie: MovieDetailsProps) => {
    setFavourites((prevFavourites) => {
      if (!prevFavourites.includes(movie.id)) {
        return [...prevFavourites, movie.id];
      }
      return prevFavourites;
    });
  }, []);

  const removeFromFavourites = useCallback((movie: MovieDetailsProps) => {

    
    setFavourites((prevFavourites) => prevFavourites.filter((mId) => mId !== movie.id));
  }, []);

  const addReview = (movie: MovieDetailsProps, review: Review) => {
    setMyReviews({ ...myReviews, [movie.id]: review });
  };

  const addToMustWatch = useCallback((movie: MovieDetailsProps) => {
    setMustWatch((prevMustWatch) => {
      if (!prevMustWatch.includes(movie.id)) {
        const updated = [...prevMustWatch, movie.id];
        console.log("Must Watch list: ", updated);
        return updated;
      }
      return prevMustWatch;
    });
  }, []);

  return (
    <MoviesContext.Provider
      value={{
        favourites,
        addToFavourites,
        removeFromFavourites,
        addReview,
        mustWatch,
        addToMustWatch,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
};



export default MoviesContextProvider;