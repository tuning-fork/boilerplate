import React from "react";
import "./BioPortrait.css";

export default function BioPortrait(props) {
  const { bio } = props;

  return (
    <article className="bio-portrait">
      <img
        src={bio.headshot_url}
        alt={bio.headshot_alt}
        className="bio-portrait__headshot"
      />
      <h3>
        {bio.first_name} {bio.last_name}
      </h3>
      <p>{bio.title}</p>
    </article>
  );
}
