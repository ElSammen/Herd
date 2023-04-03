import { useState, useEffect } from "react";
import useAuth from "./useAuth";
import { Container, Form, Button } from "react-bootstrap";
import SpotifyWebApi from "spotify-web-api-node";
import axios from "axios";
import Player from "./Player";
import TrackSearchResult from "./TrackSearchResult";
import PlayListSearchResult from "./PlayListSearchResult";
import TrackResultRelated from "./TrackResultRelated";
import RecommendationSearchResult from "./RecommendationSearchResult";
import useAxios from "../../Api/useAxios";
import UnSplashApiClient from "../../Api/UnSplashApiClient";
import { AutoComplete } from 'primereact/autocomplete';

const unsplashApi = new UnSplashApiClient();

const spotifyApi = new SpotifyWebApi({
  clientId: "dc2e15714c224981bd8be8fa9297a1ca",
});

export default function Dashboard({ code, profile }) {
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

  const [selectPlaylistId, setSelectPlaylistID] = useState("");

  const [playlistIDs, setPlaylistIDs] = useState([]);

  const [playingTrack, setPlayingTrack] = useState("");

  const [playingTrackArr, setPlayingTrackArr] = useState([]);

  const [lyrics, setLyrics] = useState("");

  const [playlist, setPlaylistName] = useState("");

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
      setPlaylistIDs(
        res.body.items.map((id) => {
          console.log("get playlists id", id);
          return {
            id: id.id,
            name: id.name,
          };
        })
      );
    });
  }

  function showPlaylist(playlist) {
    console.log("showing playlist", playlist.id);

    // which usestate are these calling??

    // calls the returnPlaylistResults use effect

    setPlaylistID(playlist.id);

    setSelectPlaylistID(playlist.id);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // Do something with the form data
    console.log("playlist:", playlist);
    createPlaylist(playlist);

    // Clear the form inputs
    setPlaylistName("");
  };

  function createPlaylist(value) {
    // console.log(value)
    spotifyApi.createPlaylist(value).then((req) => {
      console.log(req);
      getUserInfo();
      getPlaylists();
    });
    console.log("making playlist");
  }

  function chooseTrack(track) {
    console.log("choose track ", track);
    setPlayingTrack(track);
    // setSearch("");
    setLyrics("");
  }

  // add track to playlist useeffect


  function playlistAddition(playlist, trackUri) {
    console.log("playlist addition:")
    console.log("dashboard playlist:", playlist)
    console.log("dashboard uri:", trackUri)
    spotifyApi.addTracksToPlaylist(playlist, [trackUri]).then((res) => {
      console.log("track added?:", res.body)
    })
  }


  useEffect(() => {
    console.log("use effect:", playingTrackArr);
    spotifyApi
      .addTracksToPlaylist(selectPlaylistId, [playingTrackArr])
      .then((res) => {
        console.log("create track res:", res);
        setPlayingTrackArr([]);
        getUserInfo();
        getPlaylists();
      });
  }, [playingTrackArr]);

  function addTrackToPlaylist() {
    const value = playingTrack.uri;

    setPlayingTrackArr(value);

    console.log("playlist id:", selectPlaylistId);

    console.log("our array:", playingTrackArr);
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
    console.log("playlist use effect");
    if (!userID) return setPlaylistResults([]);
    if (!accessToken) return;

    let cancel = false;
    spotifyApi.getPlaylistTracks(playlistID).then((res) => {
      if (cancel) return;
      setPlaylistResults(
        res.body.items.map((item) => {
          console.log("line 186 item:", item);
          const smallestAlbumImage = item.track.album.images.reduce(
            (smallest, image) => {
              if (image.height < smallest.height) return image;
              return smallest;
            },
            item.track.album.images[0]
          );

          return {
            id: Date.now(),
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

  const [recommendations, setRecommendations] = useState([]);
  const [recommendationsResults, setRecommendationsResults] = useState([]);

  function getRecommendation(genre) {
    spotifyApi.getRecommendations({ seed_genres: [`${genre}`] }).then((res) => {
      console.log("profile:", accessProfile.genres);
      setRecommendations(res.body.tracks);
    });
  }

  useEffect(() => {
    if (!recommendations) return setRecommendations([]);
    if (!accessToken) return;

    let cancel = false;
    if (cancel) return;
    setRecommendationsResults(
      recommendations.map((item) => {
        console.log("item:", item);
        const smallestAlbumImage = item.album.images.reduce(
          (smallest, image) => {
            if (item.album.images[0] < smallest.height) return image;
            return smallest;
          },
          item.album.images[0]
        );

        return {
          artist: item.artists[0].name,
          title: item.album.name,
          uri: item.uri,
          albumUrl: smallestAlbumImage.url,
        };
      })
    );

    return () => (cancel = true);
  }, [recommendations, accessToken]);

  const accessProfile = profile;

  const [image01, setImageResults] = useState([]);

  const [profileGenreTag, setProfileGenreTag] = useState([]);
  const [profileGenres, setProfileGenres] = useState([]);
  const [profileGenreTagResults, setProfileGenreTagResults] = useState("");

  const [unsplashImages, setUnsplashImages] = useState([]);
  const [genreSearch, setGenreSearch] = useState([]);

  var imageArr = [];

  function recommendedForYou() {
    spotifyApi.getAvailableGenreSeeds().then((res) => {
      console.log("genres:", res.body);
    });

    setProfileGenres(profile.genres);
    let promiseArr = [];

    profile.genres.forEach((genre) => {
      promiseArr.push(unsplashApi.getImages(genre));
    });

    const allImages = Promise.all(promiseArr)
      .then((values) => {
        setUnsplashImages(
          values.map((image) => {
            imageArr.push(image.results[0].urls.regular);

            return {
              image: image.results[0].urls.regular,
            };
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>



      <Container>
        <button onClick={recommendedForYou}>Reccomended for you</button>

        <div className="imageContainer01">
          {unsplashImages.map((item, index) => (
            <div>
              <img
                className="splashImg"
                onClick={() => getRecommendation(profile.genres[index])}
                src={item.image}
              ></img>
            </div>
          ))}
        </div>

        <button onClick={getRecommendation}>get recommendations</button>
        <div className="flex-grow-1 my-2" style={{ overflowY: "auto" }}>
          {recommendationsResults.map((track) => (
            <RecommendationSearchResult
              track={track}
              key={track.uri}
              chooseTrack={chooseTrack}
              playlistIDS={playlistIDs}
              playlistAddition={playlistAddition}
            />
          ))}
        </div>
      </Container>

      <Container>
        <button onClick={getUserInfo}>get user info</button>
        <button onClick={getPlaylists}>get playlists</button>
        <button onClick={addTrackToPlaylist}>Add song to playlist</button>
        {/* <button onClick={createPlaylist}>Create Playlist</button> */}

        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your name"
              value={playlist}
              onChange={(e) => setPlaylistName(e.target.value)}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>

        <div className="listOfPlaylists">
          {playlistIDs.map((playlist) => (
            <Button
              variant="primary"
              size="md"
              onClick={() => showPlaylist(playlist)}
            >
              {playlist.name}
            </Button>
          ))}
        </div>

        <div className="flex-grow-1 my-2" style={{ overflowY: "auto" }}>
          {[
            ...new Map(
              playlistResults.map((track) => [
                track["uri"],
                <PlayListSearchResult
                  track={track}
                  key={track.uri}
                  chooseTrack={chooseTrack}
                  playlistIDS={playlistIDs}
                  playlistAddition={playlistAddition}
                />,
              ])
            ).values(),
          ]}
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
              playlistIDS={playlistIDs}
              playlistAddition={playlistAddition}
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
            <TrackResultRelated
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
