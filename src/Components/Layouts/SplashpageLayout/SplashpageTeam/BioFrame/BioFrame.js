import React, { useState } from "react";
import { TEAM_BIOS } from "../TeamPage/TeamBios";
import BioCard from "../BioCard/BioCard";
import "./BioFrame.css";
import Frame from "../../../../design/Frame/Frame";

export default function BioFrame() {
  return (
    <div className="bio-frame__container">
      {TEAM_BIOS.map((bio) => {
        return (
          <>
            <div className="bio-frame__card">
              <div>
                {bio.first_name} {bio.last_name}
              </div>
            </div>
            ;
          </>
        );
      })}

      {/* <BioCard /> */}
    </div>
  );
}

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
