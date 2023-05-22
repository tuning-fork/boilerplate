import React from "react";
import Footer from "../../Components/design/Footer/Footer";
import NavbarSplashpage from "../../Components/design/Navbar/NavbarSplashpage/NavbarSplashpage";
import FeatureCard from "./FeatureCard/FeatureCard";
import { FEATURE_SUMMARIES } from "../../config/featureSummaries";
import "./FeaturesPage.css";

export default function FeaturesPage() {
  return (
    <div className="features-page">
      <NavbarSplashpage />
      <main className="features-page__content">
        <section className="features-page__header">
          <h1>Features</h1>
          <p>
            Boilerplate was developed to help nonprofits access support and
            resources. Grant applications are the core of nonprofit fundraising,
            and a high priority for nonprofits seeking to establish funding
            streams. Smaller nonprofits often lack the resources to support
            dedicated grant development efforts. As a result, smaller nonprofits
            lose out on funding opportunities. They apply for fewer grants. They
            have fewer opportunities to advocate for their work and build
            long-term relationships with funding institutions. Boilerplate is
            designed to facilitate grant writing for smaller nonprofits. Our app
            provides users with an accessible content management system for
            organizing grant materials. Users can create a custom library of
            content, and then quickly pull together draft grants. Grants are
            saved so that they can be easily referenced, updated, and reused.
            Our app also promotes strategic optimization over time. Grants are
            tracked throughout the application process so that users can
            identify the best application strategies for their organization.
          </p>
        </section>
        <ul className="features-page__list">
          {FEATURE_SUMMARIES.map((feature) => (
            <li key={feature.name}>
              <FeatureCard feature={feature} />
            </li>
          ))}
        </ul>
      </main>
      <Footer />
    </div>
  );
}
