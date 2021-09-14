import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import Button from "../Button/Button";
import "./Hero.css";

export default function Hero(props) {
  return (
    <div className={clsx(props.className, "hero")}>
      <div className="hero__contents">
        <div className="hero__breadcrumb">&lt; Back to All Grants</div>
        <div className="hero__header">
          <h1>{props.headerText}</h1>

          <Button style={{ height: "min-content" }} variant="outlined">
            Edit
          </Button>
        </div>
        <div className="hero__details">
          <dl>
            <dt>Funding Organization</dt>
            <dd>The Good Place</dd>

            <dt>RFP Website</dt>
            <dd>goodorbad.com/newneighborhoods</dd>

            <dt>Purpose</dt>
            <dd>Moral Testing</dd>
          </dl>
          <div className="hero__details-right">
            <dl className="hero__deadline">
              <dt>DEADLINE</dt>
              <dd>June 30, 2021</dd>
            </dl>
            <div>Total Word Count: 0</div>
          </div>
        </div>
      </div>
    </div>
  );
}

Hero.propTypes = {
  className: PropTypes.string,
  headerText: PropTypes.string,
};

Hero.defaultProps = {};
