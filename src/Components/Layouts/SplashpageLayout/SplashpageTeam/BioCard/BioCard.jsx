import React from "react";
import { MdCode } from "react-icons/md";
import { BsLinkedin } from "react-icons/bs";
import { RiProfileLine, RiGithubFill } from "react-icons/ri";
import "./BioCard.css";
import { BIO_TEXT } from "./BioCardText";
import mikeHeadshot from "./mikephoto1.jpg";

export default function BioCard(props) {
  return (
    <>
      <div className={"bio-card__container"}>
        <div>
          <h1 className="bio-card__bio-name">
            {props.currentBio.first_name} {props.currentBio.last_name}
          </h1>
          <h3 className="bio-card__bio-title">{props.currentBio.title}</h3>
        </div>
        <div className={"bio-card__bio-content"}>
          <div className={"bio-card__text-frame"}>
            <div className={"bio-card__text"}>{BIO_TEXT}</div>
            <div className={"bio-card__icon-links"}>
              <a
                href={props.currentBio.personal_site}
                rel="noreferrer noopener"
                target="_blank"
              >
                <MdCode />
              </a>
              <a
                href={props.currentBio.linkedin}
                rel="noreferrer noopener"
                target="_blank"
              >
                <BsLinkedin />
              </a>
              <a
                href="https://www.google.com"
                rel="noreferrer noopener"
                target="_blank"
              >
                <RiProfileLine />
              </a>
              <a
                href={props.currentBio.github}
                rel="noreferrer noopener"
                target="_blank"
              >
                <RiGithubFill />
              </a>
            </div>
          </div>
          <div className={"bio-card__headshot-frame"}>
            <img
              src={mikeHeadshot}
              alt="Mike McFaddin Headshot"
              className="bio-card__headshot-image"
            />
          </div>
        </div>
      </div>
    </>
  );
}
