import React, { useState, useEffect } from "react";
import { Container, NavItem, CloseButton, Button } from "react-bootstrap";
import ProfileApiCalls from "../../Api/ProfileApiCalls";
import UpdateProfileModal from "../../Components/UpdateProfileModal";
import Nav from "react-bootstrap/Nav";
import { useQuery } from "@tanstack/react-query";
import { AutoComplete } from "primereact/autocomplete";
import { GenreService } from "../../Components/GenreService";
import "../../Components/Autocomplete.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

const profileApi = new ProfileApiCalls();

function ProfileView({ profile }) {
  const [autoGenres, setAutoGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState(null);
  const [filteredGenres, setFilteredGenres] = useState(null);
  const [existingGenres, setExistingGenres] = useState([]);

  const search = (event) => {
    // Timeout to emulate a network connection
    setTimeout(() => {
      let _filteredGenres;

      if (!event.query.trim().length) {
        _filteredGenres = [...autoGenres];
      } else {
        _filteredGenres = autoGenres.filter((genreListItem) => {
          return genreListItem
            .toLowerCase()
            .startsWith(event.query.toLowerCase());
        });
      }

      setFilteredGenres(_filteredGenres);
    }, 50);
  };

  useEffect(() => {
    let temp = [];
    const data = GenreService.getData();
    data.forEach((i) => {
      temp.push(i.genreItem);
    });
    setAutoGenres(temp);
    // GenreService.getData().then((data) => setAutoGenres(data));
  }, []);

  const [profGenres, setprofGenres] = useState([]);
  const [profUsername, setprofUsername] = useState("");
  const [profProfilepic, setprofProfilepic] = useState("");
  const [onFormSubmit, setIsFormSubmitted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);

  console.log(selectedGenres);
  useEffect(() => {
    if (profile) {
      setprofGenres(profile.genres);
      setprofUsername(profile.username);
      setprofProfilepic(profile.profilepic);
    }
  }, [profile]);

  const addGenre = async (event) => {
    event.preventDefault();
    if (!selectedGenres || selectedGenres.length === 0 || existingGenres.includes(selectedGenres)) {
        return;
    }
    setExistingGenres((prevGenres) => [...prevGenres, selectedGenres]);
    setprofGenres((prevGenres) => [...prevGenres, selectedGenres]);
    try {
        const updatedData = {
            genres: selectedGenres
        };
        const response = await profileApi.updateProfile(updatedData);
        setprofGenres(response.genres);
        setSelectedGenres(null);
    } catch (error) {
        console.log("Something went wrong: ", error);
    }
};

const removeGenre = async (genre) => {
        await profileApi.removeGenre(genre)
        setprofGenres(profGenres.filter((item) => item !== genre))
        console.log(genre, "removed")
    }

  useEffect(() => {
    console.log(filteredGenres);
  }, [filteredGenres]);

  return (
    <>
      <Container className="profilePage">
        {profile ? (
          <>
            <>

            <div className="userName"><h2>{profUsername}</h2></div>

            <div className="genreBox">
                        <AutoComplete
                            className="AutoComplete"
                            multiple
                            value={selectedGenres}
                            suggestions={filteredGenres}
                            completeMethod={search}
                            onChange={(e) => setSelectedGenres(e.value)} /><>
                            <Button
                                className="addGenreButton"
                                variant="dark"
                                size="md"
                                onClick={addGenre}>Add Genre
                            </ Button> </>
                    </div>


                    <div className="faveGenres">

                    <p className="tags">Your Genre Tags!</p>

                        {profGenres?.map((genre) => (
                            <div className="genreButton"
                                variant="dark"
                                size="md"
                                key={genre}
                            >
                                         <CloseButton className="closeBtn" variant="dark"
                                    onClick={() => removeGenre(genre)}
                                />
                                {genre}
                       
                            </div>
                        ))}
                    </div>


              <UpdateProfileModal
                profile={profile}
                show={showModal}
                handleClose={handleCloseModal}
                animation={true}
                onFormSubmit={() => setIsFormSubmitted(true)}
              />
            </>
          </>
        ) : (
          <span>Loading profile data...</span>
        )}
      </Container>
    </>
  );
}

export default ProfileView;
