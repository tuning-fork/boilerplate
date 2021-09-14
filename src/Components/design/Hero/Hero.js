import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import Button from "../Button/Button";
import "./Hero.css";

export default function Hero(props) {
  return (
    <div className={clsx(props.className, "hero")}>
      <div className="hero__left">
        <div className="hero__breadcrumb">&lt; Back to All Grants</div>
        <h1 className="hero__header">{props.headerText}</h1>
        <dl>
          <dt>Funding Organization</dt>
          <dd>The Good Place</dd>

          <dt>RFP Website</dt>
          <dd>goodorbad.com/newneighborhoods</dd>

          <dt>Purpose</dt>
          <dd>Moral Testing</dd>
        </dl>
      </div>
      <div className="hero__right">
        <div
          style={{
            marginRight: "80px",
            marginLeft: "30px",
            justifyContent: "flex-end",
          }}
        >
          <Button variant="outlined">Edit</Button>
        </div>
        <dl className="hero__deadline">
          <dt>DEADLINE</dt>
          <dd>June 30, 2021</dd>
        </dl>
        <div>Total Word Count: 0</div>
      </div>
    </div>
  );
}

Hero.propTypes = {
  className: PropTypes.string,
  headerText: PropTypes.string,
};

Hero.defaultProps = {};
