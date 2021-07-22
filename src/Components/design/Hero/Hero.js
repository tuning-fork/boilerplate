import React from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import clsx from "clsx";
import Button from "../Button/Button";
import "./Hero.css";

export default function Hero(props) {
  return (
    <div className={clsx(props.className, "hero")}>
      <div className="hero__breadcrumb">{props.breadCrumb}</div>
      <div className="hero__header">{props.headerText}</div>
      <Button className="hero_edit-button">Edit</Button>
      {props.heroObject &&
        props.heroObject.map((category) => {
          {
            /* category != "deadline"  */
          }
          return (
            <div>
              <div className="hero__label">{props.headerLabel}</div>
              <div className="hero__display">{props.headerDisplay}</div>
            </div>
          );
        })}
      <div className="hero_deadline-display">
        <div className="hero__label">{props.headerLabel}</div>
        <div className="hero__display">{props.headerDisplay}</div>
      </div>
      <div className="hero_wordcount">{props.wordCount}</div>
    </div>
  );
}

Hero.propTypes = {
  className: PropTypes.string,
  userName: PropTypes.string.isRequired,
  organizationName: PropTypes.string,
  headerText: PropTypes.string,
};

Hero.defaultProps = {};
