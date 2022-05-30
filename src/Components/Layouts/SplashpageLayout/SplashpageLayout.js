import React, { useState } from "react";
import NavbarSplashpage from "../../design/Navbar/NavbarSplashpage/NavbarSplashpage";
import "./SplashpageLayout.css";
import splashpageBackgroundImage from "./splashpage_background_image6.png";
import Button from "../../design/Button/Button";
import Modal from "../../design/Modal/Modal";
import Panel from "../../design/Panel/Panel";
import Card from "react-bootstrap/Card";
import SignUp from "../../SignUp/SignUp";
import Login from "../../Login/Login";
import ForgotPassword from "../../Login/ForgotPassword/ForgotPassword";

export default function SplashpageLayout() {
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

  //panel state hooks and panel close/show handler
  const [showSplashPagePanel, setShowSplashPagePanel] = useState(false);

  const [panelLabel, setPanelLabel] = useState("Loading");
  const [panelContents, setPanelContents] = useState(<></>);

  const handleCloseSplashPagePanel = () => setShowSplashPagePanel(false);

  const handleSwitchSplashPagePanel = (panelLabelInput) => {
    console.log("handleSwitchSplashPagePanel", panelLabelInput);
    setModalLabel(panelLabelInput);
    if (panelLabelInput === "Our Team") {
      setPanelContents(
        <Card>
          <Card.Body>
            <SignUp
              onCancel={handleCloseSplashPagePanel}
              togglePanelContents={handleSwitchSplashPagePanel}
            />
          </Card.Body>
        </Card>
      );
      setShowSplashPagePanel(true);
    } else if (panelLabelInput === "Try It Out") {
      setPanelContents(
        <Card>
          <Card.Body>
            <Login
              onSubmit={handleCloseSplashPagePanel}
              onCancel={handleCloseSplashPagePanel}
              togglePanelContents={handleSwitchSplashPagePanel}
              formType="standard"
            />
          </Card.Body>
        </Card>
      );
    } else if (panelLabelInput === "Contact") {
      setPanelContents(<div>Contact Us</div>);
    }
    setShowSplashPagePanel(true);
  };

  return (
    <main className="splashpage-layout">
      <div className="splashpage-layout__navbar-container">
        <NavbarSplashpage
          toggleModalContents={handleSwitchSplashPageModal}
          togglePanelContents={handleSwitchSplashPagePanel}
        />
      </div>
      <div className="splashpage-layout__content">
        <img
          src={splashpageBackgroundImage}
          alt="Splashpage graphics"
          className="splashpage-layout__background-image"
        />
        <Modal
          hide={handleCloseSplashPageModal}
          show={showSplashPageModal}
          heading={modalLabel}
          splashpageForm={true}
        >
          {modalContents}
        </Modal>
        <Panel
          hide={handleCloseSplashPagePanel}
          show={showSplashPagePanel}
          heading={panelLabel}
          splashpageForm={true}
        >
          {panelContents}
        </Panel>
      </div>
    </main>
  );
}
