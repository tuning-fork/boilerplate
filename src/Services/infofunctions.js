countWords(string) {
  if (string) {
    return (string.split(" ").length);
  } else {
    return 0;
  }
}
onSearchTextChanged = (event) => {
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

  handleSearchSuggestionSelect = (value) => {
    let quill_text = this.state.quill_text;
    quill_text += value.text;
    this.setState({
      searchText: '',
      searchSuggestions: [],
      quill_text: quill_text
    });
  };

  renderSearchSuggestions() {
    console.log(this.state.searchSuggestions);
    if (this.state.searchSuggestions.length === 0) {
      return null;
    }
    return (
      <div>
        {this.state.searchSuggestions.map((boilerplate) => (
          <li
            key={boilerplate.id}
            onClick={() => this.handleSearchSuggestionSelect(boilerplate)}
          >
            {boilerplate.title}, {boilerplate.wordcount} words
          </li>
        ))}
      </div>
    );
  }