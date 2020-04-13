require("dotenv").config();
var keys = require("./keys.js");

//access keys
//var spotify = new Spotify(keys.spotify);
//console.log(spotify);
/*var OMDB = OMDB(keys.omdb)

console.log(OMDB);*/
//var spotifyID = "b0248b63bfd7447284e97fdd39f88b88";
//var omdbUrl = "http://www.omdbapi.com/?t=" + title + "&y=&plot=short&apikey=" + omdbApi;
//var bandsURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

var axios = require("axios");
//
//
//
//ADD API
var omdbApi = "";

if (process.argv[2] === "movie-this") {
    var nodeArgs = process.argv;
    var title = "";
    for (var i = 3; i < nodeArgs.length; i++) {

        if (i > 3 && i < nodeArgs.length) {
            title = title + "+" + nodeArgs[i];
        } else {
            title += nodeArgs[i];

        }
    }
    var omdbUrl = "http://www.omdbapi.com/?t=" + title + "&y=&plot=short&apikey=" + omdbApi;

    axios
        .get(omdbUrl)
        .then(function (response) {
            var data = response.data;
            console.log("Title: " + data.Title);
            console.log("Release Year: " + data.Year);
            console.log("IMDB Rating: " + data.imdbRating);
            console.log("Rotten Tomatoes Rating: " + data.Ratings[1].Value);
            console.log("Country: " + data.Country);
            console.log("Language: " + data.Language);
            console.log("Plot: " + data.Plot);
            console.log("Actors: " + data.Actors);
        })
        .catch(function (error) {
            if (error.response) {
                console.log("---------------Data---------------");
                console.log(error.response.data);
                console.log("---------------Status---------------");
                console.log(error.response.status);
                console.log("---------------Status---------------");
                console.log(error.response.headers);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log("Error", error.message);
            }
            console.log(error.config);
        });
} else if (process.argv[2] === "concert-this") {
    var nodeArgs = process.argv;
    var artist = "";
    for (var i = 3; i < nodeArgs.length; i++) {

        if (i > 3 && i < nodeArgs.length) {
            artist = artist + "+" + nodeArgs[i];
        } else {
            artist += nodeArgs[i];
        }
    }
    var bandsAPI = "";
    var bandsURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=" + bandsAPI;
    axios
        .get(bandsURL)
        .then(function (response) {
            var data = response.data;
            console.log(data);
        })
        .catch(function (error) {
            if (error.response) {
                console.log("---------------Data---------------");
                console.log(error.response.data);
                console.log("---------------Status---------------");
                console.log(error.response.status);
                console.log("---------------Status---------------");
                console.log(error.response.headers);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log("Error", error.message);
            }
            console.log(error.config);
        });
}