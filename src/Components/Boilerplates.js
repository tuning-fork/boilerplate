import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BoilerplatesNew from './BoilerplatesNew';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

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
      filterWordCount: false,
      filteredByWordCount: [],
      filterTitle: false,
      filterText: false
    };
  }

  componentDidMount() {
    axios
      .get('/api/boilerplates',
        {headers: { Authorization: `Bearer ${localStorage.token}` }})
      .then((response) => {
        this.setState({
          boilerplates: response.data,
          filteredBoilerplates: response.data,
          loading: false
        });
      })
      .catch((error) => console.log(error));
  }

  updateBoilerplates = (newBoilerplate) => {
    const boilerplates = this.state.boilerplates;
    boilerplates.push(newBoilerplate);
    this.setState({
      boilerplates: boilerplates,
    });
  };

  handleChange = (event) => {
    const searchValue = event.target.value.toLowerCase()
    this.setState({
      searchText: event.target.value,
    })
    if (!searchValue) {
      this.setState({filteredBoilerplates: this.state.boilerplates});
      return
    }
    if (this.state.filterWordCount === true) {
      console.log(searchValue, "wordcount filter")
      let filteredByWordCount = [];
      filteredByWordCount = this.state.boilerplates.filter((boilerplate) => (
        boilerplate.wordcount < searchValue)
      )
      this.setState({filteredBoilerplates: filteredByWordCount})
      console.log(filteredByWordCount);
    }
    else if (this.state.filterTitle) {
      console.log(searchValue, "title filter")
      let filteredByTitle = [];
      filteredByTitle = this.state.boilerplates.filter((boilerplate) => {
        return boilerplate.title.toLowerCase().indexOf(searchValue) !== -1;
      })
      this.setState({filteredBoilerplates: filteredByTitle})
      console.log(filteredByTitle)
    }
    else if (this.state.filterText) {
      console.log(searchValue, "text filter")
      let filteredByText = [];
      filteredByText = this.state.boilerplates.filter((boilerplate) => {
        return boilerplate.text.toLowerCase().indexOf(searchValue) !== -1;
      })
      this.setState({filteredBoilerplates: filteredByText})
      this.highlightSearchResults(this.state.filteredBoilerplates);
      console.log(filteredByText)
    } 
  }

  highlightSearchResults = (filteredBoilerplates) => {
    this.state.filteredBoilerplates.map((filteredBoilerplate) => {
      let highlightArray = filteredBoilerplate.text.split(" ") 
      highlightArray.map((chunk) => {
        if (chunk === this.state.searchValue) {
          classList.add("highlighted")
        }
      })
      this.setState({filteredBoilerplates: 
        highlightArray.join()
      })
    })
  }

  render() {
    if (this.state.loading) {
      return <h1 className="container">Loading....</h1>;
    };

    return (
      <div className="component container">
        <h1>Boilerplates Index</h1>
        <br/>
        
        <BoilerplatesNew 
          updateBoilerplates={this.updateBoilerplates}
        />
        <br/>
        <h3>Select a filter to search boilerplate</h3>
        <Button 
          variant="secondary" 
          size="sm"
          onClick={(event) => this.setState({
            filterWordCount: true,
            filterTitle: false,
            filterText: false
          })}
        >
          Filter by WordCount
        </Button>
        <Button
          variant="secondary" 
          size="sm" 
          onClick={(event) => this.setState({
            filterTitle: true,
            filterWordCount: false,
            filterText: false
          })}
        >
          Filter by Title
        </Button>
        <Button 
          variant="secondary" 
          size="sm" 
          onClick={(event) => this.setState({
            filterText: true,
            filterTitle: false,
            filterWordCount: false
          })}
        >
          Filter by Text
        </Button>
        
        <Form>
          <Form.Group>
          <Form.Label></Form.Label>
          <Form.Control 
            type="text"
            placeholder="Search text..." 
            value={this.state.searchText} 
            onChange={this.handleChange} />
          </Form.Group>
        </Form>

        {this.state.filteredBoilerplates.map((boilerplate) => {
          return (
            <div key={boilerplate.id}>
              <Card >
                <Card.Header>
                  Title: <Link
                      to={`/boilerplates/${boilerplate.id}`}
                  >
                    {boilerplate.title}
                  </Link>
                </Card.Header>
                <Card.Body>
                  {/* {boilerplate.text.filter((chunk) => {
                    if (chunk === this.state.searchText) {
                      return chunk.classList.add("highlighted")
                    }
                  })
                  } */}
                  <p dangerouslySetInnerHTML={{__html: boilerplate.text}}></p>
                  {/* <div dangerouslySetInnerHTML={{__html: this.state.text}}></div> */}
                  <p>Organization: {boilerplate.organization_name}</p>
                  <p>Category: {boilerplate.category_name}</p>
                  <p>Wordcount: {boilerplate.wordcount}</p>
                </Card.Body>
              </Card>
              <br />
            </div>
          );
        })}
      </div>
    );
  }
}

export default Boilerplates;