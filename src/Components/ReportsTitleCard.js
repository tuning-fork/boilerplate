import React, { Component, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ReportSectionsNew from "./ReportSectionsNew";
import ReportSectionsShow from "./ReportSectionsShow";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";
import { useCurrentOrganizationContext } from "../Contexts/currentOrganizationContext";

export default function ReportsTitleCard(props) {
  const [id, setId] = useState("");
  const [grantId, setGrantId] = useState("");
  const [title, setTitle] = useState("");
  const [deadline, setDeadline] = useState("");
  const [submitted, setSubmitted] = useState("");

  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState([]);
  const history = useHistory();

  const [
    currentOrganizationStore,
    currentOrganizationDispatch,
  ] = useCurrentOrganizationContext();

  useEffect(() => {
    axios
      .get(
        `/api/organizations/${currentOrganizationStore.currentOrganizationInfo.id}/grants/${props.grant_id}/reports/${props.report_id}`,
        {
          headers: { Authorization: `Bearer ${localStorage.token}` },
        }
      )
      .then((response) => {
        setId(response.data.id);
        setGrantId(response.data.grant_id);
        setTitle(response.data.title);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (loading) {
    return (
      <div className="container">
        <h1>Loading....</h1>
      </div>
    );
  }

  return (
    <div className="component container">
      <Card>
        <Card.Header>
          <Link
            to={`/organizations/${currentOrganizationStore.currentOrganizationInfo.id}/grants/${props.grant_id}/reports/${id}`}
          >
            <h4>{title}</h4>
          </Link>
        </Card.Header>
      </Card>
    </div>
  );
}
