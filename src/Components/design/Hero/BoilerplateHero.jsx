import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@mantine/core";
import PropTypes from "prop-types";
import clsx from "clsx";
import "./BoilerplateHero.css";

export default function BoilerplateHero(props) {
  return (
    <div className={clsx(props.className, "hero")}>
      <div className="hero__contents">
        <div className="hero__breadcrumb">
          <Link to={props.breadCrumbLink}>&lt; Back to All Boilerplates</Link>
        </div>
        <div className="hero__header">
          <h1>{props.headerText}</h1>
          <div className="hero__buttons">
            <Button variant="light" onClick={() => props.setIsOpen(true)}>
              Edit
            </Button>
          </div>
        </div>
        <div className="hero__details">
          <dl>
            <dt>Category</dt>
            <dd>{props.categoryText}</dd>
          </dl>
          <div className="hero__details-right">
            <b>WORD COUNT: {props.wordcount}</b>
          </div>
        </div>
      </div>
    </div>
  );
}

BoilerplateHero.propTypes = {
  className: PropTypes.string,
  headerText: PropTypes.string,
  categoryText: PropTypes.string,
  deadline: PropTypes.instanceOf(Date),
  wordcount: PropTypes.number,
  breadCrumbLink: PropTypes.string,
  editLink: PropTypes.string,
  copyLink: PropTypes.string,
};

BoilerplateHero.defaultProps = {};
