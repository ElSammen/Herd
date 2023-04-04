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
  const code = new URLSearchParams(window.location.search).get("code");

  return (
    <div className="home">
      <div className="navLinks">
        <Nav variant="tabs" defaultActiveKey="/home">
          <div className="nav01">
            <Nav.Item>
              <Nav.Link href="/home">
                <h1>HERD</h1>
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



<div className="dashboard">

              {code ? <Dashboard code={code} profile={profile} /> : <SpotifyLogin />}

              </div>


      <div className="footer"></div>
    </div>
  );
}

export default Home;
