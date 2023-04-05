import { useState, useEffect } from "react";
import useAuth from "./useAuth";
import { Container, Form, Button } from "react-bootstrap";
import SpotifyWebApi from "spotify-web-api-node";
import axios from "axios";
import Player from "./Player";
import TrackSearchResult from "./TrackSearchResult";
import PlayListSearchResult from "./PlayListSearchResult";
import TrackResultRelated from "./TrackResultRelated";
import RecommendationList from "./RecommendationList";
import RecommendationImages from "./RecommendationImages";
import BrowseTracks from "./BrowseTracks";
import RecommendationSearchResult from "./RecommendationSearchResult";
import useAxios from "../../Api/useAxios";
import UnSplashApiClient from "../../Api/UnSplashApiClient";
import { AutoComplete } from "primereact/autocomplete";
import { GiDeer } from "react-icons/gi";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import "./home.css";
import Nav from "react-bootstrap/Nav";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PlaylistBrowse from "./PlaylistBrowse";
import ProfileView from "./ProfileView";

const unsplashApi = new UnSplashApiClient();

const spotifyApi = new SpotifyWebApi({
  clientId: "dc2e15714c224981bd8be8fa9297a1ca",
});

export default function Dashboard({ code, profile }) {
  const accessToken = useAuth(code);

  const [viewState, setStateView] = useState("");

  const [infoBool, setInfoBool] = useState(false);

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

  useEffect(() => {
    if (accessToken && accessToken.length > 0) {
      console.log("word");

      setTimeout(() => {
        console.log("token:", accessToken);
        getUserInfo();
      }, 1000);
    }
  }, [accessToken]);

  function getUserInfo() {
    console.log("getting user info check");

    // const data = await spotifyApi.getMe()

    const data = spotifyApi.getMe().then((value) => {
      console.log("our data:", value);
      if (value.body.id) {
        setUserID(value.body.id);
      }
    });
  }

  //  function getUserInfo() {

  //       console.log("getting user info check");

  //       const data = spotifyApi.getMe().then((value) => {
  //         console.log("our data:", value)
  //       })
  //         if(data.body.id) {
  //         setUserID(data.body.id)
  //       }

  //       console.log("user info data:",data.body.id)
  // }

  useEffect(() => {
    if (userID && userID.length > 0) {
      console.log("userID:", userID);
      console.log("playlists01");
      getPlaylists();
    }
  }, [userID]);

  function getPlaylists() {
    console.log("get playlists");
    spotifyApi.getUserPlaylists(userID).then((res) => {
      setPlaylistIDs(
        res.body.items.map((id) => {
          console.log("get playlists id", id);
          console.log("playlist info:", id)

          return {
            id: id.id,
            name: id.name,
          };
        })
      );
    });
  }

  const [setCurrentPlaylistName, setCurrentPlaylist] = useState("")

  function showPlaylist(playlist) {
    playlistBrowseShow();
    console.log("showing playlist", playlist);
    // which usestate are these calling??

    // calls the returnPlaylistResults use effect

    setPlaylistID(playlist.id);
console.log("show playlist current name:", playlistIDs)
    setCurrentPlaylist(playlist.name)
    console.log("current name:", setCurrentPlaylistName)

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
    console.log("playlist addition:");
    console.log("dashboard playlist:", playlist);
    console.log("dashboard uri:", trackUri);
    spotifyApi.addTracksToPlaylist(playlist, [trackUri]).then((res) => {
      console.log("track added?:", res.body);
    });
  }

  useEffect(() => {
    // console.log("use effect:", playingTrackArr);
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

  const [bottomText, setBottomText] = useState(false)

  function bothSearches(value) {
    setSearch(value);
    setBottomText(true)
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
  }, [playlistID]);

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
    setStateView("recommended");
  }

  function browseShow() {
    setStateView("browse");
  }

  function playlistBrowseShow() {
    setStateView("playlist_browse");
  }

  function profileShow() {
    console.log("showing profile")
    setStateView("profile_page");
  }

  return (
    <>
      <Container>
        <div className="topBar"></div>
      </Container>

      <div className="containAll">
        <div className="containAll02">
          <div className="LeftMenu">

            <div className="logoContainer">
              <Nav.Item>
                <Nav.Link className="item01">
                  <div className="accountIcon">
                    {profile ? (
                      <img className="profilePic" src={profile.profilepic} />
                    ) : (
                      <AccountCircleIcon />
                    )}
                  </div>
                  <div className="profile">
                    <p className="sidebarText">
                      {profile ? profile.username : <div>Profile</div>}
                    </p>

                  </div>
                </Nav.Link>
              </Nav.Item>
            </div>

            <Button
              className="playlistButton"
              size="md"
              variant="light"
              onClick={profileShow}
            >
              Profile
            </Button>
            <p className="sidebarText02">
            <div>Browse</div>
            </p>
            <Button
              className="playlistButton"
              size="md"
              variant="light"
              onClick={recommendedForYou}
            >
              Reccomended for you
            </Button>

            <Button
              className="playlistButton"
              size="md"
              variant="light"
              onClick={browseShow}
            >
              Search
            </Button>

            <div className="playlists">Playlists</div>

            <div className="listOfPlaylists">
              {playlistIDs.map((playlist) => (
                <Button
                  className="playlistButton"
                  variant="light"
                  size="md"
                  onClick={() => showPlaylist(playlist)}
                >
                  {playlist.name}
                </Button>
              ))}
            </div>

            <div className="createPlaylistContainer">
              <Container className="playList01">
                <Form className="createPlaylistForm" onSubmit={handleSubmit}>
                  <Form.Group
                    className="createPlaylistForm"
                    controlId="formName"
                  >
                    <Form.Control
                      className="createPlaylistForm"
                      type="text"
                      placeholder="Name New Playlist"
                      value={playlist}
                      onChange={(e) => setPlaylistName(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Button
                    className="createPlaylist"
                    variant="light"
                    size="md"
                    type="submit"
                  >
                    Create Playlist
                  </Button>
                </Form>
              </Container>
            </div>
          </div>

          <div className="mainContainer">

{viewState === "profile_page" && ( <> <ProfileView
profile={profile}/> </>)}


            {viewState === "recommended" && (
              <>
                {" "}
                <RecommendationImages
                  unsplashImages={unsplashImages}
                  getRecommendation={getRecommendation}
                  profile={profile}
                />
                <div className="recommendationListContainer">
                  <RecommendationList
                    recommendationsResults={recommendationsResults}
                    chooseTrack={chooseTrack}
                    playlistIDs={playlistIDs}
                    playlistAddition={playlistAddition}
                  />
                </div>{" "}
              </>
            )}
            
  
            {viewState === "playlist_browse" && (
              <>
                <PlaylistBrowse
                  playlistResults={playlistResults}
                  chooseTrack={chooseTrack}
                  playlistIDs={playlistIDs}
                  playlistAddition={playlistAddition}
                  setCurrentPlaylistName={setCurrentPlaylistName}
                />
              </>
            )}

            {viewState === "browse" && (
              <>
                <BrowseTracks
                  search={search}
                  bothSearches={bothSearches}
                  bottomText={bottomText}
                  searchResults={searchResults}
                  chooseTrack={chooseTrack}
                  playlistIDs={playlistIDs}
                  playlistAddition={playlistAddition}
                  searchResultsRelated={searchResultsRelated}
                />
              </>
            )}
          </div>
   

  


        </div>
      </div>

      <div className="bottomPlayer">
        <Player accessToken={accessToken} trackUri={playingTrack?.uri} />
      </div>
    </>
  );
}
