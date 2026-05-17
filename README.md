# MovieHub

## Overview
MovieHub is  built with React and TypeScript that allows users to discover, explore, and manage their favourite movies. The app uses The Movie Database (TMDB) API as its data source and is deployed on AWS CloudFront.

## Live Demo
- **CloudFront URL**: https://d3el6830ycv6gf.cloudfront.net
- **GitHub Repository**: https://github.com/binupeter07/labMoviesApp
- **YouTube Demo**: https://youtu.be/sz9ogOjfdPs 

## Features

### Movie Discovery
- Browse discover movies on the home page
- Filter movies by title and genre
- View Now Playing movies currently in cinemas
- View Trending movies this week
- View Upcoming movies
- View Similar movies for any movie

### Movie Details
- Detailed movie information including overview, genres, runtime, revenue and rating
- Movie poster gallery with pagination — up to 10 images
- Full cast and credits section showing 8 cast members
- Similar Movies button
- Movie reviews drawer
- Write a review for favourite movies

### Actors
- Browse popular actors list
- Filter actors by name in real time
- View detailed actor biography, birthday and place of birth
- View movies the actor has acted

### Favourites
- Add movies to favourites list
- Remove movies from favourites
- Favourites managed using React Context
- View all favourite movies on dedicated page
- Write reviews from the favourites page

### Must Watch
- Tag upcoming movies as must watch using bookmark icon
- Click again to remove from must watch

### Fantasy Movies
- Create your own fantasy movie
- Fields: Title, Overview, Genre, Release Date, Runtime, Production Company
- View all created fantasy movies
- Delete fantasy movies
- Persisted in localStorage

### Movie Playlists
- Create themed playlists with title and theme
- Add movies to playlists from home page
- View all playlists and their movies
- Delete playlists

### Authentication
- Secure login using AWS Cognito
- JWT token stored in localStorage
- Private and public routes
- Public routes: Home, Actors, Trending, Now Playing
- Private routes: Favourites, Upcoming, Movie Details, Fantasy Movies, Playlists



## Pages

| Page | URL | Access |
| Home | / - Public 
| Now Playing | /movies/nowplaying - Public 
| Trending | /movies/trending - Public 
| Actors | /actors - Public 
| Actor Details | /actors/:id - Public 
| Login | /login - Public 
| Favourites | /movies/favourites - Private 
| Upcoming | /movies/upcoming - Private 
| Movie Details | /movies/:id - Private 
| Similar Movies | /movies/:id/similar - Private 
| Fantasy Movie | /movies/fantasy - Private 
| My Fantasy Movies | /movies/fantasy/list - Private
| Playlists | /playlists - Private 
| Write Review | /reviews/form - Private 
| Full Review | /reviews/:id - Private 


### Context API Pattern
MoviesContext provides global state for:
- Favourite movies list
- Must Watch list
- Authentication status (isAuthenticated, login, logout)

### Custom Hooks
- useMovie — fetches and caches individual movie details
- useFiltering — manages multi-criteria filtering logic using Array.reduce

### Component Composition
- TemplateMoviePage — reusable movie page layout with image pagination
- TemplateMovieListPage — reusable movie list layout with title


Cache keys used:
- `"discover"` — home page movies
- `"actors"` — popular actors list
- `"upcoming"` — upcoming movies
- `"trending"` — trending movies
- `"nowPlaying"` — now playing movies
- `["movie", id]` — individual movie details
- `["credits", id]` — movie cast
- `["similar", id]` — similar movies
- `["actor", id]` — actor biography
- `["actorMovies", id]` — actor movie credits
- `["images", id]` — movie poster images

## AWS Architecture

### Auth API (movies-auth CDK project)
- Cognito User Pool for user management
- API Gateway REST API
- Lambda function for signin
- Endpoint: POST /auth/signin
- Returns JWT IdToken on successful authentication

### Frontend Deployment
- Vite production build (`npm run build`)
- Static files uploaded to S3 bucket



