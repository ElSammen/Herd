import React from "react"
import Button from 'react-bootstrap/Button';
import "./tracksearchresult.css";



export default function TrackSearchResult({ track, chooseTrack}) {
  function handlePlay() {
    console.log("handle play ",track)
    chooseTrack(track)
    // track = ""
  }

  // function addToPlaylist() {
  //   spotifyApi.addTracksToPlaylist(playlistID, track)
  // }

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
          <div className="addToPlaylist"><Button variant="success">Add To Playlist</Button></div>
          </div>
          </>
  )
}