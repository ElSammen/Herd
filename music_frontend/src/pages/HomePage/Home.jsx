import { useEffect, useState } from "react";
import React from "react";
import Nav from "react-bootstrap/Nav";
import "./home.css";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SettingsIcon from "@mui/icons-material/Settings";
import StreamIcon from '@mui/icons-material/Stream';
import Dashboard from "./Dashboard";
import SpotifyLogin from "./SpotifyLogin";
import "bootstrap/dist/css/bootstrap.min.css";
import ProfileApiCalls from '../../Api/ProfileApiCalls'
import {GiDeer} from 'react-icons/gi'

const profileApi = new ProfileApiCalls();

function Home({profile}) {
  // const navigate = useNavigate();
  const code = new URLSearchParams(window.location.search).get("code");


  // if(onPlaylist) {
  //   navigate("/playlist");
  // }


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
                <GiDeer className="deerIcon"/>
              </Nav.Link>
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
          <Nav.Item>
              <Nav.Link className="item01" href="/profile">
                <div className="accountIcon">
              {profile? <img className="profilePic" src={profile.profilepic} /> : <AccountCircleIcon />}
                </div>
                <div className="profile">
                  <p className="sidebarText">{profile ? profile.username : <div>Profile</div>}</p>
                </div>
              </Nav.Link>
            </Nav.Item>
            <li className="item01">
              <div className="playlistIcon">
              <StreamIcon/>
              </div>
              <div className="playists sidebarText">
              <Nav.Link href="/home">Feed</Nav.Link>
              </div>
            </li>

            <li className="item02">
              <div className="playlistIcon">
                <AddIcon />
              </div>
              <div className="playists sidebarText">
                <Nav.Link href="/playlists">Playlists</Nav.Link>
              </div>
            </li>

            <li className="item03">
              <div className="playlistIcon">
                <SearchIcon />
              </div>
              <div className="playists sidebarText">
              <Nav.Link href="/search">Search</Nav.Link>
              </div>
            </li>

            <li className="item04">
              <div className="playlistIcon">
                <FavoriteIcon />
              </div>
              <div className="playists sidebarText">
              <Nav.Link href="/friends">Friends</Nav.Link>
              </div>
            </li>

            <li className="item04">
              <div className="playlistIcon">
                <SettingsIcon />
              </div>
              <div className="playists sidebarText">
              <Nav.Link href="/settings">Settings</Nav.Link>
              </div>
            </li>
          </ul>
        </div>

        <div className="spotifySearch">
          <div className="searchButtons">
            <div className="spotifyLoginAndLogout sidebarText">
              {code ? <Dashboard code={code} profile={profile} /> : <SpotifyLogin />}
            </div>
          </div>
        </div>
      </div>

      <div className="footer"></div>
    </div>
  );
}

export default Home;
