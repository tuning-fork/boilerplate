import React from "react";
// import { MdCode } from "react-icons/md";
// import { BsLinkedin } from "react-icons/bs";
// import { RiProfileLine, RiGithubFill } from "react-icons/ri";
import "./BioCard.css";
import { BIO_TEXT } from "./BioCardText";
import mikeHeadshot from "./mikephoto1.jpg";

export default function BioCard() {
  return (
    <>
      <div className={"bio-card__container"}>
        <div className={"bio-card__bio-content"}>
          <div className={"bio-card__text-frame"}>{BIO_TEXT}</div>
          <div className={"bio-card__headshot-frame"}>
            <img
              src={mikeHeadshot}
              alt="Mike McFaddin Headshot"
              class="bio-card__headshot-image"
            />
          </div>
        </div>
      </div>
    </>
  );
}
