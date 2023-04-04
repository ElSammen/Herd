import React from 'react'
import { Container, Form } from 'react-bootstrap'
import TrackSearchResult from './TrackSearchResult'
import TrackResultRelated from './TrackResultRelated'

function BrowseTracks(props) {
  return (
    <div>

<Container
              className="d-flex flex-column py-2"
              style={{ height: "100vh" }}
            >
              <Form.Control
                type="search"
                placeholder="Search Songs/Artists"
                value={props.search}
                onChange={(e) => props.bothSearches(e.target.value)}
              />




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