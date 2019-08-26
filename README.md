# liri-node-app
homework 10

This CLI App is doe homework 10. It is designed to take in four different commands which each bring back different information from the relevant API's. This app is organized by using a switch statement that calls different functions for each command.

For the four commands, here is how each works:
#### concert-this + 'band name'
:will call the bandsintown API and will return a list of concert dates for the band. Included with each concert date is the name and location of the venue.
![working example] (/assets/images/liri_concert_this.png)
Format: ![working example of Concerts in Town]


#### spotify-this-song + 'song name'
: will call the spotify API and will return the Artist(s), the song name, a preview link of the song from Spotify, and the Album which the song is from. If no song is provided it will default to searching for "The Sign" by Ace of Base


#### movie-this + 'movie title'
: Uses Axios and will call the OMDB API and returns the following.
   * Title of the movie.
   * Year the movie came out.
   * IMDB Rating of the movie.
   * Rotten Tomatoes Rating of the movie.
   * Country where the movie was produced.
   * Language of the movie.
   * Plot of the movie.
   * Actors in the movie.
If no movie title is chosen, the default search will return 'Mr. Nobody'.

#### do-what-it-says
: Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call on one of LIRI's commands. 