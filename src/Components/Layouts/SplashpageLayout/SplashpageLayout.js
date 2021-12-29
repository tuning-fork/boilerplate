import React, { useState } from "react";
import NavbarSplashpage from "../../design/Navbar/NavbarSplashpage/NavbarSplashpage";
import "./SplashpageLayout.css";
import allSplashpageGraphicElements from "./All_splashpage_graphic_elements.png";
import NavbarLogin from "../../design/Navbar/NavbarLogin/NavbarLogin";
import Button from "../../design/Button/Button";
import Modal from "../../design/Modal/Modal";
import Card from "react-bootstrap/Card";
import SignUp from "../../SignUp/SignUp";
import Login from "../../Login/Login";

export default function SplashpageLayout(props) {
  const [showNavbarLogin, setShowNavbarLogin] = useState(false);

  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const handleShowSignUpModal = () => setShowSignUpModal(true);
  const handleCloseSignUpModal = () => setShowSignUpModal(false);
  const handleShowLoginModal = () => setShowLoginModal(true);
  const handleCloseLoginModal = () => setShowLoginModal(false);
  // const handleCancel = (event) => {
  //   handleCloseSignUpModal();
  //   handleCloseLoginModal();
  // };

  const handleSignup = () => {
    setShowSignUpModal(false);
    setShowLoginModal(true);
  };

  return (
    <main className="splashpage-layout">
      <NavbarSplashpage />
      <div className="splashpage-layout__content">
        {props.children}
        <img
          src={allSplashpageGraphicElements}
          alt="Splashpage graphics"
          className="splashpage-layout__graphic-elements"
        />
        <Button
          style={{
            border: "solid 10px red",
            zIndex: 1,
            position: "absolute",
            top: "79.2%",
            left: "16.5%",
            width: "22%",
            height: "6%",
          }}
          variant="none"
          onClick={handleShowSignUpModal}
        ></Button>
        <Button
          style={{
            border: "solid 10px blue",
            zIndex: 1,
            position: "absolute",
            top: "85%",
            left: "16.5%",
            width: "22%",
            height: "6%",
          }}
          variant="none"
          onClick={handleShowLoginModal}
        ></Button>
        <Modal
          // className="modal-popup"
          // onClose={handleCloseSignUpModal}
          show={showSignUpModal}
          heading="Welcome To Boilerplate!"
        >
          <Card>
            <Card.Body>
              <SignUp
                onSubmit={handleSignup}
                onCancel={handleCloseSignUpModal}
              />
            </Card.Body>
          </Card>
        </Modal>
        <Modal
          // className="modal-popup"
          // onCancel={handleCloseLoginModal}
          show={showLoginModal}
          heading="Sign In"
        >
          <Card>
            <Card.Body>
              <Login
                onSubmit={handleCloseLoginModal}
                onCancel={handleCloseLoginModal}
              />
            </Card.Body>
          </Card>
        </Modal>
        {showNavbarLogin ? <NavbarLogin /> : null}
      </div>
    </main>
  );
}
