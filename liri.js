require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var axios = require("axios");
var fs = require('fs');
var moment = require('moment');
moment().format();

//access keys
if (process.argv[2] === "spotify-this") {
    var spotify = new Spotify({
        id: keys.spotify.id,
        secret: keys.spotify.secret
    });

    spotify.search({
        type: 'track',
        query: process.argv[3]
    }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        console.log(data);
    });
}
//
//
//
//ADD API
else if (process.argv[2] === "movie-this") {
    var omdbApi = "4e0294cb";
    var args = process.argv;
    var title = "";
    for (var i = 3; i < args.length; i++) {

        if (i > 3 && i < args.length) {
            title = title + "+" + args[i];
        } else {
            title += args[i];

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
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log("Error", error.message);
            }
            console.log(error.config);
        });
} else if (process.argv[2] === "concert-this") {
    var args = process.argv;
    var artist = "";
    for (var i = 3; i < args.length; i++) {

        if (i > 3 && i < args.length) {
            artist = artist + "+" + args[i];
        } else {
            artist += args[i];
        }
    }
    //
    //
    //
    //ADD API
    var bandsAPI = "codingbootcamp";
    var bandsURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=" + bandsAPI;
    axios
        .get(bandsURL)
        .then(function (response) {
            var data = response.data;
            console.log(data);
        })
        .catch(function (error) {
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
        });
}