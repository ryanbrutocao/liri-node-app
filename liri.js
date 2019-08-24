require("dotenv").config();
var fs = require("fs")
var keys = require("./keys.js");
var axios = require("axios")
var moment = require("moment")
var Spotify =  require("node-spotify-api")
var spotify = new Spotify(keys.spotify);
var search = process.argv[2]
var searchTerm = process.argv[3]


switch(search) {
  case "concert-this": 
    concertThis();
    break;
  case "spotify-this-song":
    spotifyThisSong();
    break;
  case "movie-this":
    movieThis();
    break;
  case "do-what-it-says":
    doWhatItSays();
    break;
  }


// Make it so liri.js can take in one of the following commands:

//[X] concert-this
//[ ]spotify-this-song
//[ ] movie-this
//[ ] do-what-it-says
function concertThis(search){
  term = "https://rest.bandsintown.com/artists/" + searchTerm + "/events?app_id=codingbootcamp"

  axios
  .get(term)
  .then(function(response){
  // console.log(response.data);
  let data = response.data;
  for (let i=0; i<data.length; i++){
    var date = moment(data[i].datetime).calendar()
    
      // console.log("data[i]:",data[i]);
      console.log(/--------------------------/);
      console.log("Venue Name: ",data[i].venue.name);
      console.log("Venue Location: ",data[i].venue.city + " " + data[i].venue.region);
      console.log("Date: ",date);
      console.log(/--------------------------/);
      
    }
  })
  .catch(function(error){
    if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log("Error", error.message);
    }
    console.log(error.config);
  })
  
}


function spotifyThisSong(search) {
//  var type = "track"
  if (!searchTerm){
    searchTerm = "the sign ace of base"
   
  }
  spotify
  .search({
           type: "track",
           query: searchTerm,
       })
       .then(function (response) {
         var title = response.tracks.items;
           for (var i=0; i<5; i++) {
              //  console.log(JSON.stringify(response, null, 2));
               console.log("Artist Name: " + title[i].artists[0].name);
               console.log("Song Title: " + title[i].name);
               console.log("Preview url : " + title[i].preview_url);
               console.log("Album: " + title[i].album.name);
               console.log(/--------------------------/);
              }
            })
            .catch(function (err) {
              // if (err){
                
              //   var searchTerm = "the sign";
              //   spotifyThisSong()
              // }
           console.log(err);

       });
}



function movieThis() {

  for (var i = 3; i < searchTerm.length; i++) {

    if (i > 3 && i < nodeArgs.length) {
      movieName = movieName + "+" + nodeArgs[i];
    } else {
      movieName += nodeArgs[i];
  
    }
  }
  

  if (!searchTerm){
    searchTerm = "Mr. Nobody"
  }
  axios.get("http://www.omdbapi.com/?t="+ searchTerm +"&y=&plot=short&apikey=trilogy").then(
  function(response) {
    // console.log("response: ", response.data);
console.log("Title of the movie: ", response.data.Title);
console.log("Year the movie came out: ", response.data.Year);
console.log("IMDB Rating of the movie: ", response.data.Ratings[0].Value);
console.log("Rotten Tomatoes Rating of the movie: ", response.data.Ratings[1].Value);
console.log("Country where the movie was produced: ", response.data.Country);
console.log("Language of the movie: ", response.data.Language);
console.log("Plot of the movie: ", response.data.Plot);
console.log("Actors in the movie: ", response.data.Actors);


  })
  .catch(function(error) {
    if ("error?:", error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log("---------------Data---------------");
      console.log(error.response.data);
      console.log("---------------Status---------------");
      console.log(error.response.status);
      console.log("---------------Status---------------");
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an object that comes back with details pertaining to the error that occurred.
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }
    console.log(error.config);
  });
}

function doWhatItSays() {
  fs.readFile("random.txt", "utf-8", function(error,data){
    if(error){
      return console.log(error);
    }
  //  console.log("data:", data);
  var dataSplit = data.split(",")
  console.log("data split: ",dataSplit);
  search = dataSplit[0]
  searchTerm = dataSplit[1]
  spotifyThisSong(search,searchTerm)
  })
}