import React, { useState } from "react";
import NavbarSplashpage from "../../design/Navbar/NavbarSplashpage/NavbarSplashpage";
import "./SplashpageLayout.css";
import allSplashpageGraphicElements from "./Splashpage_Background_Image.png";
import NavbarLogin from "../../design/Navbar/NavbarLogin/NavbarLogin";
import Button from "../../design/Button/Button";
import Modal from "../../design/Modal/Modal";
import Card from "react-bootstrap/Card";
import SignUp from "../../SignUp/SignUp";
import Login from "../../Login/Login";

export default function SplashpageLayout(props) {
  const [showNavbarLogin, setShowNavbarLogin] = useState(false);

  const [showSplashPageModal, setShowSplashPageModal] = useState(false);
  const [closeSplashPageModal, setCloseSplashPageModal] = useState(false);

  const [modalLabel, setModalLabel] = useState("banana");
  const [modalContents, setModalContents] = useState(<></>);

  const handleSwitchSplashPageModal = (modalLabelInput) => {
    setModalLabel(modalLabelInput);
    if (modalLabelInput === "Sign Up") {
      setModalContents(
        <Card>
          <Card.Body>
            <SignUp
              onCancel={handleCloseSplashPageModal}
              toggleModalContents={handleSwitchSplashPageModal}
            />
          </Card.Body>
        </Card>
      );
      setShowSplashPageModal(true);
    } else if (modalLabelInput === "Log In") {
      setModalContents(
        <Card>
          <Card.Body>
            <Login
              onSubmit={handleCloseSplashPageModal}
              onCancel={handleCloseSplashPageModal}
            />
          </Card.Body>
        </Card>
      );
    }
    setShowSplashPageModal(true);
  };

  const handleCloseSplashPageModal = () => setShowSplashPageModal(false);

  const handleSignup = () => {
    setShowSignUpModal(false);
    setShowLoginModal(true);
  };

  return (
    <main className="splashpage-layout">
      <div className="splashpage-layout__navbar-container">
        <NavbarSplashpage />
      </div>
      <div className="splashpage-layout__content">
        {props.children}
        <img
          src={allSplashpageGraphicElements}
          alt="Splashpage graphics"
          className="splashpage-layout__graphic-elements"
        />
        <Button
          className="splashpage-layout__sign-up-button"
          variant="none"
          onClick={() => handleSwitchSplashPageModal("Sign Up")}
        ></Button>
        <Button
          className="splashpage-layout__login-button"
          variant="none"
          onClick={() => handleSwitchSplashPageModal("Log In")}
        ></Button>
        <Modal
          hide={handleCloseSplashPageModal}
          show={showSplashPageModal}
          heading={modalLabel}
          splashpageForm={true}
        >
          {modalContents}
        </Modal>
        {showNavbarLogin ? <NavbarLogin /> : null}
      </div>
    </main>
  );
}
