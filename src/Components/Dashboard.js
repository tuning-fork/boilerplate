import React, { Component, useState, useEffect } from "react";
import CurrentUser from "./CurrentUser";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useCurrentUserContext } from "../Contexts/currentUserContext";
import { useCurrentOrganizationContext } from "../Contexts/currentOrganizationContext";
import { useHistory } from "react-router-dom";
import axios from "axios";

export default function Dashboard() {
  const { currentUserStore, currentUserDispatch } = useCurrentUserContext();
  const [
    currentOrganizationStore,
    currentOrganizationDispatch,
  ] = useCurrentOrganizationContext();
  console.log(currentUserStore);
  console.log(currentOrganizationStore);
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
          <h1>Welcome, {currentUserStore?.currentUser?.first_name}</h1>
        </div>
      </div>
      <div className="d-flex flex-row row">
        <Card
          className="card-component"
          onClick={() => {
            history.push(
              `organizations/${currentOrganizationStore.currentOrganization.id}/grants/`
            );
          }}
        >
          <Card.Header>Grants &gt;</Card.Header>
          <Card.Body>
            Store draft grants and submitted grants in this library. Sort grants
            by purpose, funding organization, and funding award. Start a new
            grant.
            <br />
            {/* <a className="card-component-links" href={"/boilerplates/"}>></a> */}
          </Card.Body>
        </Card>
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
                history.push(
                  `organizations/${currentOrganizationStore.currentOrganization.id}/boilerplates/`
                );
              }}
            >
              <Card.Header>Stored Content &gt;</Card.Header>
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
                history.push(
                  `organizations/${currentOrganizationStore.currentOrganization.id}/bios/`
                );
              }}
            >
              <Card.Header>Staff Bios &gt;</Card.Header>
              <Card.Body>
                Store bios for your organization employees and board in this
                library. Save information about employee titles, work history,
                qualifications, and activities in accessible text blocks
                <br />
              </Card.Body>
            </Card>
          </div>
        </div>
        <div className="col align-items-stretch">
          <div className="row">
            <Card
              className="card-component"
              onClick={() => {
                history.push(
                  `organizations/${currentOrganizationStore.currentOrganization.id}/funding_orgs/`
                );
              }}
            >
              <Card.Header>Funding Organizations &gt;</Card.Header>
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
                history.push(
                  `organizations/${currentOrganizationStore.currentOrganization.id}/categories/`
                );
              }}
            >
              <Card.Header>Categories &gt;</Card.Header>
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
