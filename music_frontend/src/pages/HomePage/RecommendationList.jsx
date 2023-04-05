import React from 'react'
import { Container } from "react-bootstrap";
import RecommendationSearchResult from "./RecommendationSearchResult";

function RecommendationList(props) {
  return (
    <Container className='result'>
    <div className="flex-grow-1 my-2" style={{ overflowY: "auto" }}>
      {props.recommendationsResults?.map((track) => (
        <RecommendationSearchResult
          track={track}
          key={track.uri}
          chooseTrack={props.chooseTrack}
          playlistIDs={props.playlistIDs}
          playlistAddition={props.playlistAddition}
        />
      ))}
    </div>
  </Container>
  )
}

export default RecommendationList