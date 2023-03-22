import { useState, useEffect } from "react"
import useAuth from "./useAuth"
import { Container, Form } from "react-bootstrap"
import SpotifyWebApi from "spotify-web-api-node"
import axios from "axios"
import Player from "./Player"
import TrackSearchResult from "./TrackSearchResult"



const spotifyApi = new SpotifyWebApi({
  clientId: "dc2e15714c224981bd8be8fa9297a1ca",
})

export default function Dashboard({ code }) {
  const accessToken = useAuth(code)

  // standard search usestate

  const [search, setSearch] = useState("")

  // related artists usestate

  const [searchRelated, setSearchRelated] = useState("")



  // standard results use state array

  const [searchResults, setSearchResults] = useState([])

  // related artists usestate array

  const [searchResultsRelated, setSearchResultsRelated] = useState([])



  const [playingTrack, setPlayingTrack] = useState()
  const [lyrics, setLyrics] = useState("")

  function chooseTrack(track) {
    setPlayingTrack(track)
    setSearch("")
    setLyrics("")
  }

  // lyrics

  useEffect(() => {
    if (!playingTrack) return

    axios
      .get("http://localhost:3001/lyrics", {
        params: {
          track: playingTrack.title,
          artist: playingTrack.artist,
        },
      })
      .then(res => {
        setLyrics(res.data.lyrics)
      })
  }, [playingTrack])

  // access token stuff

  useEffect(() => {
    if (!accessToken) return
    spotifyApi.setAccessToken(accessToken)
  }, [accessToken])

  function bothSearches(value) {
      setSearch(value)
  }

// standard search

  useEffect(() => {
    if (!search) return setSearchResults([])
    if (!accessToken) return

    let cancel = false
    spotifyApi.searchTracks(search).then(res => {
      if (cancel) return
      setSearchResults(
        res.body.tracks.items.map(track => {
          const smallestAlbumImage = track.album.images.reduce(
            (smallest, image) => {
              if (image.height < smallest.height) return image
              return smallest
            },
            track.album.images[0]
          )

         

          console.log(track.artists[0].id)

          return {
            artistId: track.artists[0].id,
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: smallestAlbumImage.url,
          }
        })
      )
      setSearchRelated(searchResults[0].artistId)
    })

    return () => (cancel = true)
  }, [search, accessToken])
 
// related search

useEffect(() => {
  console.log("search related", searchRelated)
})

  useEffect(() => {
    if (!searchRelated) return setSearchResultsRelated([])
    if (!accessToken) return

    let cancel = false
    spotifyApi.getArtistRelatedArtists(searchRelated).then(res => {
      if (cancel) return
      setSearchResultsRelated(
        res.body.artists.map(artist => {
          const smallestAlbumImage = artist.images.reduce(
            (smallest, image) => {
              if (image.height < smallest.height) return image
              return smallest
            },
            artist.images[0]
          )

          console.log(artist)

          return {
            artist: artist.name,
            uri: artist.uri,
            albumUrl: smallestAlbumImage.url,
          }
        })
      )
    })

    return () => (cancel = true)
  }, [searchRelated, accessToken])

  return (

// standard search

    <Container className="d-flex flex-column py-2" style={{ height: "100vh" }}>
      <Form.Control
        type="search"
        placeholder="Search Songs/Artists"
        value={search}
        onChange={e => bothSearches(e.target.value)}
      
      />

{/* // related search */}

      {/* <Form.Control
        type="search"
        placeholder="Search related artists"
        value={searchRelated}
        onChange={e => setSearchRelated(e.target.value)}
      /> */}

{/* // standard track feed */}

      <div className="flex-grow-1 my-2" style={{ overflowY: "auto" }}>
        {searchResults.map(track => (
          <TrackSearchResult
            track={track}
            key={track.uri}
            chooseTrack={chooseTrack}
          />
        ))}
        {searchResults.length === 0 && (
          <div className="text-center" style={{ whiteSpace: "pre" }}>
            {lyrics}
          </div>
        )}
      </div>

      {/* // related track feed */}
      
      <div className="flex-grow-1 my-2" style={{ overflowY: "auto" }}>
        {searchResultsRelated.map(track => (
          <TrackSearchResult
            track={track}
            key={track.uri}
            chooseTrack={chooseTrack}
          />
        ))}
        {searchResultsRelated.length === 0 && (
          <div className="text-center" style={{ whiteSpace: "pre" }}>
            {lyrics}
          </div>
        )}
      </div>

      <div>
        <Player accessToken={accessToken} trackUri={playingTrack?.uri} />
      </div>    
      </Container>
  )
}