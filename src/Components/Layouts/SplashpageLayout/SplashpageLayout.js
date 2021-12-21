import React, { useState, useRef, useLayoutEffect } from "react";
import NavbarSplashpage from "../../design/Navbar/NavbarSplashpage/NavbarSplashpage";
import "./SplashpageLayout.css";
// import allSplashpageGraphicElements from "./allSplashpageGraphicElements.png";
import allSplashpageGraphicElements from "./All_splashpage_graphic_elements.png";
import getStartedButton from "./getStartedButton.png";
import NavbarLogin from "../../design/Navbar/NavbarLogin/NavbarLogin";
import Button from "../../design/Button/Button";

export default function SplashpageLayout(props) {
  const [showNavbarLogin, setShowNavbarLogin] = useState(false);

  const [divHeight, setDivHeight] = useState(0);
  const [divWidth, setDivWidth] = useState(0);
  const ref = useRef(null);

  useLayoutEffect(() => {
    const updateSize = () => {
      setDivWidth(ref.current.getBoundingClientRect().width);
      setDivHeight(ref.current.getBoundingClientRect().height);
    };
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  console.log("divHeight", divHeight);
  console.log("divWidth", divWidth);

  return (
    <main className="splashpage-layout">
      <NavbarSplashpage />
      <div className="splashpage-layout__content">
        {props.children}
        <img
          ref={ref}
          src={allSplashpageGraphicElements}
          alt="Splashpage graphics"
          className="splashpage-layout__graphic-elements"
          usemap="#mapname"
        />
        {/* <div
          style={{
            display: "flex",
            alignContent: "center",
            justifyContent: "center",
          }}
        > */}
        <Button
          r
          style={{
            border: "solid 10px red",
            zIndex: 1,
            position: "absolute",
            top: "1200px",
            // bottom: 0,
            left: "160px",
            // right: 0,
            // maxWidth: "20%",
            width: "225px",
            height: "75px",
          }}
          variant="none"
        >
          {/* <img
            src={getStartedButton}
            alt="Get started graphic button"
            style={{ border: "solid 5px blue" }}
          /> */}
        </Button>
        {/* </div> */}

        <map name="mapname">
          <area
            shape="rect"
            coords="500,500,600,600"
            href=""
            alt=""
            // style={{ border: "10px red", backgroundColor: "red" }}
          />
        </map>
        {/* <div className="splashpage-layout__bottom-buttons">
          <Button className="splashpage-layout__fancy-button" variant="none">
            <img src={getStartedButton} alt="Get started graphic button" />
          </Button>
          <Button variant="none">or Sign In</Button>
        </div> */}
        {showNavbarLogin ? <NavbarLogin /> : null}
      </div>
    </main>
  );
}
