import React, { Component, useState, useEffect } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { countWords } from "../Services/infofunctions";
import { useCurrentOrganizationContext } from "../Contexts/currentOrganizationContext";

export default function SectionsNew(props) {
  const [quillText, setQuillText] = useState("");
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [wordcount, setWordcount] = useState("");
  const [boilerplates, setBoilerplates] = useState([]);
  const [currentBoilerplate, setCurrentBoilerplate] = useState("");
  const [isHidden, setIsHidden] = useState(true);
  const [bios, setBios] = useState([]);
  const [titleArray, setTitleArray] = useState([]);
  const [loading, setLoading] = useState(true);
  const [suggestions, setSuggestions] = useState([]);
  const [searchText, setSearchText] = useState("");

  const [
    currentOrganizationStore,
    currentOrganizationDispatch,
  ] = useCurrentOrganizationContext();

  useEffect(() => {
    axios
      .get(
        `/api/organizations/${currentOrganizationStore.currentOrganization.id}/boilerplates`,
        {
          headers: { Authorization: `Bearer ${localStorage.token}` },
        }
      )
      .then((response) => {
        setBoilerplates(response.data);
      });
    axios
      .get(
        `/api/organizations/${currentOrganizationStore.currentOrganization.id}/bios`,
        {
          headers: { Authorization: `Bearer ${localStorage.token}` },
        }
      )
      .then((response) => {
        setBios(response.data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  const clearForm = () => {
    setQuillText("");
    setTitle("");
    setText("");
    setSortOrder("");
    setWordcount("");
    setCurrentBoilerplate("");
  };

  const toggleHidden = () => {
    setIsHidden(!isHidden);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newSection = {
      grant_id: props.grant_id,
      title: title,
      text: quillText,
      sort_order: props.sort_number + 1,
      wordcount: countWords(quillText),
    };
    axios
      .post(
        `/api/organizations/${currentOrganizationStore.currentOrganization.id}/grants/${props.grant_id}/sections`,
        newSection,
        {
          headers: { Authorization: `Bearer ${localStorage.token}` },
        }
      )
      .then((response) => {
        if (response.data) {
          props.addNewSections(response.data);
          toggleHidden();
          clearForm();
        }
      })
      .catch((error) => {
        console.log("section creation error", error);
      });
  };

  const onTextChanged = (event) => {
    const value = event.target.value.toLowerCase();
    let suggestions = [];
    if (value.length > 0) {
      suggestions = boilerplates.filter((boilerplate) => {
        return boilerplate.title.toLowerCase().indexOf(value) !== -1;
      });
      console.log(suggestions);
    }
    setSuggestions(suggestions);
    setSearchText(value);
  };

  const suggestionSelected = (value) => {
    let addQuillText = quillText;
    addQuillText += value.text;
    setSearchText("");
    setSuggestions([]);
    setQuillText(addQuillText);
  };

  const renderSuggestions = () => {
    console.log(suggestions);
    if (suggestions.length === 0) {
      return null;
    }
    return (
      <div>
        {suggestions.map((boilerplate) => (
          <li
            key={boilerplate.id}
            onClick={() => suggestionSelected(boilerplate)}
          >
            {boilerplate.title}, {boilerplate.wordcount} words
          </li>
        ))}
      </div>
    );
  };

  const handleSelect = (event) => {
    let selectedQuillText = quillText;
    selectedQuillText += ` ${event.target.value}`;
    setQuillText(selectedQuillText);
  };

  return (
    <div>
      {isHidden ? (
        <Button onClick={toggleHidden}>Add Section</Button>
      ) : (
        <Button onClick={toggleHidden}>Close</Button>
      )}
      <br />
      <br />
      {!isHidden ? (
        <Card>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Add Boilerplate to text field below</Form.Label>
                {/* <Form.Group> */}
                <div>
                  <label>Search Boilerplate by title </label>
                  <input
                    type="text"
                    value={searchText}
                    onChange={onTextChanged}
                  />
                  {renderSuggestions()}
                </div>
                {/* </Form.Group> */}
                <Form.Control
                  as="select"
                  name="currentBoilerplate"
                  value={currentBoilerplate}
                  onChange={handleSelect}
                >
                  <option value="" disabled>
                    Select Boilerplate
                  </option>
                  {boilerplates.map((boilerplate) => {
                    return (
                      <option
                        key={boilerplate.id}
                        value={boilerplate.text}
                        onChange={(event) =>
                          setCurrentBoilerplate(event.target.value)
                        }
                      >
                        {boilerplate.title}
                      </option>
                    );
                  })}
                </Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>Add Bio Text to text field below</Form.Label>
                <Form.Control
                  as="select"
                  name="currentBoilerplate"
                  value={currentBoilerplate}
                  onChange={handleSelect}
                >
                  <option value="" disabled>
                    Select Bio
                  </option>
                  {bios.map((bio) => {
                    return (
                      <option
                        key={bio.id}
                        value={`${bio.first_name} ${bio.last_name}: ${bio.text}`}
                        onChange={(event) =>
                          setCurrentBoilerplate(event.target.value)
                        }
                      >
                        {`${bio.first_name} ${bio.last_name}`}
                      </option>
                    );
                  })}
                </Form.Control>
              </Form.Group>
              <Form.Label>Grant Section Text</Form.Label>
              <ReactQuill
                // name="quill_text"
                value={quillText}
                onChange={(value) => setQuillText(value)}
              />
              {/* <Form.Group>
                  <Form.Label>Text</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="text"
                    value={this.state.text}
                    onChange={this.handleChange}
                    rows="4"
                    cols="50"
                    required
                  ></Form.Control>
                </Form.Group> */}
              <Form.Group>
                <Form.Label>Word Count</Form.Label>
                <p>{countWords(quillText)}</p>
              </Form.Group>
              <div className="text-center">
                <Button type="submit">Submit New Section</Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      ) : null}
    </div>
  );
}

//prior version for searching boilerplate:
// import React, { Component } from 'react';
// import axios from 'axios';
// import Form from 'react-bootstrap/Form';
// import Card from 'react-bootstrap/Card';
// import Button from 'react-bootstrap/Button';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
// import { countWords } from '../Services/infofunctions';

// class SectionsNew extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       quill_text: '',
//       title: '',
//       text: '',
//       sort_order: '',
//       wordcount: '',
//       boilerplates: [],
//       currentBoilerplate: '',
//       isHidden: true,
//       bios: [],
//       title_array: [],
//       loading: true,
//       suggestions: [],
//       searchText: '',
//       // addText: ''
//     };
//     this.handleSubmit = this.handleSubmit.bind(this);
//     this.handleChange = this.handleChange.bind(this);
//     // this.countWords = this.countWords.bind(this);
//     this.quillChange = this.quillChange.bind(this);
//     // this.suggestionSelected = this.suggestionSelected.bind(this);
//     // this.onTextChanged = this.onTextChanged.bind(this);
//     // this.renderSuggestions = this.renderSuggestions.bind(this);
//   }

//   clearForm = () => {
//     this.setState({
//       quill_text: "",
//       title: '',
//       text: '',
//       sort_order: '',
//       wordcount: '',
//       currentBoilerplate: '',
//       // addText: ''
//     });
//   };

//   toggleHidden() {
//     this.setState({
//       isHidden: !this.state.isHidden,
//     });
//   }

//   componentDidMount() {
//     axios
//       .get('/api/boilerplates',
//         { headers: { Authorization: `Bearer ${localStorage.token}` } })
//       .then((response) => {
//         this.setState({
//           boilerplates: response.data
//         });
//       })
//     axios
//       .get('/api/bios',
//         { headers: { Authorization: `Bearer ${localStorage.token}` } })
//       .then((response) => {
//         this.setState({
//           bios: response.data,
//           loading: false,
//         });
//       })
//       .catch((error) => console.log(error));
//   }

//   handleSubmit(event) {
//     const {
//       title, quill_text
//     } = this.state;
//     axios
//       .post('/api/sections', {
//         grant_id: this.props.grant_id,
//         title: title,
//         text: quill_text,
//         sort_order: this.props.sort_number + 1,
//         wordcount: countWords(this.state.quill_text)
//       },
//         { headers: { Authorization: `Bearer ${localStorage.token}` } })
//       .then((response) => {
//         if (response.data) {
//           this.props.updateNewSections(response.data);
//           this.toggleHidden();
//           this.clearForm();
//         }
//       })
//       .catch((error) => {
//         console.log('section creation error', error);
//       });
//     event.preventDefault();
//   }

//   // countWords(string) {
//   //   if (string) {
//   //     return (string.split(" ").length);
//   //   } else {
//   //     return 0;
//   //   }
//   // }

//   handleChange(event) {
//     this.setState({
//       [event.target.name]: event.target.value,
//     });
//   }

//   // users = users.filter(function(user) {
//   //   return user.name.toLowerCase().indexOf(q) != -1; // returns true or false
//   // });

//   // const result = words.filter(word => word.length > 6);

//   // const devReact = devs.filter(obj => obj.tech.includes("React")).map(obj => ({"name":obj.name, "tech":obj.tech}));
//   // console.log(devReact);

//   onTextChanged = (event) => {
//     const value = event.target.value;
//     let suggestions = [];
//     if (value.length > 0) {
//       // const regex = new RegExp(`^${value}`, 'i');
//       suggestions = this.state.boilerplates.filter((boilerplate) => {
//         return boilerplate.title.toLowerCase().indexOf(value) !== -1;
//       })
//       console.log(suggestions);
//     }
//     this.setState(() => ({ suggestions, searchText: value }));
//   }

//   suggestionSelected(value) {
//     let quill_text = this.state.quill_text;
//     quill_text += value.text;
//     this.setState(() => ({
//       searchText: '',
//       suggestions: [],
//       quill_text: quill_text
//     }));
//   }

//   // handleSuggestionSelect = (value) => {
//   //   // let newValue = value.title
//   //   let quill_text = this.state.quill_text;
//   //   quill_text += value.text;
//   //   this.setState({
//   //     searchText: '',
//   //     suggestions: [],
//   //     quill_text: quill_text
//   //   });
//   // };

//   renderSuggestions() {
//     console.log(this.state.suggestions);
//     // const { suggestions } = this.state;
//     if (this.state.suggestions.length === 0) {
//       return null;
//     }
//     return (
//       <div>
//         {this.state.suggestions.map((boilerplate) => (
//           <li
//             key={boilerplate.id}
//             onClick={() => this.handleSuggestionSelect(boilerplate)}
//           >
//             {boilerplate.title}, {boilerplate.wordcount} words
//           </li>
//         ))}
//       </div>
//     );
//   }

//   quillChange(value) {
//     this.setState({ quill_text: value })
//   }

//   handleSelect = (event) => {
//     let quill_text = this.state.quill_text;
//     quill_text += ` ${event.target.value}`;
//     this.setState({
//       quill_text: quill_text
//     });
//   };

//   render() {
//     return (
//       <div>
//         {this.state.isHidden ?
//           <Button onClick={this.toggleHidden.bind(this)}>
//             Add Section
//         </Button> :
//           <Button onClick={this.toggleHidden.bind(this)}>
//             Close
//         </Button>
//         }
//         <br />
//         <br />
//         {!this.state.isHidden ? (
//           <Card>
//             <Card.Body>
//               <Form onSubmit={this.handleSubmit}>
//                 <Form.Group>
//                   <Form.Label>Title</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="title"
//                     value={this.state.title}
//                     onChange={this.handleChange}
//                     required
//                   />
//                 </Form.Group>
//                 <Form.Group>
//                   <Form.Label>Add Boilerplate to text field below</Form.Label>
//                   {/* <Form.Group> */}
//                   <div>
//                     <label>Search Boilerplate by title </label>
//                     <input
//                       type="text"
//                       value={this.state.searchText}
//                       onChange={this.onTextChanged}
//                     />
//                     {this.renderSuggestions()}
//                   </div>
//                   {/* </Form.Group> */}
//                   <Form.Control
//                     as="select"
//                     name="currentBoilerplate"
//                     value={this.state.currentBoilerplate}
//                     onChange={this.handleSelect}
//                   >
//                     <option value="" disabled>Select Boilerplate</option>
//                     {this.state.boilerplates.map(boilerplate => {
//                       return (
//                         <option
//                           key={boilerplate.id}
//                           value={boilerplate.text}
//                           onChange={this.handleChange}
//                         >
//                           {boilerplate.title}
//                         </option>
//                       );
//                     })}
//                   </Form.Control>
//                 </Form.Group>
//                 {/* <Form.Group> */}
//                 <div>
//                   <label>Search Boilerplate by title</label>
//                   <input
//                     type="text"
//                     value={this.state.searchText}
//                     onChange={this.onTextChanged}
//                   />
//                   {this.renderSuggestions()}
//                 </div>
//                 {/* </Form.Group> */}
//                 <Form.Group>
//                   <Form.Label>Add Bio Text to text field below</Form.Label>
//                   <Form.Control
//                     as="select"
//                     name="currentBoilerplate"
//                     value={this.state.currentBoilerplate}
//                     onChange={this.handleSelect}
//                   >
//                     <option value="" disabled>Select Bio</option>
//                     {this.state.bios.map(bio => {
//                       return (
//                         <option
//                           key={bio.id}
//                           value={`${bio.first_name} ${bio.last_name}: ${bio.text}`}
//                           onChange={this.handleChange}
//                         >
//                           {`${bio.first_name} ${bio.last_name}`}
//                         </option>
//                       );
//                     })}
//                   </Form.Control>
//                 </Form.Group>
//                 <Form.Label>Grant Section Text</Form.Label>
//                 <ReactQuill
//                   // name="quill_text"
//                   value={this.state.quill_text}
//                   onChange={this.quillChange}
//                 />
//                 {/* <Form.Group>
//                   <Form.Label>Text</Form.Label>
//                   <Form.Control
//                     as="textarea"
//                     name="text"
//                     value={this.state.text}
//                     onChange={this.handleChange}
//                     rows="4"
//                     cols="50"
//                     required
//                   ></Form.Control>
//                 </Form.Group> */}
//                 <Form.Group>
//                   <Form.Label>Word Count</Form.Label>
//                   <p>{countWords(this.state.quill_text)}</p>
//                 </Form.Group>
//                 <div className="text-center">
//                   <Button type="submit">
//                     Submit New Section
//                   </Button>
//                 </div>
//               </Form>
//             </Card.Body>
//           </Card>
//         ) : null}
//       </div>
//     );
//   }
// }

// export default SectionsNew;
