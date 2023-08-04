import React from "react";
import { Link } from "react-router-dom";
import Footer from "../../Components/design/Footer/Footer";
import NavbarSplashpage from "../../Components/design/Navbar/NavbarSplashpage/NavbarSplashpage";
import BioPortraitCard from "./BioPortrait/BioPortrait";
import { TEAM_BIOS } from "../../config/teamBios";
import "./TeamPage.css";

export default function TeamPage() {
  return (
    <div className="team-page">
      <NavbarSplashpage />
      <main className="team-page__content">
        <section className="team-page__text">
          <h1 className="team-page__header">Our Team</h1>
          {/* <p>
            Boilerplate is created and maintained by a team of developers and
            designers who share a commitment to creating applications that
            promote accessibility and connection. Our dev team are all bootcamp
            graduates. We bring diverse experience to our work as software
            engineers, and 
          </p> */}
        </section>
        <section className="bio-frame">
          {TEAM_BIOS.map((bio) => (
            <Link key={bio.id} to={`/team/${bio.id}`}>
              <BioPortraitCard bio={bio} />
            </Link>
          ))}
        </section>
      </main>
      <Footer />
    </div>
  );
}
