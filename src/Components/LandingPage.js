import React from "react";
import Jumbotron from "react-bootstrap/Jumbotron";

export default function LandingPage() {
  return (
    <Jumbotron
      fluid
      style={{
        textAlign: "center",
        backgroundColor: "#09191b",
        paddingTop: "20rem",
        height: "100%",
        paddingBottom: "100%",
      }}
    >
      <div style={{ paddingBottom: "1rem" }}>
        <h1
          className="jumbotron-head"
          style={{ textAlign: "center", color: "#fefefe", display: "inline" }}
        >
          Welcome to{" "}
        </h1>
        <h1
          className="jumbotron-head"
          style={{
            color: "#23cb87",
            fontWeight: "bolder",
            display: "inline",
          }}
        >
          Boilerplate
        </h1>
      </div>
      <div style={{ paddingBottom: "1rem" }}>
        <h1
          className="jumbotron-subhead"
          style={{ color: "#fefefe", display: "inline" }}
        >
          grantwriting made{" "}
        </h1>
        <h1
          className="jumbotron-subhead"
          style={{
            color: "#23cb87",
            fontWeight: "bolder",
            fontStyle: "italic",
            display: "inline",
            textDecorationLine: "underline",
            textDecorationColor: "#23cb87",
          }}
        >
          simple
        </h1>
      </div>
    </Jumbotron>
  );
}
