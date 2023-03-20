import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import Nav from "react-bootstrap/Nav";
import "./home.css";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SettingsIcon from "@mui/icons-material/Settings";

function Home() {
  const REDIRECT_URI = "http://localhost:3000/home";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";
  const CLIENT_ID = "dc2e15714c224981bd8be8fa9297a1ca";

  const [token, setToken] = useState("");
  const [searchKey, setSearchKey] = useState("");

  const [artists, setArtists] = useState([]);

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
    e.preventDefault();
    const { data } = await axios.get("https://api.spotify.com/v1/search", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        q: searchKey,
        type: "artist",
      },
    });

    if (data.artists.items.length > 2) {
      console.log(data.artists.items);
      setArtists(data.artists.items);
    }
    console.log(data);
  };

  const renderArtists = () => {
    return artists
      .filter((artist) => artist.images.length > 0)
      .map((artist) => (
        <div className="resultsWrapper" key={artist.id}>
          <div className="results">
            <img width={"50%"} src={artist.images[0].url} alt="" />
            {/* {artist.images.length ? (<img width={"50%"} src={artist.images[0].url} alt="" />) : (<div className="noImage"></div>)} */}
            {artist.name}
          </div>
        </div>
      ));
  };

  return (
    <div className="home">
      <div className="navLinks">
        <Nav variant="tabs" defaultActiveKey="/home">
          <div className="nav01">
            <Nav.Item>
              <Nav.Link href="/home">
                <h1>Herd</h1>
              </Nav.Link>
            </Nav.Item>
          </div>

          <div className="nav01">
            <Nav.Item>
              <Nav.Link href="/home">
                <img className="logo" src="../images/reindeer-white.svg"></img>
              </Nav.Link>
            </Nav.Item>
          </div>
          <div className="nav01">
            <Nav.Item>
              <Nav.Link href="/home">Music Search</Nav.Link>
            </Nav.Item>
          </div>

          <div className="nav02">
            <Nav.Item>
              <Nav.Link href="/drum">Drum Machine</Nav.Link>
            </Nav.Item>
          </div>

          <div className="nav03">
            <Nav.Item>
              <Nav.Link href="/piano">Piano</Nav.Link>
            </Nav.Item>
          </div>
        </Nav>
      </div>

      <div className="mainArea">
        <div className="sidebarArea">
          <div className="spotifyTitleAndLoginWrapper">


            <div className="searchTitle">
              <h1></h1>
            </div>
          </div>
          <ul className="listItems">
            <li className="item01">
              <div className="playlistIcon">
                <AccountCircleIcon />
              </div>
              <div className="playists">
                <p>Profile</p>
              </div>
            </li>

            <li className="item02">
              <div className="playlistIcon">
                <AddIcon />
              </div>
              <div className="playists">
                <p>Playlists</p>
              </div>
            </li>

            <li className="item03">
              <div className="playlistIcon">
                <SearchIcon />
              </div>
              <div className="playists">
                <p>Search</p>
              </div>
            </li>

            <li className="item04">
              <div className="playlistIcon">
                <FavoriteIcon />
              </div>
              <div className="playists">
                <p>Friends</p>
              </div>
            </li>

            <li className="item04">
              <div className="playlistIcon">
                <SettingsIcon />
              </div>
              <div className="playists">
                <p>Settings</p>
              </div>
            </li>
          </ul>

          <div className="spotifyLoginAndLogout">
              {!token ? (
                <a
                  href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}
                >
                  <button className="logBtn">login</button>
                </a>
              ) : (
                <button className="logBtn" onClick={logout}>
                  logout
                </button>
              )}
            </div>

        </div>

        <div className="spotifySearch">
          <div className="searchButtons">
            {token && (
              <form onSubmit={searchArtists}>
                <input
                  type="text"
                  onChange={(e) => setSearchKey(e.target.value)}
                  className="apicall"
                  placeholder="search for artists"
                />
              </form>
            )}
          </div>
          <div className="containResults">{artists && renderArtists()}</div>
        </div>
      </div>

      <div className="footer"></div>
    </div>
  );
}

export default Home;
