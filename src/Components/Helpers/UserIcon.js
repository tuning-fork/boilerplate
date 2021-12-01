import React from "react";
import { Rng } from "../../Helpers/Rng";
import "./UserIcon.css";

const BACKGROUND_COLORS = ["#DF0B92", "#097FAA", "#AD6200", "#084391"];
const randomBackgroundColor = (string) => {
  const seed = string
    .split("")
    .reduce((seed, char) => seed + char.charCodeAt(0), 0);
  const rng = new Rng(seed);
  const backgroundColor = rng.choice(BACKGROUND_COLORS);

  return backgroundColor;
};

export default function UserIcon(props) {
  const { firstName, lastName } = props;
  const backgroundColor = randomBackgroundColor(firstName + lastName);

  return (
    <div className="user-icon" aria-hidden="true" style={{ backgroundColor }}>
      {firstName[0] + lastName[0]}
    </div>
  );
}
