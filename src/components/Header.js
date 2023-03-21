import { signOut } from "firebase/auth";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { auth } from "../firebase/firebase-configuration";
import { setUser } from "../redux/user/userSlice";

export const Header = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);

  const handleOnLogout = () => {
    signOut(auth)
      .then(() => {
        dispatch(setUser({}));
      })
      .catch((error) => toast.error(error.message));
  };
  return (
    <Navbar bg="info" expand="md">
      <Container>
        <Navbar.Brand href="#home">Finance Tracker</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <div>Welcome back {userInfo?.displayName}</div>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {!userInfo?.uid ? (
              <>
                <Link to="/" className="nav-link">
                  Login
                </Link>
                <Link to="/register" className="nav-link">
                  Sign Up
                </Link>
              </>
            ) : (
              <Link to="/" className="nav-link" onClick={handleOnLogout}>
                Log Out
              </Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
