import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ProfileApiCalls from "../Api/ProfileApiCalls";
import "bootstrap/dist/css/bootstrap.css";
const profileApi = new ProfileApiCalls();
function UpdateProfileModal(props) {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    profilepic: props.profile.profilepic,
    username: props.profile.username,
    password: props.profile.password,
    genres: props.profile.genres,
  });
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData((prevData) => {
      return {
        ...prevData,
        [id]: value !== "" ? value : prevData[id],
      };
    });
  };

  const submitData = async (event) => {
    event.preventDefault();

    console.log("string:", formData.genres);
    console.log("split:", formData.genres.split(","));

const newGenresArray = formData.genres.split(",").map(element => {
    return element.trim().split(" ").join("-")
});

console.log("new genres:", newGenresArray.toString())

formData.genres = newGenresArray.toString()


    try {
      console.log("form data 60:", formData);
      const profileData = await profileApi.updateProfile(formData);
      console.log(profileData);
    } catch (error) {
      console.log("Something went wrong: ", error);
    }
    handleClose();
  };

  useEffect(() => {
console.log("use effect 70:", formData)
  }, [formData])

  return (
    <>
      <Button variant="outline-light" onClick={handleShow}>
        Update Profile
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Form onSubmit={submitData}>
          <Modal.Header closeButton>
            <Modal.Title>Update Profile</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3 updatePic">
              Update Profile Picture
              <Form.Control
                type="text"
                id="profilepic"
                profilepic="profilepic"
                value={formData.profilepic}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3 updateUsername">
              Update Username
              <Form.Control
                id="username"
                username={formData.username}
                onChange={handleChange}
                placeholder="John Doe"
              />
            </Form.Group>
            <Form.Group className="mb-3 updatePassword">
              Update Password
              <Form.Control
                type="password"
                id="password"
                password={formData.password}
                placeholder="Password..."
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              Update Genres
              <Form.Control
                type="text"
                id="genres"
                genres={formData.genres}
                onChange={handleChange}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="dark" onClick={handleClose}>
              Close
            </Button>
            <Button variant="dark" onClick={submitData} type="button">
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}
export default UpdateProfileModal;
