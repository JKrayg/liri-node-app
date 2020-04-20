require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var axios = require("axios");
var fs = require('fs');
var moment = require('moment');
var util = require('util')
moment().format();


if (process.argv[2] === "spotify-this-song") {
    var args = process.argv;
    var arr = [];
    for (var i = 3; i < args.length; i++) {
        arr.push(args[i]);
    }
    //console.log(arr);
    var spotify = new Spotify({
        id: keys.spotify.id,
        secret: keys.spotify.secret
    });
    spotify.search({
        type: 'track',
        query: arr,
        limit: 20

    }).then(function (response) {
        for (var i = 0; i < response.tracks.items.length; i++) {
            var data = response.tracks.items[i];
            console.log("                                        ");
            console.log(util.inspect("Artist: " + data.album.artists[0].name, {depth: null}));
            console.log(util.inspect("Song: " + data.name, {depth: null}));
            console.log(util.inspect("Preview: " + data.preview_url, {depth: null}));
            if (data.preview_url === null) {
                console.log(util.inspect("Track: " + data.external_urls.spotify, {depth: null}));
            }
            console.log(util.inspect("Album: " + data.album.name, {
                depth: null
            }));
            console.log("                                        ");
            console.log("========================================");
            console.log("                                        ");
        }

    }).catch(function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        console.log(data);
    });

} else if (process.argv[2] === "movie-this") {
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
            console.log("                          ")
            console.log("Title: " + data.Title);
            console.log("Release Year: " + data.Year);
            console.log("IMDB Rating: " + data.imdbRating);
            console.log("Rotten Tomatoes Rating: " + data.Ratings[1].Value);
            console.log("Country: " + data.Country);
            console.log("Language: " + data.Language);
            console.log("Plot: " + data.Plot);
            console.log("Actors: " + data.Actors);
            if (data.Title === undefined) {
                console.log("You are an idiot");
            }
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


    var bandsAPI = "codingbootcamp";
    var bandsURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=" + bandsAPI;
    axios
        .get(bandsURL)
        .then(function (response) {
            var data = response.data;
            //console.log(data)
            console.log("                        ")
            console.log("Upcoming concert dates: ")
            for (var i = 0; i < data.length; i++) {
                console.log(data[i].venue.name + ' in ' + data[i].venue.location + ' - ' + data[i].datetime);
                console.log("                                 ");

            }

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
} else if (process.argv[2] === "do-what-it-says") {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }
        var dataArr = data.split(",");
        var spotifyThis = dataArr[0];
        var songName = dataArr[1];
        console.log(spotifyThis);
        console.log(songName)
        if (spotifyThis === "spotify-this-song") {
            var spotify = new Spotify({
                id: keys.spotify.id,
                secret: keys.spotify.secret
            });
            spotify.search({
                type: "track",
                query: songName,
                limit: 20
            }, function (err, data) {
                if (err) {
                    return console.log("Error: " + err);
                }
                for (var i = 0; i < data.tracks.items.length; i++) {
                    var response = data.tracks.items[i];
                    console.log("                                        ");
                    console.log(util.inspect("Artist: " + response.album.artists[0].name, {depth: null}));
                    console.log(util.inspect("Song: " + response.name, {depth: null}));
                    console.log(util.inspect("Preview: " + response.preview_url, {depth: null}));
                    if (response.preview_url === null) {
                        console.log(util.inspect("Track: " + response.external_urls.spotify, {depth: null}));
                    }
                    console.log(util.inspect("Album: " + response.album.name, {depth: null}));
                    console.log("                                        ");
                    console.log("========================================");
                    console.log("                                        ");
                }
            });
        };
    });
};