import React, { Component } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

class ReportsNew extends Component {
  constructor(props) {
    super(props);

    this.state = {
      deadline: "",
      submitted: false,
      isHidden: true,
      loading: true,
      errors: [],
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  clearForm = () => {
    this.setState({
      deadline: ""
    });
  };

  toggleHidden() {
    this.setState({
      isHidden: !this.state.isHidden,
    });
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    const {
      deadline, submitted
    } = this.state;
    axios
      .post('/api/reports', {
        grant_id: this.props.grant_id,
        title: `Report for ${this.props.grant_title}`,
        deadline: deadline,
        submitted: submitted
      },
      {headers: { Authorization: `Bearer ${localStorage.token}` }})
      .then((response) => {
        if (response.data) {
          this.toggleHidden();
          this.props.updateReports(response.data);
          this.clearForm();
        };
      })
      .catch((error) => {
        console.log('report creation error', error);
      });
    event.preventDefault();
  }

  render() {
    // console.log(this.props.sections);
    // console.log(this.props.location.state);
    return (
      <div>
        {this.state.isHidden ?
          <Button onClick={this.toggleHidden.bind(this)}>
          Add Report
        </Button> :
        <Button onClick={this.toggleHidden.bind(this)}>
          Close
        </Button>
        }
        <br />
        <br />
        {!this.state.isHidden ? (
          <Card>
            <Card.Body>
              <Form onSubmit={this.handleSubmit}>
                <Form.Group>
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    value={`Report for ${this.props.grant_title}`}
                    onChange={this.handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Deadline</Form.Label>
                  <Form.Control
                    type="datetime-local"
                    name="deadline"
                    value={this.state.deadline}
                    onChange={this.handleChange}
                    required
                  />
                </Form.Group>
                <div className="text-center">
                  <Button type="submit">
                    Submit New Report
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        ) : null }
      </div>
    );
  }
}

export default ReportsNew;