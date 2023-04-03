import React from "react"
import Button from 'react-bootstrap/Button';
import "./tracksearchresult.css";
import Dropdown from "react-bootstrap/Dropdown";
import { useEffect } from "react";



export default function TrackResultRelated({ track, chooseTrack,}) {
  function handlePlay() {
    console.log("handle play ",track)
    chooseTrack(track)
  }


  return (
    <>
        <div
      className="d-flex m-2 align-items-center"
    >
    <div
      className="d-flex m-2 align-items-center"
      style={{ cursor: "pointer" }}
      onClick={handlePlay}
    >
      <img src={track.albumUrl} style={{ height: "64px", width: "64px" }} />
      <div className="ml-3">
        <div>{track.title}</div>
        <div className="text-muted">{track.artist}</div>
      </div>

    </div>
          </div>
          </>
  )
}