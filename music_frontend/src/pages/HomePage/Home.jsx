import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import LoginButton from "./Loginbutton";
import SpotifyWebApi from 'spotify-web-api-js'

const spotifyApi = new SpotifyWebApi

const getTokenFromUrl = () => {
  return window.location.hash.substring(1)
    .split('&')
    .reduce((initial, item) => {
      let parts = item.split('=');
      initial[parts[0]] = decodeURIComponent(parts[1]);
      return initial;
    }, {});
}

function Home() {

  const REDIRECT_URI = "http://localhost:3000/home";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";

  const [token, setToken] = useState("");
  const [searchKey, setSearchKey] = useState("");

  const [artists, setArtists] = useState([])
  const [spotifyToken, setSpotifyToken] = useState("")
  const [nowPlaying, setNowPlaying] = useState({})
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    console.log("this is what we derived from the url: ", getTokenFromUrl())
    const spotifyToken = getTokenFromUrl().access_token
    window.location.hash = "";
    console.log("This is our spotify token", spotifyToken)

    if (spotifyToken) {
      setSpotifyToken(spotifyToken)
      spotifyApi.setAccessToken(spotifyToken)
      spotifyApi.getMe().then((user) => {
        console.log(user)
      })
      setLoggedIn(true)
    }
  })

  const getNowPlaying = () => {
    spotifyApi.getMyCurrentPlaybackState().then((response) => {
      console.log(response);
      setNowPlaying({
        name: response.item.name,
        albumArt: response.item.album.images[0].url
      })
    })
  }


  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    if (!token && hash) {
      token = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];

      window.location.hash = "";
      window.localStorage.setItem("token", token);
    }

    setToken(token);

  }, []);

  const logout = () => {
    setToken("");
    window.localStorage.removeItem("token");
  };

  const searchArtists = async (e) => {
    e.preventDefault()
    const {data} = await axios.get("https://api.spotify.com/v1/search", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        q: searchKey,
        type: "artist"
      },
    })

setArtists(data.artists.items)

    console.log(data);
  };

  const renderArtists = () => {
    return artists.map(artist => (

    <div key={artist.id}>
      {artist.images.length ? <img width={"50%"} src={artist.images[0].url} alt=""/> : <div>No images</div>}
      {artist.name}
    </div>
    ))
  }

  return (
    <>
    <div className="home">
      <h1>spotify react</h1>

      {!token ? (
        <LoginButton />
      ) : (
        <button onClick={logout}>logout</button>
      )}

      {token ? 
        <form onSubmit={searchArtists}>
          <input
            type="text"
            onChange={(e) => setSearchKey(e.target.value)}
            className="apicall"
          />
          <button type={"submit"} className="search">
            search
          </button>
        </form>
       : 
        <h2>please login</h2>
      }

{renderArtists()}

    </div>
    
    
    <div className="nowPlaying">
      {!loggedIn && <a href="http://localhost:3001">Login to Spotify</a>}
      {loggedIn && (
        <>
          <div>Now Playing {nowPlaying.name}</div>
          <div>
            <img src={nowPlaying.albumArt} style={{ height: 150 }} />
          </div>
        </>
      )}
      {loggedIn && (
        <button onClick={() => getNowPlaying()}>Check now Playing </button>
      )}
      </div>
      </>
  );
}

export default Home;
