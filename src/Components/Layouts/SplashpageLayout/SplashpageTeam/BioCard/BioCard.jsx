import React from "react";
import { MdCode } from "react-icons/md";
import { BsLinkedin } from "react-icons/bs";
import { RiGithubFill } from "react-icons/ri";
import { ReactComponent as Fire } from "./bigfire.svg";
import randomElement from "../../../../../Helpers/array/randomElement";
import "./BioCard.css";

const COLORS = [
  "var(--primary)",
  "var(--primary-text)",
  "var(--secondary)",
  "var(--secondary-text)",
  "var(--tertiary-light)",
  "var(--tertiary-dark)",
];

export default function BioCard(props) {
  const color = randomElement(COLORS, props.currentBio.id);

  return (
    <div className={"bio-card__container"}>
      <div className={"bio-card__bio-content"}>
        <h1 className="bio-card__bio-name">
          {props.currentBio.first_name} {props.currentBio.last_name}
        </h1>
        <div className="bio-card__info">
          <h3 className="bio-card__bio-title">{props.currentBio.title}</h3>
          {props.currentBio.personal_site && (
            <a
              href={props.currentBio.personal_site}
              rel="noreferrer noopener"
              target="_blank"
            >
              <MdCode />
            </a>
          )}
          {props.currentBio.linkedin && (
            <a
              href={props.currentBio.linkedin}
              rel="noreferrer noopener"
              target="_blank"
            >
              <BsLinkedin />
            </a>
          )}
          {props.currentBio.github && (
            <a
              href={props.currentBio.github}
              rel="noreferrer noopener"
              target="_blank"
            >
              <RiGithubFill />
            </a>
          )}
        </div>
        <div className={"bio-card__text-frame"}>
          <div
            className={"bio-card__text"}
            dangerouslySetInnerHTML={{ __html: props.currentBio.bio_text }}
          ></div>
        </div>
      </div>
      <div className={"bio-card__headshot-frame"}>
        <img
          src={props.currentBio.headshot_url}
          alt={props.currentBio.headshot_alt}
          className="bio-card__headshot-image"
        />
      </div>
      <Fire style={{ color }} />
    </div>
  );
}
