require("dotenv").config();

var keys = require("./keys.js");
var axios = require("axios")
var moment = require("moment")
var Spotify =  require("node-spotify-api")
var spotify = new Spotify(keys.spotify);
var search = process.argv[2]
var searchTerm = process.argv[3]
if (searchTerm == null){
  searchTerm = "The sign"
}

switch(search) {
  case "concert-this": 
    concertThis();
    break;
  case "spotify-this-song":
    spotifyThisSong();
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
  spotify
  .search({
           type: "track",
           query: searchTerm
         
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

