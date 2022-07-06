import React from "react";
// import { MdCode } from "react-icons/md";
// import { BsLinkedin } from "react-icons/bs";
// import { RiProfileLine, RiGithubFill } from "react-icons/ri";
import "./BioCard.css";

export default function BioCard() {
  return (
    <>
      <div className={"bio-card_container"}>
        <div className={"bio-card__bio-content"}>
          <div className={"bio-card__text-frame"}>
            "“Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.”",
          </div>
          <div className={"bio-card__text-frame"}>Hello world!</div>
        </div>
      </div>
    </>
  );
}
