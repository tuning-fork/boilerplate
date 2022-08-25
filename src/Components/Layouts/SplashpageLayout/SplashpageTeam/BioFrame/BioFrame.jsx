import React from "react";
import { TEAM_BIOS } from "../TeamPage/TeamBios";
import "./BioFrame.css";
import mikeHeadshot from "../BioCard/mikephoto1.jpg";
import { MdCode } from "react-icons/md";
import { BsLinkedin } from "react-icons/bs";
import { RiGithubFill } from "react-icons/ri";

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
                {bio.personal_site && (
                  <a
                    href={bio.personal_site}
                    rel="noreferrer noopener"
                    target="_blank"
                  >
                    <MdCode />
                  </a>
                )}
                {bio.linkedin && (
                  <a
                    href={bio.linkedin}
                    rel="noreferrer noopener"
                    target="_blank"
                  >
                    <BsLinkedin />
                  </a>
                )}
                {bio.github && (
                  <a
                    href={bio.github}
                    rel="noreferrer noopener"
                    target="_blank"
                  >
                    <RiGithubFill />
                  </a>
                )}
              </div>
            </div>
          </>
        );
      })}
    </div>
  );
}
