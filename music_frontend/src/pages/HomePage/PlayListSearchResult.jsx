import React, { useCallback, useEffect } from "react";
import Dropdown from "react-bootstrap/Dropdown";

export default function PlayListSearchResult({
  track,
  chooseTrack,
  playlistIDs,
  playlistAddition,
}) {
  const handlePlay = useCallback(() => {
    console.log("handle play ", track);
    chooseTrack(track);
  }, [track, chooseTrack]);

  useEffect(() => {
    console.log("playlistSearchResult tracks:", track);
  }, [track]);

  function playlistFunction(playlist) {
    console.log("were clicking");
    console.log("track uri:", track.uri);
    console.log("playlist id:", playlist);
    playlistAddition(playlist, track.uri);
    // console.log("playlist IDS:", playlistIDS)
  }

  useEffect(() => {
    console.log("playlist IDS:", playlistIDs);
  }, [playlistIDs]);

  return (
<>

   <div className="playlistSearchResultDiv">
    <div className="d-flex m-2 align-items-center">
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
      <div className="addToPlaylist">
        <Dropdown>
          <Dropdown.Toggle variant="light" id="dropdown-basic">
            Add To Playlist
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <div>
              {playlistIDs?.map((playlist) => (
                <div>
                  <Dropdown.Item
                    onClick={() => playlistFunction(playlist.id)}
                    href="#/action-1"
                  >
                    {playlist.name}
                  </Dropdown.Item>
                </div>
              ))}
            </div>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
    </div>
    </>
  );
}
