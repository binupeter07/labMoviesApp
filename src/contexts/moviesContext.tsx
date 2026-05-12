import React, { useState, useCallback } from "react";
import { MovieDetailsProps, Review } from "../types/movieAppTypes";

type MovieContextInterface = {
  favourites: number[];
  addToFavourites: ((movie: MovieDetailsProps) => void);
  removeFromFavourites: ((movie: MovieDetailsProps) => void);
  addReview: ((movie: MovieDetailsProps, review: Review) => void);
}

const initialContextState: MovieContextInterface = {
  favourites: [],
  addToFavourites: () => {},
  removeFromFavourites: () => {},
  addReview: (movie, review) => { movie.id, review },
};

export const MoviesContext = React.createContext<MovieContextInterface>(initialContextState);

const MoviesContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [favourites, setFavourites] = useState<number[]>([]);
  const [myReviews, setMyReviews] = useState<Review[]>([]);

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

  return (
    <MoviesContext.Provider
      value={{
        favourites,
        addToFavourites,
        removeFromFavourites,
        addReview,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;