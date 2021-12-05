import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import clsx from "clsx";
import Button from "../Button/Button";
import "./Hero.css";
import formatDate from "../../../Helpers/formatDate";

export default function Hero(props) {
  const formattedDeadline = formatDate(props.deadlineText);
  return (
    <div className={clsx(props.className, "hero")}>
      <div className="hero__contents">
        <div className="hero__breadcrumb">
          <Link to={props.breadCrumbLink}>&lt; Back to All Grants</Link>
        </div>
        <div className="hero__header">
          <h1>{props.headerText}</h1>
          <div className="hero__buttons">
            <Button
              style={{ height: "min-content" }}
              to={props.copyLink}
              variant="outlined"
            >
              Copy
            </Button>

            <Button
              style={{ height: "min-content" }}
              to={props.editLink}
              variant="outlined"
            >
              Edit
            </Button>
          </div>
        </div>
        <div className="hero__details">
          <dl>
            <dt>Funding Organization</dt>
            <dd>{props.fundingOrgText}</dd>

            <dt>RFP Website</dt>
            <dd>{props.rfpWebsiteText}</dd>

            <dt>Purpose</dt>
            <dd>{props.purposeText}</dd>
          </dl>
          <div className="hero__details-right">
            <dl className="hero__deadline">
              <dt>DEADLINE</dt>
              <dd>
                <time dateTime={props.deadlineText}>{formattedDeadline}</time>
              </dd>
            </dl>
            <b>TOTAL WORD COUNT: {props.totalWordCount}</b>
          </div>
        </div>
      </div>
    </div>
  );
}

Hero.propTypes = {
  className: PropTypes.string,
  headerText: PropTypes.string,
  fundingOrgText: PropTypes.string,
  rfpWebsiteText: PropTypes.string,
  purposeText: PropTypes.string,
  deadlineText: PropTypes.string,
  totalWordCount: PropTypes.number,
  breadCrumbLink: PropTypes.string,
  editLink: PropTypes.string,
  copyLink: PropTypes.string,
};

Hero.defaultProps = {};
