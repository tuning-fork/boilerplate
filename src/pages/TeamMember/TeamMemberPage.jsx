import React from "react";
import { useParams } from "react-router-dom";
import BioCard from "../../Components/Layouts/SplashpageLayout/SplashpageTeam/BioCard/BioCard";
import { TEAM_BIOS } from "../../config/TeamBios";
import NavbarSplashpage from "../../Components/design/Navbar/NavbarSplashpage/NavbarSplashpage";
import Footer from "../../Components/design/Footer/Footer";
import "./TeamMemberPage.css";

export default function TeamMemberPage() {
  const { memberId } = useParams();
  const member = TEAM_BIOS.find((bio) => bio.id === memberId);

  return (
    <div className="team-member-page">
      <NavbarSplashpage />
      <main className="team-member-page__content">
        <BioCard currentBio={member} />
      </main>
      <Footer />
    </div>
  );
}
