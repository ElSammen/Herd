import React, { useCallback } from "react";

export default function PlayListSearchResult({ track, chooseTrack }) {

  const handlePlay = useCallback(() => {
    console.log("handle play ", track);
    chooseTrack(track);
  }, [track, chooseTrack]);

  return (
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
  );
}