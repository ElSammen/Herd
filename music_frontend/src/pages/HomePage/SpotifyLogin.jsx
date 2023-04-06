import React from "react";
import { Container } from "react-bootstrap";
const AUTH_URL =
"https://accounts.spotify.com/authorize?client_id=c57767f293cb4f48a7d274d7d984f60c&response_type=code&redirect_uri=http://https://herd-frontend.onrender.com/home&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state%20playlist-modify-public%20playlist-modify-private"
export default function Login() {
  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <a className="btn btn-success btn-lg" href={AUTH_URL}>
        Login With Spotify
      </a>
    </Container>
  )
}
