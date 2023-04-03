import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ProfileApiCalls from '../Api/ProfileApiCalls';
import 'bootstrap/dist/css/bootstrap.css';
import { QueryClient, useMutation } from '@tanstack/react-query';
import "primereact/resources/primereact.min.css";
import './Autocomplete.css'

const profileApi = new ProfileApiCalls();
const queryClient = new QueryClient()

function UpdateProfileModal(props) {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    profilepic: props.profile.profilepic,
    username: props.profile.username
  });


  const [filteredGenres, setFilteredGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);

  const { mutate, isLoading } = useMutation((data) => profileApi.updateProfile(data), {
    onSuccess: (profileData) => {
      console.log(profileData);
    },
    onError: (error) => {
      console.log("Something went wrong: ", error);
    },
    onSettled: () => {
      handleClose();
    },
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

  const handleSelect = (event) => {
    const selectedGenre = event.value;  // Get the selected genre from the event object
    setSelectedGenres([...selectedGenres, selectedGenre]);  // Add it to the array of selected genres
    event.query = '';  // Clear the input value after a selection is made
  };


  const submitData = async (event) => {
    event.preventDefault();
    try {
      const updatedData = {
        ...formData,
        // Remove the `genres` field from the form data
        // and don't include it in the data sent to the backend
      };
      const profileData = await profileApi.updateProfile(updatedData);
      console.log(profileData);
      mutate(formData);
      console.log(formData);
    } catch (error) {
      console.log("Something went wrong: ", error);
    }
    handleClose();
  };



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
            <Form.Group className="mb-3 updatePic" >
              Update Profile Picture
              <Form.Control
                type="text"
                id="profilepic"
                profilepic="profilepic"
                value={formData.profilepic}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3 updateUsername" >
              Update Username
              <Form.Control
                id="username"
                username={formData.username}
                onChange={handleChange}
                placeholder="John Doe" />
            </Form.Group>
            {/* <Form.Group>
              Update Genres
              <AutoComplete
                id="genres"
                className='form-control mb-3'
                multiple
                value={selectedGenres}
                suggestions={filteredGenres}
                completeMethod={searchGenres}
                onChange={handleChange}
                onSelect={handleSelect}
              />
            </Form.Group> */}
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