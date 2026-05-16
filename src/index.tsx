import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import HomePage from "./pages/homePage";
import MoviePage from "./pages/MovieDetailsPage";
import FavouriteMoviesPage from "./pages/FavouriteMoviesPage";
import MovieReviewPage from "./pages/MovieReviewPage";
import SiteHeader from './components/SiteHeader';
import UpcomingMoviesPage from "./pages/UpcomingMoviesPage";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools';
import MoviesContextProvider from "./contexts/moviesContext";
import AddMovieReviewPage from './pages/AddMovieReviewPage';
import ActorsPage from './pages/ActorsPage';
import ActorDetailsPage from './pages/ActorDetailsPage';
import SimilarMoviesPage from './pages/SimilarMoviesPage';
import TrendingMoviesPage from './pages/TrendingMoviesPage';
import NowPlayingPage from './pages/NowPlayingPage';
import FantasyMoviePage from './pages/FantasyMoviePage';
import FantasyMovieListPage from './pages/FantasyMovieListPage';
import PlaylistsPage from './pages/PlaylistsPage';
import PrivateRoute from './components/PrivateRoute';
import LoginPage from './pages/LoginPage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <MoviesContextProvider>
          <SiteHeader />
         <Routes>
          <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/actors" element={<ActorsPage />} />
            <Route path="/actors/:id" element={<ActorDetailsPage />} />
            <Route path="/movies/trending" element={<TrendingMoviesPage />} />
            <Route path="/movies/nowplaying" element={<NowPlayingPage />} />

            {/* Private Routes */}
            <Route path="/movies/favourites" element={<PrivateRoute element={<FavouriteMoviesPage />} />} />
            <Route path="/movies/upcoming" element={<PrivateRoute element={<UpcomingMoviesPage />} />} />
            <Route path="/movies/:id" element={<PrivateRoute element={<MoviePage />} />} />
            <Route path="/movies/fantasy" element={<PrivateRoute element={<FantasyMoviePage />} />} />
            <Route path="/movies/fantasy/list" element={<PrivateRoute element={<FantasyMovieListPage />} />} />
            <Route path="/playlists" element={<PrivateRoute element={<PlaylistsPage />} />} />
            <Route path="/reviews/form" element={<PrivateRoute element={<AddMovieReviewPage />} />} />
            <Route path="/reviews/:id" element={<PrivateRoute element={<MovieReviewPage />} />} />
            <Route path="/movies/:id/similar" element={<PrivateRoute element={<SimilarMoviesPage />} />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </MoviesContextProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <App />
);