import React from "react";
import { TEAM_BIOS } from "../TeamPage/TeamBios";
// import BioCard from "../BioCard/BioCard";
import "./BioFrame.css";
// import Frame from "../../../../design/Frame/Frame";
import mikeHeadshot from "../BioCard/mikephoto1.jpg";
import { MdCode } from "react-icons/md";
import { BsLinkedin } from "react-icons/bs";
import { RiProfileLine, RiGithubFill } from "react-icons/ri";

export default function BioFrame(props) {
  return (
    <div className="bio-frame__container">
      {TEAM_BIOS.map((bio) => {
        return (
          <>
            <div
              className="bio-frame__card"
              onClick={() => props.setCurrentBio(bio)}
            >
              <div className={"bio-frame__headshot"}>
                <img
                  src={mikeHeadshot}
                  alt="Mike McFaddin Headshot"
                  className="bio-frame__headshot-image"
                />
              </div>
              <h3 className="bio-frame__header-text">
                {bio.first_name} {bio.last_name}
              </h3>
              <h5 className="bio-frame__header-text">{bio.title}</h5>
              <div className={"bio-frame__icon-links"}>
                <a
                  href="https://michael-mcfaddin.github.io/"
                  rel="noreferrer noopener"
                  target="_blank"
                >
                  <MdCode />
                </a>
                <a
                  href="https://www.linkedin.com/in/michael-mcfaddin/"
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
                  href="https://github.com/Michael-McFaddin"
                  rel="noreferrer noopener"
                  target="_blank"
                >
                  <RiGithubFill />
                </a>
              </div>
            </div>
          </>
        );
      })}
    </div>
  );
}

//thumbnail gallery view contains:
//first name and last name
//title
//headshot

//needs to contain:
//frame element - background pixelly image

//probably on bio table:
//bio first_name
//bio last_name
//bio title
//bio email
//bio text
//link to team member github
//link to team member linkedin
//link to team member website
//photo?

//top frame header: Our Team

//frames for each column:

//left column
//first_name last_name  <- header
//title
//text block
//links group buttons

//right column
//photo/headshot image

//list of bios
//Bios
//card1
//card2
//card3
//card4

//splashpage -> teamframe -> bioframe -> biocard
//splashpage -> teamframe -> backdrop design element thingie -> biocard
