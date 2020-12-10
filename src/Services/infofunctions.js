import React from 'react';

//count words
export const countWords = (string) => {
  if (string) {
    return (string.split(" ").length);
  } else {
    return 0;
  }
};

//search boilerplates (and eventually bios) functions
//track input from search form

export const onSearchTextChanged = (event) => {
  const value = event.target.value;
  let searchSuggestions = [];
  if (value.length > 0) {
    // const regex = new RegExp(`^${value}`, 'i');
    searchSuggestions = this.state.boilerplates.filter((boilerplate) => {
      return boilerplate.title.toLowerCase().indexOf(value) !== -1;
    })
    console.log(searchSuggestions);
  }
  this.setState(() => ({ searchSuggestions, searchText: value }));
}

//display search results in render
export const renderSearchSuggestions = () => {
  if (searchSuggestions.length === 0) {
    return null;
  }
  return (
    <div>
      {searchSuggestions.map((boilerplate) => (
        <li
          key={boilerplate.id}
          onClick={() => handleSearchSuggestionSelect(boilerplate)}
        >
          {boilerplate.title}, {boilerplate.wordcount} words
        </li>
      ))}
    </div>
  );
}

//choose selected search results, add into text input field, add boilerplate
export const handleSearchSuggestionSelect = (value) => {
  let quill_text = this.state.quill_text;
  quill_text += value.text;
  this.setState({
    searchText: '',
    searchSuggestions: [],
    quill_text: quill_text
  });
};