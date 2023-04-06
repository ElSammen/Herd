import { useState, useEffect } from "react";
import SpotifyPlayer from "react-spotify-web-playback";

export default function Player({ accessToken, trackUri }) {
  const [play, setPlay] = useState(false);
  const [uri, setUri] = useState([])


  useEffect(() => {
    setPlay(true)
    // console.log("trackuri log:", trackUri)
  }, [trackUri])

  useEffect(() => {

    setUri(trackUri)
  }, [trackUri])
  

  return (
    <SpotifyPlayer
      token={accessToken}
      showSaveIcon
      callback={state => {
        console.log(state)
        console.log("state uri:", state.track.uri)
        if (!state.isPlaying) setPlay(false)
        state.track.uri = uri
      }}
      // callback={(state) => {!state.isPlaying && setPlay(false)}}
      uris={uri}
      play={play}
     
    />
  );
}
