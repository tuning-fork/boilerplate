import React, { useState } from "react";
import NavbarSplashpage from "../../../Components/design/Navbar/NavbarSplashpage/NavbarSplashpage";
import "./SplashPageLayout.css";
import splashpageBackgroundImage from "./Splashpage_Background_Image.png";
import Button from "../../../Components/design/Button/Button";
import Modal from "../../../Components/design/Modal/Modal";
import Card from "react-bootstrap/Card";
import SignUp from "./SignUp/SignUp";
import Login from "../../../Components/Login/Login";
import ForgotPassword from "../../../components/ForgotPassword/ForgotPassword";

export default function SplashPageLayout() {
  const [showSplashPageModal, setShowSplashPageModal] = useState(false);

  const [modalLabel, setModalLabel] = useState("Loading");
  const [modalContents, setModalContents] = useState(<></>);

  const handleCloseSplashPageModal = () => setShowSplashPageModal(false);

  const handleSwitchSplashPageModal = (modalLabelInput) => {
    console.log("handleSwitchSplashPageModal", modalLabelInput);
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
              onSubmit={handleCloseSplashPageModal}
              onCancel={handleCloseSplashPageModal}
              toggleModalContents={handleSwitchSplashPageModal}
            />
          </Card.Body>
        </Card>
      );
    }
    setShowSplashPageModal(true);
  };

  return (
    <main className="splashpage-layout">
      <div className="splashpage-layout__navbar-container">
        <NavbarSplashpage toggleModalContents={handleSwitchSplashPageModal} />
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
