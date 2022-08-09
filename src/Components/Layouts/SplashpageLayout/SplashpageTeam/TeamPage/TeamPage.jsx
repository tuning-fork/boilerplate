import React from "react";
import BioFrame from "../BioFrame/BioFrame.jsx";
import BioCard from "../BioCard/BioCard.jsx";
import "./TeamPage.css";

export default function TeamPage(props) {
  return (
    <div className="team-page__content">
      {Object.values(props.currentBio).length > 0 ? (
        <>
          <BioCard currentBio={props.currentBio} />
        </>
      ) : (
        <>
          <div className="team-page__text">
            <h1 className="team-page__header">Our Team</h1>
            <div className="team-page__intro-text">
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
              vestibulum lectus mauris. Vitae justo eget magna fermentum. Id
              porta nibh venenatis cras. Lorem ipsum dolor sit amet consectetur.
              Duis convallis convallis tellus id. Pulvinar proin gravida
              hendrerit lectus a. Velit egestas dui id ornare arcu odio ut. Sed
              faucibus turpis in eu mi bibendum neque. Massa placerat duis
              ultricies lacus sed turpis tincidunt id aliquet. Quam adipiscing
              vitae proin sagittis nisl. At erat pellentesque adipiscing commodo
              elit at imperdiet dui. Molestie nunc non blandit massa. Sapien
              pellentesque habitant morbi tristique. Leo integer malesuada nunc
              vel risus. Massa massa ultricies mi quis hendrerit dolor magna.
              Urna condimentum mattis pellentesque id nibh tortor id aliquet
              lectus. Tortor condimentum lacinia quis vel eros donec. Id cursus
              metus aliquam eleifend mi in nulla posuere sollicitudin. Neque
              laoreet suspendisse interdum consectetur libero id faucibus nisl.
              Ipsum a arcu cursus vitae congue mauris rhoncus. Id neque aliquam
              vestibulum morbi. Ut lectus arcu bibendum at varius vel pharetra
              vel. Sed felis eget velit aliquet sagittis id consectetur. Nulla
              facilisi etiam dignissim diam quis. Et malesuada fames ac turpis
              egestas maecenas pharetra convallis. Dignissim diam quis enim
              lobortis. Faucibus scelerisque eleifend donec pretium vulputate.
              Egestas sed sed risus pretium quam. Vel elit scelerisque mauris
              pellentesque. Sed euismod nisi porta lorem mollis aliquam ut
              porttitor.
            </div>
          </div>
          <div>
            <BioFrame setCurrentBio={props.setCurrentBio} />
          </div>
        </>
      )}
    </div>
  );
}
