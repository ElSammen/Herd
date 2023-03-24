import React, { useState, useEffect } from 'react'
import { Container } from 'react-bootstrap'
import ProfileApiCalls from '../../Api/ProfileApiCalls'

const profileApi = new ProfileApiCalls();
function ProfilePage() {
    const [profile, setProfile] = useState(null);
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const profileData = await profileApi.getProfile();
                setProfile(profileData);
            } catch (error) {
                console.log(error);
            }
        };
        fetchProfile();
    }, []);
    return (
        <>
            <Container className="profilePage">
                {profile ? (<><>
                    <div className="profilePicBox">
                        <img className="profilePic" src={profile.profilepic}></img>
                    </div>
                    <div className="userName">
                        {profile.username}
                    </div>
                    <div className="faveGenres">
                        {profile.genres}
                    </div></>
                    <>
                    {/* <GenrePick /> */}
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