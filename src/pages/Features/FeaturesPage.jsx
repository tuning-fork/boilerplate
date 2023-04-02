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
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu
            odio ut sem nulla pharetra diam sit amet. Massa ultricies mi quis
            hendrerit. Condimentum id venenatis a condimentum. Eget velit
            aliquet sagittis id. Egestas egestas fringilla phasellus faucibus
            scelerisque. Scelerisque in dictum non consectetur a. Tellus cras
            adipiscing enim eu. Vel turpis nunc eget lorem dolor sed viverra.
            Pharetra et ultrices neque ornare aenean euismod elementum nisi.
            Nisi quis eleifend quam adipiscing vitae proin sagittis. Nulla
            malesuada pellentesque elit eget gravida cum sociis. Tortor at
            auctor urna nunc id cursus. Metus dictum at tempor commodo
            ullamcorper a lacus vestibulum. Aenean pharetra magna ac placerat
            vestibulum lectus mauris. Vitae justo eget magna fermentum. Id porta
            nibh venenatis cras. Lorem ipsum dolor sit amet consectetur. Duis
            convallis convallis tellus id. Pulvinar proin gravida hendrerit
            lectus a. Velit egestas dui id ornare arcu odio ut. Sed faucibus
            turpis in eu mi bibendum neque. Massa placerat duis ultricies lacus
            sed turpis tincidunt id aliquet. Quam adipiscing vitae proin
            sagittis nisl. At erat pellentesque adipiscing commodo elit at
            imperdiet dui. Molestie nunc non blandit massa. Sapien pellentesque
            habitant morbi tristique. Leo integer malesuada nunc vel risus.
            Massa massa ultricies mi quis hendrerit dolor magna. Urna
            condimentum mattis pellentesque id nibh tortor id aliquet lectus.
            Tortor condimentum lacinia quis vel eros donec.
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
