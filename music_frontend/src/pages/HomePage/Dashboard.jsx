import { useState, useEffect } from "react";
import useAuth from "./useAuth";
import { Container, Form } from "react-bootstrap";
import SpotifyWebApi from "spotify-web-api-node";
import axios from "axios";
import Player from "./Player";
import TrackSearchResult from "./TrackSearchResult";
import PlayListSearchResult from "./PlayListSearchResult";

const spotifyApi = new SpotifyWebApi({
  clientId: "dc2e15714c224981bd8be8fa9297a1ca",
});

export default function Dashboard({ code }) {
  const accessToken = useAuth(code);

  // standard search usestate

  const [search, setSearch] = useState("");

  // related artists usestate

  const [searchRelated, setSearchRelated] = useState("");

  // standard results use state array

  const [searchResults, setSearchResults] = useState([]);

  // related artists usestate array

  const [searchResultsRelated, setSearchResultsRelated] = useState([]);

  // set user ID

  const [userID, setUserID] = useState("");

  // set playlist results for one playlist

  const [playlistResults, setPlaylistResults] = useState([]);

  // get playlist items

  const [playlistID, setPlaylistID] = useState("");

  const [playingTrack, setPlayingTrack] = useState("");
  const [lyrics, setLyrics] = useState("");

  // get playlists

  function getUserInfo() {
    console.log("getting user info check");
    spotifyApi.getMe().then((res) => {
      console.log("get user info:", res.body);
      setUserID(res.body.id);
    });
    // console.log(me)
  }

  function getPlaylists() {
    spotifyApi.getUserPlaylists(userID).then((res) => {
      console.log("get playlists id", res.body.items[0].id);
      setPlaylistID(res.body.items[3].id);
    });
  }

  function chooseTrack(track) {
    console.log("choose track ", track);
    setPlayingTrack(track);
    setSearch("");
    setLyrics("");
  }

  // lyrics

  // useEffect(() => {
  //   if (!playingTrack) return;

  //   axios
  //     .get("http://localhost:3001/lyrics", {
  //       params: {
  //         track: playingTrack.title,
  //         artist: playingTrack.artist,
  //       },
  //     })
  //     .then((res) => {
  //       setLyrics(res.data.lyrics);
  //     });
  // }, [playingTrack]);

  // access token stuff

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  function bothSearches(value) {
    setSearch(value);
  }

  // map over playlists

  useEffect(() => {
    if (!userID) return setPlaylistResults([]);
    if (!accessToken) return;

    let cancel = false;
    spotifyApi.getPlaylistTracks(playlistID).then((res) => {
      // console.log("res body ", res.body);
      if (cancel) return;
      setPlaylistResults(
        res.body.items.map((item) => {
          // console.log("item ", item);
          const smallestAlbumImage = item.track.album.images.reduce(
            (smallest, image) => {
              if (image.height < smallest.height) return image;
              return smallest;
            },
            item.track.album.images[0]
          );

          return {
            artistId: item.track.artists[0].id,
            artist: item.track.artists[0].name,
            title: item.track.name,
            uri: item.track.uri,
            albumUrl: smallestAlbumImage.url,
          };
        })
      );
    });

    return () => (cancel = true);
  }, [playlistID, accessToken]);

  // standard search

  useEffect(() => {
    // console.log(playlistResults);
  }, [playlistResults]);

  useEffect(() => {
    if (!search) return setSearchResults([]);
    if (!accessToken) return;

    let cancel = false;
    spotifyApi.searchTracks(search).then((res) => {
      if (cancel) return;
      setSearchResults(
        res.body.tracks.items.map((track) => {
          const smallestAlbumImage = track.album.images.reduce(
            (smallest, image) => {
              if (image.height < smallest.height) return image;
              return smallest;
            },
            track.album.images[0]
          );
          return {
            artistId: track.artists[0].id,
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: smallestAlbumImage.url,
          };
        })
      );
      setSearchRelated(searchResults[0]?.artistId);
    });

    return () => (cancel = true);
  }, [search, accessToken]);

  useEffect(() => {
    if (!searchRelated) return setSearchResultsRelated([]);
    if (!accessToken) return;

    let cancel = false;
    spotifyApi.getArtistRelatedArtists(searchRelated).then((res) => {
      if (cancel) return;
      setSearchResultsRelated(
        res.body.artists.map((artist) => {
          const smallestAlbumImage = artist.images.reduce((smallest, image) => {
            if (image.height < smallest.height) return image;
            return smallest;
          }, artist.images[0]);

          return {
            artist: artist.name,
            uri: artist.uri,
            albumUrl: smallestAlbumImage.url,
          };
        })
      );
    });

    return () => (cancel = true);
  }, [searchRelated, accessToken]);

  // function pauseTrack() {
  //   spotifyApi.pause()
  // }
  // function playTrack() {
  //   spotifyApi.play()
  // }

  return (
    <>
      <Container>
        <button onClick={getUserInfo}>get user info</button>
        <button onClick={getPlaylists}>get playlists</button>

        <div className="flex-grow-1 my-2" style={{ overflowY: "auto" }}>
          {playlistResults.map((track) => (
            <PlayListSearchResult
              track={track}
              key={track.uri}
              chooseTrack={chooseTrack}
            />
          ))}
        </div>
      </Container>

      {/* // standard search */}

      <Container
        className="d-flex flex-column py-2"
        style={{ height: "100vh" }}
      >
        <Form.Control
          type="search"
          placeholder="Search Songs/Artists"
          value={search}
          onChange={(e) => bothSearches(e.target.value)}
        />

        {/* // standard track feed */}

        <div className="flex-grow-1 my-2" style={{ overflowY: "auto" }}>
          {searchResults.map((track) => (
            // console.log("track ", track)
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
          {searchResultsRelated.map((track) => (
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
    </>
  );
}
