import React, { useEffect } from 'react'
import { Container } from 'react-bootstrap'
import PlayListSearchResult from './PlayListSearchResult'

function PlaylistBrowse(props) {

useEffect(() => {
console.log("useeffect for props:",props.playlistIDs)
},[props])

  return (
    <div className='enBiggen'>

<div className="playlistTitle">
<h2>{props.setCurrentPlaylistName}</h2>
</div>

<Container className='result'>
<div className='enBiggen'>
    <div className="flex-grow-1 my-2" style={{ overflowY: "auto" }}>
              {[
                ...new Map(
                  props.playlistResults?.map((track) => [
                    track["uri"],
                    <PlayListSearchResult
                      track={track}
                      key={track.uri}
                      chooseTrack={props.chooseTrack}
                      playlistIDs={props.playlistIDs}
                      playlistAddition={props.playlistAddition}
                    />,
                  ])
                ).values(),
              ]}
            </div>
            </div>
          </Container>

    </div>
   
  )
}

export default PlaylistBrowse