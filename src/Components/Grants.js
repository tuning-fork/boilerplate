import React, { Component } from 'react';
import GrantsNew from './GrantsNew';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Moment from 'react-moment';
import Form from 'react-bootstrap/Form';

class Grants extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      grants: [],
      query: '',
      filteredGrants: [],
      searchText: '',
      filterParam: ''
    };
    this.formatFromNow = this.formatFromNow.bind(this);
  }

  createUnzipped = (data) => {
    return data.map((filteredGrant) => {
      filteredGrant.isUnzipped = false
      return filteredGrant
    })
  }

  toggleUnzipped = (id, bool) => {
    const alteredGrants = this.state.grants.map((grantKey) => {
      if (id === grantKey.id) {
        grantKey.isUnzipped = bool
      }
      console.log(grantKey)
      return grantKey
    })
    this.setState({
      filteredGrants: alteredGrants
    })
  }

  componentDidMount() {
    axios
      .get('/api/grants',
        {headers: { Authorization: `Bearer ${localStorage.token}` }})
      .then((response) => {
        const zippyGrants = this.createUnzipped(response.data);
        console.log(zippyGrants);
        this.setState({
          grants: response.data,
          filteredGrants: zippyGrants,
          loading: false
        });
      // console.log(response.data);
      })
      .catch((error) => console.log(error));
  }
  
  updateGrants = (newGrant) => {
		const grants = this.state.grants;
		grants.push(newGrant);
		this.setState({
			grants: grants,
		});
  };

  handleSearchParamSelect = (event) => {
    // let filterParam = this.state.filterParam
    this.setState({
      filterParam: event.target.value
    })
  }

  handleChange = (event) => {
    const searchValue = event.target.value.toLowerCase()
    this.setState({
      searchText: event.target.value,
    })
    if (searchValue.length <= 0) {
      this.setState({filteredGrants: this.state.grants});
      return
    }
    if (this.state.filterParam === "filterTitle") {
      console.log(searchValue, "title filter")
      let filteredByTitle = [];
      filteredByTitle = this.state.grants.filter((grant) => {
        return grant.title.toLowerCase().indexOf(searchValue) !== -1;
      })
      this.setState({filteredGrants: filteredByTitle})
      console.log(filteredByTitle)
    }
    else if (this.state.filterParam === "filterPurpose") {
      console.log(searchValue, "purpose filter")
      let filteredByPurpose = [];
      filteredByPurpose = this.state.grants.filter((grant) => {
        return grant.purpose.toLowerCase().indexOf(searchValue) !== -1;
      })

      this.setState({filteredGrants: filteredByPurpose})
      console.log(filteredByPurpose)
    } 
    else if (this.state.filterParam === "filterFundingOrg") {
      console.log(searchValue, "funding org")
      let filteredByFundingOrg = [];
      filteredByFundingOrg = this.state.grants.filter((grant) => {
        return grant.funding_org_name.toLowerCase().indexOf(searchValue) !== -1;
      })
      this.setState({filteredGrants: filteredByFundingOrg})
      console.log(filteredByFundingOrg)
    } 
  }

  formatDate(date) {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    const day = d.getDay();
    return `${month} ${day} ${year}`
  }
  
  formatFromNow(fromNowString) {
    var splitStr = fromNowString.toLowerCase().split(' ');
       for (var i = 0; i < splitStr.length; i++) {
           // You do not need to check if i is larger than splitStr length, as your for does that for you
           // Assign it back to the array
           splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
       }
       // Directly return the joined string
       return splitStr.join(' '); 
  }

  render() {
    if (this.state.loading) {
      return (
        <div className="container">
          <h1>Loading....</h1>
        </div>
      );
    };

    let highlightedGrants = this.state.filteredGrants.map((grant) => {
      if (this.state.searchText && (this.state.filterParam === "filterTitle")) {
        let results = grant.title.replace(new RegExp(this.state.searchText, 'gi'),
          (match) => `<mark>${match}</mark>`);
        
        return (
          <div key={grant.id}>
          {(grant.isUnzipped === false) ? (
            <Card>
              <Card.Header >
                Title: 
                <a 
                  dangerouslySetInnerHTML={{__html: results}}
                  href={`/grants/${grant.id}`}
                ></a>
                <h1 onClick={() => this.toggleUnzipped(grant.id, true)}>+</h1>
              </Card.Header>
            </Card>
              ) : (
            <Card>
              <Card.Header >
                Title: 
                <a 
                  dangerouslySetInnerHTML={{__html: results}}
                  href={`/grants/${grant.id}`}
                ></a>
                <h1 onClick={() => this.toggleUnzipped(grant.id, false)}>-</h1>
              </Card.Header>
              <Card.Body>
                <p>Purpose: {grant.purpose}</p>
                <p>Funding Organization: {grant.funding_org_name}</p>
                <p>RFP URL: {grant.rfp_url}</p>
                <p>Deadline: {this.formatDate(grant.deadline)}</p>
                <p>Deadline: <Moment>{grant.deadline}</Moment></p>
                <Moment fromNow>{grant.deadline}</Moment>
                <p>Submitted: {grant.submitted ? "yes" : "not yet"}</p>
                <p>Successful: {grant.successful ? "yes" : "not yet"}</p>
                <p>Organization Name: {grant.organization_name}</p>
              </Card.Body>
            </Card>
          )}
            <br />
          </div> )
        } else if (this.state.searchText && (this.state.filterParam === "filterPurpose")) {
        let results = grant.purpose.replace(new RegExp(this.state.searchText, 'gi'),
          (match) => `<mark>${match}</mark>`);
        return (
          <div key={grant.id}>
            {(grant.isUnzipped === false) ? (
              <Card>
                <Card.Header>
                  Title: 
                  <Link
                    to={`/grants/${grant.id}`}
                  >
                    {grant.title}
                  </Link>
                  <h1 onClick={() => this.toggleUnzipped(grant.id, true)}>+</h1>
                </Card.Header>
              </Card>
              ) : (
            <Card>
              <Card.Header>
                Title: 
                <Link
                  to={`/grants/${grant.id}`}
                >
                  {grant.title}
                </Link>
                <h1 onClick={() => this.toggleUnzipped(grant.id, false)}>-</h1>
              </Card.Header>
              <Card.Body>
                <p>Purpose:
                  <span dangerouslySetInnerHTML={{__html: results}}></span>
                </p>
                <p>Funding Organization: {grant.funding_org_name}</p>
                <p>RFP URL: {grant.rfp_url}</p>
                <p>Deadline: {this.formatDate(grant.deadline)}</p>
                <p>Deadline: <Moment>{grant.deadline}</Moment></p>
                <Moment fromNow>{grant.deadline}</Moment>
                <p>Submitted: {grant.submitted ? "yes" : "not yet"}</p>
                <p>Successful: {grant.successful ? "yes" : "not yet"}</p>
                <p>Organization Name: {grant.organization_name}</p>
              </Card.Body>
            </Card>
            )}
            <br />
          </div> )
      } else if (this.state.searchText && (this.state.filterParam === "filterFundingOrg")) {
        let results = grant.funding_org_name.replace(new RegExp(this.state.searchText, 'gi'),
          (match) => `<mark>${match}</mark>`);
        return (
          <div key={grant.id}>
          {(grant.isUnzipped === false) ? (
            <Card>
              <Card.Header>
                Title: 
                <Link
                  to={`/grants/${grant.id}`}
                >
                  {grant.title}
                </Link>
                <h1 onClick={() => this.toggleUnzipped(grant.id, true)}>+</h1>
              </Card.Header>
            </Card>
            ) : (
            <Card>
              <Card.Header>
                Title: 
                <Link
                  to={`/grants/${grant.id}`}
                >
                  {grant.title}
                </Link>
                <h1 onClick={() => this.toggleUnzipped(grant.id, false)}>-</h1>
              </Card.Header>
              <Card.Body>
                <p>Purpose: {grant.purpose} 
                </p>
                <p>Funding Organization: 
                <span dangerouslySetInnerHTML={{__html: results}}></span>
                </p>
                <p>RFP URL: {grant.rfp_url}</p>
                <p>Deadline: {this.formatDate(grant.deadline)}</p>
                <p>Deadline: <Moment>{grant.deadline}</Moment></p>
                <Moment fromNow>{grant.deadline}</Moment>
                <p>Submitted: {grant.submitted ? "yes" : "not yet"}</p>
                <p>Successful: {grant.successful ? "yes" : "not yet"}</p>
                <p>Organization Name: {grant.organization_name}</p>
              </Card.Body>
            </Card>
            )}
            <br />
          </div> )
      } else {
          // return this.state.filteredGrants.map((grant) => {
        return (
          <div key={grant.id}>
          {(grant.isUnzipped === false) ? (
              <Card>
                <Card.Header>
                  Title: 
                  <Link
                    to={`/grants/${grant.id}`}
                  >
                    {grant.title}
                  </Link>
                  <h1 onClick={() => this.toggleUnzipped(grant.id, true)}>+</h1>
                </Card.Header>
              </Card>
              ) : (
                <Card >
                  <Card.Header>
                    Title: <Link
                        to={`/grants/${grant.id}`}
                    >
                      {grant.title}
                    </Link>
                    <h1 onClick={() => this.toggleUnzipped(grant.id, false)}>-</h1>
                  </Card.Header>
                  <Card.Body>
                    <p>Purpose: {grant.purpose}</p>
                    <p>Funding Organization: {grant.funding_org_name}</p>
                    <p>RFP URL: {grant.rfp_url}</p>
                    <p>Deadline: {this.formatDate(grant.deadline)}</p>
                    <p>Deadline: <Moment>{grant.deadline}</Moment></p>
                    <Moment fromNow>{grant.deadline}</Moment>
                    <p>Submitted: {grant.submitted ? "yes" : "not yet"}</p>
                    <p>Successful: {grant.successful ? "yes" : "not yet"}</p>
                    <p>Organization Name: {grant.organization_name}</p>
                  </Card.Body>
                </Card>
                )}
                <br />
              </div>
            );
        }
      })

    return (
      <div className="component container">
        <h1>Grants Index</h1>
        <h3>Add A Grant</h3>

        <GrantsNew 
          updateGrants={this.updateGrants}
        />
        <br />

        {/* Grant search input */}

        <Form>
          <Form.Group>
            <Form.Label>Search Parameter</Form.Label>
            <Form.Control
              as="select" 
              name="filterParam"
              value={this.state.filterParam}
              onChange={this.handleSearchParamSelect}
              required
            >
              <option value="" disabled>Search By</option>
              <option value="filterPurpose" >Purpose</option>
              <option value="filterTitle" >Title</option>
              <option value="filterFundingOrg" >Funding Org</option>
            </Form.Control>   
          </Form.Group>
          <Form.Group>
          <Form.Label></Form.Label>
          <Form.Control 
            type="text"
            placeholder="Search text..." 
            value={this.state.searchText} 
            onChange={this.handleChange} />
          </Form.Group>
        </Form>

        {highlightedGrants}
        
        {/* {this.state.grants.map((grant) => {
          return (
            <div key={grant.id}>
              <Card>
                <Card.Header> 
                  <Link
                    to={`/grants/${grant.id}`}
                  >
                    {grant.title}
                  </Link>
                </Card.Header>
                <Card.Body>
                  <p>Purpose: {grant.purpose}</p>
                  <p>Funding Organization: {grant.funding_org_name}</p>
                  <p>RFP URL: {grant.rfp_url}</p>
                  <p>Deadline: {this.formatDate(grant.deadline)}</p>
                  <p>Deadline: <Moment>{grant.deadline}</Moment></p>
                  <Moment fromNow>{grant.deadline}</Moment>
                  <p>Submitted: {grant.submitted ? "yes" : "not yet"}</p>
                  <p>Successful: {grant.successful ? "yes" : "not yet"}</p>
                  <p>Organization Name: {grant.organization_name}</p>
                </Card.Body>
              </Card>
              <br />
            </div>
          );
        })} */}
      </div>
    );
  }
}

export default Grants;
