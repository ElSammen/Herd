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
import Dashboard from "./Dashboard"
import SpotifyLogin from './SpotifyLogin'
import ProfileApiCalls from '../../Api/ProfileApiCalls'

const profileApi = new ProfileApiCalls();

function Home() {
  const REDIRECT_URI = "http://localhost:3000/home";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";
  const CLIENT_ID = "dc2e15714c224981bd8be8fa9297a1ca";
  const code = new URLSearchParams(window.location.search).get("code")

  const [token, setToken] = useState("");
  const [searchKey, setSearchKey] = useState("");

  const [artists, setArtists] = useState([]);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileData = await profileApi.getProfile();
        setProfile(profileData);
        console.log(profileData)
      } catch (error) {
        console.log(error);
      }
    };

    fetchProfile();
  }, []);


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

  const clientLogout = () => {
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



  async function redirectToLogin() {
    const data = await axios.get("http://localhost:3001/spotify/login")
    window.open(data.data)
    console.log(data)
  }

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
          
          <Nav>
            <Nav.Item>
              <Nav.Link className="item01" href="/profile">
                <div className="accountIcon">
              {profile? <img className="profilePic" src={profile.profilepic} /> : <AccountCircleIcon />}
                </div>
                <div className="profile">
                  <p>{profile ? profile.username : <div>Profile</div>}</p>
                </div>
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link className="item02">
                <div className="playlistIcon">
                  <AddIcon />
                </div>
                <div className="playists">
                  <p>Playlists</p>
                </div>
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link className="item03">
                <div className="playlistIcon">
                  <SearchIcon />
                </div>
                <div className="playists">
                  <p>Search</p>
                </div>
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link className="item04">
                <div className="playlistIcon">
                  <FavoriteIcon />
                </div>
                <div className="playists">
                  <p>Friends</p>
                </div>
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link className="item05">
                <div className="playlistIcon">
                  <SettingsIcon />
                </div>
                <div className="playists">
                  <p>Settings</p>
                </div>
              </Nav.Link>
            </Nav.Item>
          </Nav>
          <Nav>

            <Nav.Item>
              <Nav.Link className="item06">
                <div className="signOut">
                  <SettingsIcon />
                </div>
                <div className="signOutButton">
                <button onClick={clientLogout}>Sign out</button>
                </div>
              </Nav.Link>
            </Nav.Item>
          </Nav>
         </div>

        <div className="spotifySearch">
          <div className="searchButtons">
            <div className="spotifyLoginAndLogout">
              {code ? <Dashboard code={code} /> : <SpotifyLogin />}
            </div>
            {/* {token && (
              <form onSubmit={searchArtists}>
                <input
                  type="text"
                  onChange={(e) => setSearchKey(e.target.value)}
                  className="apicall"
                  placeholder="search for artists"
                />
              </form>
            )} */}
          </div>
          <div className="containResults">{artists && renderArtists()}</div>
        </div>
      </div>
          
      <div className="footer"></div>
    </div >
  );
}

export default Home;
