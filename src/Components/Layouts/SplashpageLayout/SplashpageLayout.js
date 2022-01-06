import React, { useState, useEffect } from "react";
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

  // const [showSignUpModal, setShowSignUpModal] = useState(false);
  // const [showLoginModal, setShowLoginModal] = useState(false);
  // const handleShowSignUpModal = () => setShowSignUpModal(true);

  // const handleCloseSignUpModal = () => setShowSignUpModal(false);
  // const handleShowLoginModal = () => setShowLoginModal(true);
  // const handleCloseLoginModal = () => setShowLoginModal(false);
  // const handleCancel = (event) => {
  //   handleCloseSignUpModal();
  //   handleCloseLoginModal();
  // };

  const [showSplashPageModal, setShowSplashPageModal] = useState(false);
  const [closeSplashPageModal, setCloseSplashPageModal] = useState(false);

  // const [showingSignUp, setShowingSignUp] = useState(false);
  // const [showingLogin, setShowingLogin] = useState(false);

  const [modalLabel, setModalLabel] = useState("banana");
  const [modalContents, setModalContents] = useState(<></>);

  // const handleShowSplashPageModal = (modalSetterString) => {
  //   if (modalSetterString === "signup") {
  //     setShowingLogin(false);
  //     setShowingSignUp(true);
  //   } else if (modalSetterString === "login") {
  //     setShowingSignUp(false);
  //     setShowingLogin(true);
  //   }
  //   setShowSplashPageModal(true);
  // };

  // useEffect(() => {
  //   console.log("useEffect ran");
  const handleSwitchSplashPageModal = (modalLabelInput) => {
    setModalLabel(modalLabelInput);
    if (modalLabelInput === "Welcome to Boilerplate!") {
      setModalContents(
        <Card>
          <Card.Body>
            <SignUp
              onSubmit={handleSignup}
              onCancel={handleCloseSplashPageModal}
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
  // handleSwitchSplashPageModal();
  // }, [modalLabel]);

  const handleCloseSplashPageModal = () => setShowSplashPageModal(false);

  const handleSignup = () => {
    setShowSignUpModal(false);
    setShowLoginModal(true);
  };

  // const whatGoesInsideTheModal = () => {
  //   if (showingSignUp) {
  //     return (
  //       <Card>
  //         <Card.Body>
  //           <SignUp
  //             onSubmit={handleSignup}
  //             onCancel={handleCloseSplashPageModal}
  //           />
  //         </Card.Body>
  //       </Card>
  //     );
  //   }
  //   if (showingLogin) {
  //     return (
  //       <Card>
  //         <Card.Body>
  //           <Login
  //             onSubmit={handleCloseSplashPageModal}
  //             onCancel={handleCloseSplashPageModal}
  //           />
  //         </Card.Body>
  //       </Card>
  //     );
  //   }
  // };

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
          onClick={() => handleSwitchSplashPageModal("Welcome to Boilerplate!")}
          // onClick={() => setModalLabel("Sign Up")}
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
          onClick={() => handleSwitchSplashPageModal("Log In")}
          // onClick={() => setModalLabel("Log In")}
        ></Button>
        {/* <Modal
          hide={handleCloseSignUpModal}
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
          hide={handleCloseLoginModal}
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
        </Modal> */}
        <Modal
          hide={handleCloseSplashPageModal}
          show={showSplashPageModal}
          heading={modalLabel}
          splashpageForm={true}
          // heading="Sign In"
        >
          {modalContents}
        </Modal>
        {showNavbarLogin ? <NavbarLogin /> : null}
      </div>
    </main>
  );
}
