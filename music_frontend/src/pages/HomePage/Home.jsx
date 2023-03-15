import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";

function Home() {

  const REDIRECT_URI = "http://localhost:3000/home";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";

  const [token, setToken] = useState("");
  const [searchKey, setSearchKey] = useState("");

  const [artists, setArtists] = useState([])

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
    <div className="home">
      <h1>spotify react</h1>

      {!token ? (
        <a
          href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}
        >
          login to spotify
        </a>
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
  );
}

export default Home;
