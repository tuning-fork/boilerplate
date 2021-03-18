import React, { Component } from 'react';
import CurrentUser from './CurrentUser';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <div className="flex container" style={{display: "flex"}}>
        <div className="flex container col">
          <CurrentUser />
        </div>
        <div className="flex container col">
        <Card className="card-dashboard">
        <Card.Header>Stored Content</Card.Header>
        <Card.Body>
         Store materials for your organization in this library. Save information about your mission, programs, metrics, client communities, and activities in accessible text blocks.
        </Card.Body>
        </Card>
        <Card className="card-dashboard">
        <Card.Header>Staff Bios</Card.Header>
        <Card.Body>Store bios for your organization employees and board in this library. Save information about employee titles, work history, qualifications, and activities in accessible text blocks</Card.Body>
        </Card>
        </div>
        <div className="flex container col">
        <Card className="card-dashboard">
        <Card.Header>Funding Orgs</Card.Header>
        <Card.Body>Store funding organizations that you have applied to in the past, so that you can track applications, requests for proposals, and funding streams over time.</Card.Body>
        </Card>
        <Card className="card-dashboard">
        <Card.Header>Organizations</Card.Header>
        <Card.Body>Store organizations for which you have written grants, so that you can organizse grants, bios, and stored content under a single organization heading.</Card.Body>
        </Card>
        <Card className="card-dashboard">
        <Card.Header>Categories</Card.Header>
        <Card.Body>Store a list of categories for stored content, so that you can customize your content library for your organization.</Card.Body>
        </Card>
        </div>
      </div>
    );
  }
}

export default Dashboard;
