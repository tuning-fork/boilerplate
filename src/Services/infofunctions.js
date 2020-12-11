import React, { Component } from 'react';

export const countWords = (string) => {
    if (string) {
      return (string.split(" ").length);
    } else {
      return 0;
    }
  }

export const onTextChanged = (event) => {
    const value = event.target.value.toLowerCase();
    // console.log(value);
    let suggestions = [];
    if (value.length > 0) {
      // const regex = new RegExp(`^${value}`, 'i');
      suggestions = this.state.boilerplates.filter((boilerplate) => {
        return boilerplate.title.toLowerCase().indexOf(value) !== -1;
      })
      console.log(suggestions);
    }
    this.setState(() => ({ suggestions, searchText: value }));
  }

export const renderSuggestions = () => {
    // console.log(this.state.suggestions);
    if (this.state.suggestions.length === 0) {
      return null;
    }
    return (
      <div>
        {this.state.suggestions.map((boilerplate) => (
          <li
            key={boilerplate.id}
            onClick={() => suggestionSelected(boilerplate)}
          >
            {boilerplate.title}, {boilerplate.wordcount} words
          </li>
        ))}
      </div>
    );
}

export const suggestionSelected = (value) => {
    let quill_text = this.state.quill_text;
    quill_text += value.text;
    this.setState(() => ({
        searchText: '',
        suggestions: [],
        quill_text: quill_text
    }));
}