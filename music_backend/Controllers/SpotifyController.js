const Spotify = require('spotify-web-api-node');
const querystring = require('querystring');



const generateRandomString = N => (Math.random().toString(36)+Array(N).join('0')).slice(2, N+2);

const spotifyApi = new Spotify({
    clientId: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    redirectUri: process.env.REDIRECT_URI || `http://localhost:3000/callback`
  });


// exports.login = async function (req, res) {
//     const state = generateRandomString(16);
//     res.cookie(stateKey, state);
  
//     // your application requests authorization
//     const scope = 'user-read-private user-read-email user-read-playback-state';
//     res.redirect('https://accounts.spotify.com/authorize?' +
//       querystring.stringify({
//         response_type: 'code',
//         client_id: clientId,
//         scope: scope,
//         redirect_uri: redirectUri,
//         state: state
//       }));
//   };

exports.login = async function (req, res) {
    
  };

