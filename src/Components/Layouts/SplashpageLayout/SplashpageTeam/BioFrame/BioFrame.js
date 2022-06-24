import React, { useState } from "react";
import { TEAM_BIOS } from "./TeamBios";
import { MdCode } from "react-icons/md";
import { BsLinkedin } from "react-icons/bs";
import { RiProfileLine, RiGithubFill } from "react-icons/ri";

export default function BioFrame() {
  return (
    <div>
      {TEAM_BIOS.map((team_bio) => {
        return (
          <>
            <div>{team_bio.first_name}</div>
            <div>{team_bio.last_name}</div>
            <div>{team_bio.title}</div>
            <div>{team_bio.bio_text}</div>
            <div>
              <a href="google.com">
                <RiProfileLine />
              </a>
              <a href="google.com">
                <MdCode />
              </a>
              <a href="linkedin.com">
                <BsLinkedin />
              </a>
              <a href="github.com">
                <RiGithubFill />
              </a>
            </div>
          </>
        );
      })}
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
