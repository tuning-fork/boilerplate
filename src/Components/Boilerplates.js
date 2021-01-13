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
      filterText: false,
      // highlightedBoilerplates: []
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
    if (this.state.filterWordCount) {
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

  // highlightBoilerplates = (filteredArr) => {
  //   filteredArr.map((boilerplate) => {
  //     boilerplate.text = boilerplate.text.replace(this.state.searchText, 
  //       (match) => `<mark>${match}</mark>`);
  //     if (this.state.searchText) {
  //       return filteredArr;
        
  //     } 
  //   //     // else {
  //   //     //   return (
  //   //     //     <div key={boilerplate.id}>
  //   //     //         <p dangerouslySetInnerHTML={{__html: boilerplate.text}}></p>
  //   //     //     </div>
  //   //     //   )
  //   //     // }
  //   })
  //   this.setState({ highlightedBoilerplates: filteredArr })
  // }
    

  render() {
    if (this.state.loading) {
      return <h1 className="container">Loading....</h1>;
    };
    
    // let highlightBoilerplates = this.state.filteredBoilerplates;
    // highlightBoilerplates.map((boilerplate) => {
    //   boilerplate.text = boilerplate.text.replace(this.state.searchText, 
    //     (match) => `<mark>${match}</mark>`);
    //   if (this.state.searchText) {
    //     return highlightBoilerplates;
    //   } 
    // //     // else {
    // //     //   return (
    // //     //     <div key={boilerplate.id}>
    // //     //         <p dangerouslySetInnerHTML={{__html: boilerplate.text}}></p>
    // //     //     </div>
    // //     //   )
    // //     // }
    // })

    
      let highlightedBoilerplates = this.state.filteredBoilerplates.map((boilerplate) => {
        let results = boilerplate.text.replace(new RegExp(this.state.searchText, 'gi'),
          (match) => `<mark>${match}</mark>`);
        if (this.state.searchText) {
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
                    <p dangerouslySetInnerHTML={{__html: results}}></p>
                    <p>Organization: {boilerplate.organization_name}</p>
                    <p>Category: {boilerplate.category_name}</p>
                    <p>Wordcount: {boilerplate.wordcount}</p>
                    </Card.Body>
                </Card>
            </div> )
        } else {
          this.state.filteredBoilerplates.map((boilerplate) => {
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
                    <p dangerouslySetInnerHTML={{__html: boilerplate.text}}></p>
                    <p>Organization: {boilerplate.organization_name}</p>
                    <p>Category: {boilerplate.category_name}</p>
                    <p>Wordcount: {boilerplate.wordcount}</p>
                    </Card.Body>
                </Card>
                <br />
              </div>
            );
          })
          }
        })

    console.log(highlightedBoilerplates);

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

        {highlightedBoilerplates}

        {/* {this.state.searchText ?
          {highlightedBoilerplates}
        : 
        this.state.filteredBoilerplates.map((boilerplate) => {
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
                  <p dangerouslySetInnerHTML={{__html: boilerplate.text}}></p>
                  <p>Organization: {boilerplate.organization_name}</p>
                  <p>Category: {boilerplate.category_name}</p>
                  <p>Wordcount: {boilerplate.wordcount}</p>
                  </Card.Body>
              </Card>
              <br />
            </div>
          );
        })
        } */}

        {/* {this.state.filteredBoilerplates.map((boilerplate) => {
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
                  <p dangerouslySetInnerHTML={{__html: boilerplate.text}}></p>
                  <p>Organization: {boilerplate.organization_name}</p>
                  <p>Category: {boilerplate.category_name}</p>
                  <p>Wordcount: {boilerplate.wordcount}</p>
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

export default Boilerplates;