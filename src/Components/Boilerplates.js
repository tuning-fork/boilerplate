import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BoilerplatesNew from './BoilerplatesNew';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
// import Button from 'react-bootstrap/Button';

class Boilerplates extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      boilerplates: [],
      filteredBoilerplates: [],
      isHiddenNew: true,
      isHiddenCategoriesNew: true,
      query: '',
      searchText: '',
      filterParam: '',
      filteredByWordCount: [],
      openIndex: false,
      openNew: false
    };
  }

  toggleOpenIndex = () => {
    this.setState({
      openIndex: !this.state.openIndex,
    });
  }

  toggleOpenNew = () => {
    this.setState({
      openNew: !this.state.openNew,
    });
  }

  createUnzipped = (data) => {
      return data.map((filteredBoilerplate) => {
        filteredBoilerplate.isUnzipped = false
        return filteredBoilerplate
      })
  }

  toggleUnzipped = (id, bool) => {
    const alteredBoilerplates = this.state.filteredBoilerplates.map((bPKey) => {
      if (id === bPKey.id) {
        bPKey.isUnzipped = bool
      }
      console.log(bPKey)
      return bPKey
    })
    this.setState({
      filteredBoilerplates: alteredBoilerplates
    })
  }


  componentDidMount() {
    axios
      .get('/api/boilerplates',
        {headers: { Authorization: `Bearer ${localStorage.token}` }})
      .then((response) => {
        const zippyBoilerplates = this.createUnzipped(response.data);
        console.log(zippyBoilerplates);
        this.setState({
          boilerplates: response.data,
          filteredBoilerplates: zippyBoilerplates,
          loading: false
      })
      })
      .catch((error) =>  {
        console.log(error)
        this.setState({
          loading: false
        })
      })
  }

  updateBoilerplates = (newBoilerplate) => {
    const boilerplates = this.state.boilerplates;
    boilerplates.push(newBoilerplate);
    this.setState({
      boilerplates: boilerplates,
    });
  };

  handleSearchParamSelect = (event) => {
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
      this.setState({filteredBoilerplates: this.state.boilerplates});
      return
    }
    if (this.state.filterParam === "filterWordCount") {
      console.log(searchValue, "wordcount filter")
      let filteredByWordCount = [];
      filteredByWordCount = this.state.boilerplates.filter((boilerplate) => (
        boilerplate.wordcount < searchValue)
      )
      this.setState({filteredBoilerplates: filteredByWordCount})
      console.log(filteredByWordCount);
    }
    else if (this.state.filterParam === "filterTitle") {
      console.log(searchValue, "title filter")
      let filteredByTitle = [];
      filteredByTitle = this.state.boilerplates.filter((boilerplate) => {
        return boilerplate.title.toLowerCase().indexOf(searchValue) !== -1;
      })
      this.setState({filteredBoilerplates: filteredByTitle})
      console.log(filteredByTitle)
    }
    else if (this.state.filterParam === "filterText") {
      console.log(searchValue, "text filter")
      let filteredByText = [];
      filteredByText = this.state.boilerplates.filter((boilerplate) => {
        return boilerplate.text.toLowerCase().indexOf(searchValue) !== -1;
      })

      // highlighting of filteredByText
      // filteredByText.map((boilerplate) => {

      //   boilerplate.text = boilerplate.text.replace(searchValue, 
      //     (match) => `<mark>${match}</mark>`);
          
      //   return filteredByText;
      // })
      
      this.setState({filteredBoilerplates: filteredByText})
      // this.highlightBoilerplates(filteredByText);
      console.log(filteredByText)
    } 
  }
    

  render() {
    if (this.state.loading) {
      return <h1 className="container">Loading....</h1>;
    };
    
    let highlightedBoilerplates = this.state.filteredBoilerplates.map((boilerplate) => {
      console.log(boilerplate);
      let resultsText = boilerplate.text.replace(new RegExp(this.state.searchText, 'gi'),
        (match) => `<mark>${match}</mark>`);
      let resultsTitle = boilerplate.title.replace(new RegExp(this.state.searchText, 'gi'),
        (match) => `<mark>${match}</mark>`);
      if (this.state.searchText) {
        return (
          <div key={boilerplate.id}>
          {(boilerplate.isUnzipped === false) ? (
            <Card>
              <Card.Header>
                Title: 
                <a
                  href={`/boilerplates/${boilerplate.id}`}
                  dangerouslySetInnerHTML={{__html: resultsTitle}}
                >
                </a>
                <h1 onClick={() => this.toggleUnzipped(boilerplate.id, true)}>+</h1>
              </Card.Header>
            </Card>
          ) : (
            <Card>
              <Card.Header>
                Title: 
                <a
                  href={`/boilerplates/${boilerplate.id}`}
                  dangerouslySetInnerHTML={{__html: resultsTitle}}
                >
                </a>
                <h1 onClick={() => this.toggleUnzipped(boilerplate.id, false)}>-</h1>
              </Card.Header>
              <Card.Body>
                <p dangerouslySetInnerHTML={{__html: resultsText}}></p>
                <p>Organization: {boilerplate.organization_name}</p>
                <p>Category: {boilerplate.category_name}</p>
                <p>Wordcount: {boilerplate.wordcount}</p>
              </Card.Body>
            </Card>
          )}
            <br />
          </div> )
      } else {
          // return this.state.filteredBoilerplates.map((boilerplate) => {
            return (
              <div key={boilerplate.id}>
              {(boilerplate.isUnzipped === false) ? (
                <Card>
                  <Card.Header>
                    Title: 
                    <Link
                      to={`/boilerplates/${boilerplate.id}`}
                    >
                      {boilerplate.title}
                    </Link>
                    <h1 onClick={() => this.toggleUnzipped(boilerplate.id, true)}>+</h1>
                  </Card.Header>
                </Card>
              ) : (
                <Card>
                  <Card.Header>
                    Title: 
                    <Link
                      to={`/boilerplates/${boilerplate.id}`}
                    >
                      {boilerplate.title}
                    </Link>
                    <h1 onClick={() => this.toggleUnzipped(boilerplate.id, false)}>-</h1>
                  </Card.Header>
                  <Card.Body>
                    <p dangerouslySetInnerHTML={{__html: boilerplate.text}}></p>
                    <p>Organization: {boilerplate.organization_name}</p>
                    <p>Category: {boilerplate.category_name}</p>
                    <p>Wordcount: {boilerplate.wordcount}</p>
                  </Card.Body>
                </Card>
              )}
                <br />
              </div>
            );
          // })
        }
      })

    return (
      <div className="container">
        <h1>Boilerplates Index</h1>
        <h1 onClick={this.toggleOpenIndex}>+</h1>
        {this.state.openIndex ? (
          <div>
        <br/>

        <br/>
        <h3>Select a filter to search boilerplate</h3>

        {/* Search input field */}

        <Form>
          <Form.Group>
            <Form.Label>Search Filter</Form.Label>
            <Form.Control
              as="select" 
              name="filterParam"
              value={this.state.filterParam}
              onChange={this.handleSearchParamSelect}
              required
            >
              <option value="" disabled>Search By</option>
              <option value="filterWordCount" >Word Count</option>
              <option value="filterText" >Text</option>
            </Form.Control>   
          </Form.Group>
          <Form.Group>
            <Form.Label></Form.Label>
            <Form.Control 
              type="text"
              placeholder="Search text..." 
              value={this.state.searchText} 
              onChange={this.handleChange} 
            />
          </Form.Group>
        </Form>

        {highlightedBoilerplates}
        </div>
        ) : null}
        <h3>Add Boilerplate</h3>
        <h1 onClick={this.toggleOpenNew}>+</h1>
          {this.state.openNew ? (
        <BoilerplatesNew 
          updateBoilerplates={this.updateBoilerplates}
        />
        ) : null}
      </div>
    );
  }
}

export default Boilerplates;