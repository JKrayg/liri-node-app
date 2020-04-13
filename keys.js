console.log('this is loaded');

exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};

console.log(this.spotify);

/*exports.omdb = {
    id: process.env.OMDB_ID,
    secret: process.env.OMDB_SECRET
}*/