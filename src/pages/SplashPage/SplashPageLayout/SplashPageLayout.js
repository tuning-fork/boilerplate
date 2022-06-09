import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import NavbarSplashPage from "../../../components/design/Navbar/NavbarSplashPage/NavbarSplashPage";
import SplashPageBackgroundImage from "./SplashPage_Background_Image.png";
import Button from "../../../components/design/Button/Button";
import Modal from "../../../components/design/Modal/Modal";
import SignUp from "./SignUp/SignUp";
import Login from "../../../components/Login/Login";
import ForgotPassword from "../../../components/ForgotPassword/ForgotPassword";
import "./SplashPageLayout.css";

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
    <main className="SplashPage-layout">
      <div className="SplashPage-layout__navbar-container">
        <NavbarSplashPage toggleModalContents={handleSwitchSplashPageModal} />
      </div>
      <div className="SplashPage-layout__content">
        <img
          src={SplashPageBackgroundImage}
          alt="SplashPage graphics"
          className="SplashPage-layout__background-image"
        />
        <Button
          className="SplashPage-layout__sign-up-button"
          variant="none"
          onClick={() => handleSwitchSplashPageModal("Sign Up")}
        ></Button>
        <Button
          className="SplashPage-layout__login-button"
          variant="none"
          onClick={() => handleSwitchSplashPageModal("Log In")}
        ></Button>
        <Modal
          hide={handleCloseSplashPageModal}
          show={showSplashPageModal}
          heading={modalLabel}
          SplashPageForm={true}
        >
          {modalContents}
        </Modal>
      </div>
    </main>
  );
}
