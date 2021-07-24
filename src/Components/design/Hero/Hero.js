import React from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import clsx from "clsx";
import Button from "../Button/Button";
import Container from "../Container/Container";
import "./Hero.css";

export default function Hero(props) {
  return (
    <div className={clsx(props.className, "hero")}>
      <Container centered>
        <div className="hero__breadcrumb">{props.breadCrumb}</div>
        <div style={{ display: "flex" }}>
          <h1 style={{ flexDirection: "column" }} className="hero__header">
            {props.headerText}
          </h1>
          <div
            style={{
              flexDirection: "column",
              marginRight: "80px",
              marginLeft: "30px",
              justifyContent: "flex-end",
            }}
          >
            <Button>Edit</Button>
          </div>
        </div>
        {props.children}
      </Container>
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
