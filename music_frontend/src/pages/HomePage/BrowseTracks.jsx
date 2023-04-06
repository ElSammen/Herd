import React from 'react'
import { Container, Form } from 'react-bootstrap'
import TrackSearchResult from './TrackSearchResult'
import TrackResultRelated from './TrackResultRelated'

function BrowseTracks(props) {

  const checkBool = props.bottomText
  console.log(checkBool)
  return (
    <div>

<p className="recommendedText">Browse for new music!</p>


<div className="searchBox">
<Container 
              className="d-flex flex-column py-2 result"
            
            >
              <Form.Control
                type="search"
                placeholder="Search Songs/Artists"
                value={props.search}
                onChange={(e) => props.bothSearches(e.target.value)}
              />
</Container>

</div>
<Container 
              className="d-flex flex-column py-2 result"
              style={{ height: "100vh" }}
            >

              <div className="flex-grow-1 ms-2" style={{ overflowY: "auto" }}>
                {props.searchResults?.map((track) => (
                  // console.log("track ", track)
                  <TrackSearchResult
                    track={track}
                    key={track.uri}
                    chooseTrack={props.chooseTrack}
                    playlistIDs={props.playlistIDs}
                    playlistAddition={props.playlistAddition}
                  />
                ))}
                {props.searchResults.length === 0 && (
                  <div className="text-center" style={{ whiteSpace: "pre" }}>
                    {props.lyrics}
                  </div>
                )}
              </div>
   

            {/* // related track feed */}
{checkBool === true && (<><h5 className="recommendedText02">Related music to your search</h5></>)}
            {/* <h5 className="recommendedText">Related music to your search</h5> */}

              <div className="flex-grow-1 ms-2" style={{ overflowY: "auto" }}>
                {props.searchResultsRelated.map((track) => (
                  <TrackResultRelated
                    track={track}
                    key={track.uri}
                    chooseTrack={props.chooseTrack}
                  />
                ))}
                {props.searchResultsRelated.length === 0 && (
                  <div className="text-center" style={{ whiteSpace: "pre" }}>
                    {props.lyrics}
                  </div>
                )}
              </div>
            </Container>

    </div>
  )
}

export default BrowseTracks