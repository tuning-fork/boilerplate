import React, { Component, useState, useEffect } from "react";
import CurrentUser from "./CurrentUser";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useCurrentUserContext } from "../Contexts/currentUserContext";
import { useHistory } from "react-router-dom";
import axios from "axios";

export default function Dashboard() {
  const [state, dispatch] = useCurrentUserContext();
  console.log(state);
  const history = useHistory();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div
      className="d-flex container-fluid flex-column align-items-stretch"
      style={{ paddingLeft: "5rem", paddingRight: "5rem" }}
    >
      <div className="flex-row row" style={{ paddingBottom: ".5rem" }}>
        <div className="w-100">
          <h1>Welcome, {state?.currentUserInfo?.first_name}</h1>
        </div>
      </div>
      <div className="d-flex flex-row row">
        <div
          className="col align-items-stretch"
          style={{ paddingRight: "3rem" }}
        >
          <div className="row h-50">
            <Card
              className="card-component"
              onClick={() => {
                history.push("/boilerplates/");
              }}
            >
              <Card.Header>Stored Content ></Card.Header>
              <Card.Body>
                Store materials for your organization in this library. Save
                information about your mission, programs, metrics, client
                communities, and activities in accessible text blocks.
                <br />
                {/* <a className="card-component-links" href={"/boilerplates/"}>></a> */}
              </Card.Body>
            </Card>
          </div>
          <div className="row h-50">
            <Card
              className="card-component"
              onClick={() => {
                history.push("/bios/");
              }}
            >
              <Card.Header>Staff Bios ></Card.Header>
              <Card.Body>
                Store bios for your organization employees and board in this
                library. Save information about employee titles, work history,
                qualifications, and activities in accessible text blocks
                <br />
                {/* <a className="card-component-links" href={"/bios/"}>></a> */}
              </Card.Body>
            </Card>
          </div>
        </div>
        <div className="col align-items-stretch">
          <div className="row">
            <Card
              className="card-component"
              onClick={() => {
                history.push("/funding_orgs/");
              }}
            >
              <Card.Header>Funding Organizations ></Card.Header>
              <Card.Body>
                Store funding organizations that you have applied to in the
                past, so that you can track applications, requests for
                proposals, and funding streams over time.
                <br />
                {/* <a className="card-component-links" href={"/funding_orgs/"}>></a> */}
              </Card.Body>
            </Card>
          </div>
          <div className="row">
            <Card
              className="card-component"
              onClick={() => {
                history.push("/organizations/");
              }}
            >
              <Card.Header>Applying Organizations ></Card.Header>
              <Card.Body>
                Store organizations applying for grants, so that you can sort
                grants, bios, and stored content under a single organization
                heading. Add yourself to an organization as an affiliated user.
                <br />
                {/* <a className="card-component-links" href={"/organizations/"}>></a> */}
              </Card.Body>
            </Card>
          </div>
          <div className="row">
            <Card
              className="card-component"
              onClick={() => {
                history.push("/categories/");
              }}
            >
              <Card.Header>Categories ></Card.Header>
              <Card.Body>
                Store a list of categories for stored content, so that you can
                customize your content library for your organization.
                <br />
                {/* <a className="card-component-links" href={"/categories/"}>></a> */}
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
