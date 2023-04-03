import React, { useState, useEffect } from 'react'
import { Container, NavItem, CloseButton, Button } from 'react-bootstrap'
import ProfileApiCalls from '../../Api/ProfileApiCalls'
import './Profile.css'
import UpdateProfileModal from '../../Components/UpdateProfileModal'
import Nav from "react-bootstrap/Nav";
import { useQuery } from '@tanstack/react-query'
import { AutoComplete } from 'primereact/autocomplete'
import { GenreService } from '../../Components/GenreService'
import '../../Components/Autocomplete.css'
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";


const profileApi = new ProfileApiCalls();

function ProfilePage({ profile }) {
    const [autoGenres, setAutoGenres] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState(null);
    const [filteredGenres, setFilteredGenres] = useState(null);
  
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

    console.log(selectedGenres)
    useEffect(() => {
        if (profile) {
            setprofGenres(profile.genres);
            setprofUsername(profile.username);
            setprofProfilepic(profile.profilepic);
        }
    }, [profile]);

    const addGenre = async (event) => {
        event.preventDefault();
        if (selectedGenres.length === 0) {
            return;
        }
        try {
            const updatedData = {
                genres: selectedGenres  // Include selected genres in the form data that is sent to the backend
            };
            await profileApi.updateProfile(updatedData);

        } catch (error) {
            console.log("Something went wrong: ", error);
        }
    };

    const removeGenre = async (genre) => {
        await profileApi.removeGenre(genre)
        console.log(genre)
        console.log("Genre Not Removed")
    }

   

    // useEffect(() => {
    //     console.log(selectedGenres)
    // }, [selectedGenres])

    useEffect(() => {
        console.log(filteredGenres)
    }, [filteredGenres])

    return (
        <>
            <Nav variant="tabs" defaultActiveKey="/home" className="returnButton">
                <NavItem>
                    <Nav.Link href="/home">
                        <div><h1>Return</h1></div>
                    </Nav.Link>
                </NavItem>
            </Nav>

            <Container className="profilePage">
                {profile ? (<><>
                    <div className="profilePicBox">
                        <img className="profilePic" src={profProfilepic}></img>
                    </div>
                    <div className="genreBox">
                        <AutoComplete
                         multiple
                         value={selectedGenres}
                         suggestions={filteredGenres}
                         completeMethod={search}
                         onChange={(e) => setSelectedGenres(e.value)} /><>
                            <Button
                                className="addGenreButton"
                                variant="success"
                                size="md"
                                onClick={addGenre}>Add Genre
                            </ Button> </>
                    </div>
                    <div className="userName">
                        {profUsername}
                    </div>
                    <div className="faveGenres">
                        {profGenres?.map((genre) => (
                            <div className="genreButton"
                                variant="success"
                                size="md"
                                key={genre}

                            >
                                {genre}
                                <CloseButton variant="white"
                                    onClick={() => removeGenre(genre)}
                                />
                            </div>
                        ))}
                        {/* <GenreButtons 
                        genre={mapButtons}
                        props={profile.genres} /> */}
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
    )
}

export default ProfilePage;