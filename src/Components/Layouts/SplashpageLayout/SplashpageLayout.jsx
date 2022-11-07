import React, { useState, useEffect } from "react";
import NavbarSplashpage from "../../design/Navbar/NavbarSplashpage/NavbarSplashpage";
import "./SplashpageLayout.css";
import splashpageBackgroundImage from "./splashpage_background_image7.png";
import Modal from "../../design/Modal/Modal";
import Panel from "../../design/Panel/Panel";
import SignUp from "../../SignUp/SignUp";
import Login from "../../Login/Login";
import ForgotPassword from "../../Login/ForgotPassword/ForgotPassword";
import SplashpageContactForm from "./SplashpageContact/SplashpageContactForm";
import TeamPage from "./SplashpageTeam/TeamPage/TeamPage.jsx";
import FeaturePage from "./SplashpageFeatures/FeaturePage";
import Footer from "../../design/Footer/Footer";
import clsx from "clsx";

export default function SplashpageLayout() {
  const [showSplashPageModal, setShowSplashPageModal] = useState(false);
  const [currentBio, setCurrentBio] = useState({});

  const [modalLabel, setModalLabel] = useState("Loading");
  const [modalContents, setModalContents] = useState(<></>);
  const [panelView, setPanelView] = useState("");
  const [scrollbarWidth, setScrollbarWidth] = useState(15);

  useEffect(() => {
    const currentWidth = calculateScrollbarWidth();
    if (!panelView && currentWidth > 0) {
      setScrollbarWidth(calculateScrollbarWidth());
    }
  }, [panelView]);

  const calculateScrollbarWidth = () =>
    window.innerWidth - document.documentElement.offsetWidth;

  const handleCloseSplashPageModal = () => setShowSplashPageModal(false);
  const handleSwitchSplashPageModal = (modalLabelInput) => {
    setModalLabel(modalLabelInput);
    if (modalLabelInput === "Sign Up") {
      setModalContents(
        <div>
          <div>
            <SignUp
              onCancel={handleCloseSplashPageModal}
              toggleModalContents={handleSwitchSplashPageModal}
            />
          </div>
        </div>
      );
      setShowSplashPageModal(true);
    } else if (modalLabelInput === "Log In") {
      setModalContents(
        <div>
          <div>
            <Login
              onSubmit={handleCloseSplashPageModal}
              onCancel={handleCloseSplashPageModal}
              toggleModalContents={handleSwitchSplashPageModal}
              formType="standard"
            />
          </div>
        </div>
      );
    } else if (modalLabelInput === "Forgot Password") {
      setModalContents(
        <div>
          <div>
            <ForgotPassword
              onSubmit={handleCloseSplashPageModal}
              onCancel={handleCloseSplashPageModal}
              toggleModalContents={handleSwitchSplashPageModal}
            />
          </div>
        </div>
      );
    }
    setShowSplashPageModal(true);
  };

  const handleSwitchSplashPagePanel = () => {
    if (panelView === "Our Team") {
      return (
        <Panel
          hide={() => setPanelView("")}
          show={true}
          currentBio={currentBio}
          setCurrentBio={setCurrentBio}
        >
          <TeamPage currentBio={currentBio} setCurrentBio={setCurrentBio} />
        </Panel>
      );
    } else if (panelView === "Features") {
      return (
        <Panel
          hide={() => {
            setPanelView("");
          }}
          show={true}
        >
          <FeaturePage />
        </Panel>
      );
    } else if (panelView === "Contact") {
      return (
        <Panel hide={() => setPanelView("")} show={true}>
          <SplashpageContactForm setPanelView={setPanelView} />
        </Panel>
      );
    }
  };

  return (
    <div>
      <div
        className={clsx(
          "splashpage-layout__navbar-container",
          panelView &&
            `splashpage-layout__scrollbar_padding_${scrollbarWidth.toString()}`
        )}
      >
        <NavbarSplashpage
          toggleModalContents={handleSwitchSplashPageModal}
          togglePanelContents={setPanelView}
        />
      </div>
      <main
        className={clsx(
          "splashpage-layout",
          panelView && "splashpage-layout__noscroll"
        )}
      >
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
          {handleSwitchSplashPagePanel()}
        </div>
        <Footer />
      </main>
    </div>
  );
}
