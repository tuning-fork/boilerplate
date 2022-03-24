import React, { useState } from "react";
import NavbarSplashpage from "../../design/Navbar/NavbarSplashpage/NavbarSplashpage";
import "./SplashpageLayout.css";
import splashpageBackgroundImage from "./Splashpage_Background_Image.png";
import Button from "../../design/Button/Button";
import Modal from "../../design/Modal/Modal";
import Card from "react-bootstrap/Card";
import SignUp from "../../SignUp/SignUp";
import Login from "../../Login/Login";
import ForgotPassword from "../../Login/ForgotPassword/ForgotPassword";

export default function SplashpageLayout() {
  const [showSplashPageModal, setShowSplashPageModal] = useState(false);

  const [modalLabel, setModalLabel] = useState("Loading");
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
              toggleModalContents={handleSwitchSplashPageModal}
              formType="standard"
            />
          </Card.Body>
        </Card>
      );
    } else if (modalLabelInput === "Forgot Password") {
      setModalContents(
        <Card>
          <Card.Body>
            <ForgotPassword
            // onSubmit={handleCloseSplashPageModal}
            // onCancel={handleCloseSplashPageModal}
            // toggleModalContents={handleSwitchSplashPageModal}
            // formType="standard"
            />
          </Card.Body>
        </Card>
      );
    }
    setShowSplashPageModal(true);
  };

  const handleCloseSplashPageModal = () => setShowSplashPageModal(false);

  return (
    <main className="splashpage-layout">
      <div className="splashpage-layout__navbar-container">
        <NavbarSplashpage handleModal={handleSwitchSplashPageModal} />
      </div>
      <div className="splashpage-layout__content">
        <img
          src={splashpageBackgroundImage}
          alt="Splashpage graphics"
          className="splashpage-layout__background-image"
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
      </div>
    </main>
  );
}
