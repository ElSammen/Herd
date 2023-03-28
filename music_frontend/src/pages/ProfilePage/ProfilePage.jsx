import React, { useState, useEffect } from 'react'
import { Container, NavItem, CloseButton, Button } from 'react-bootstrap'
import ProfileApiCalls from '../../Api/ProfileApiCalls'
import './Profile.css'
import UpdateProfileModal from '../../Components/UpdateProfileModal'
import Nav from "react-bootstrap/Nav";


const profileApi = new ProfileApiCalls();

function ProfilePage() {
    const [profile, setProfile] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);

    const handleCloseModal = () => setShowModal(false);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const profileData = await profileApi.getProfile();
                setProfile(profileData);
                setIsFormSubmitted(true);
            } catch (error) {
                console.log(error);
            }
        };

        fetchProfile();
    }, [isFormSubmitted]);


    // const mapButtons = () => {
    //     return profile.genres.map((genre) => {
    //         return mapButton(genre)
    //     })
    // }


    const removeGenre = async (genre) => {
        await profileApi.removeGenre(genre)
        console.log(genre)
        console.log("Genre Not Removed")
    }



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
                        <img className="profilePic" src={profile.profilepic}></img>
                    </div>
                    <div className="userName">
                        {profile.username}
                    </div>
                    <div className="faveGenres">
                        {profile.genres.map((genre) => (
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

export default ProfilePage