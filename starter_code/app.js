const express = require('express');
const app = express();
const hbs = require('hbs');
const path = require('path');
const SpotifyWebApi = require('spotify-web-api-node');

app.set('views', path.join(__dirname, 'views/layouts'));
app.set('view engine', 'hbs');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res, next) => {
  res.render('index');
});

// Remember to paste here your credentials
const clientId = 'fc3c22905da0432899921c36d938e670',
    clientSecret = '16bfc8e1a3734247be45adc7c0b546c4';

const spotifyApi = new SpotifyWebApi({
  clientId : clientId,
  clientSecret : clientSecret
});

// Retrieve an access token.
spotifyApi.clientCredentialsGrant()
  .then(function(data) {
    spotifyApi.setAccessToken(data.body['access_token']);
  }, function(err) {
    console.log('Something went wrong when retrieving an access token', err);
});


app.listen(3000);