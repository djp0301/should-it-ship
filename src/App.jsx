import React from 'react';
import SearchForm from './SearchForm/SearchForm.jsx';
import Results from './Results/Results.jsx';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showResults: false,
      origin: '',
      destination: '',
    };

    this.submitCities = this.submitCities.bind(this);
    this.handleBackToSearchClick = this.handleBackToSearchClick.bind(this);
  }

  submitCities = (origin, destination) => {
    this.setState({ showResults: true, origin, destination })
  }

  handleBackToSearchClick = () => {
    this.setState({ showResults: false, origin: '', destination: '' })
  }

  render() {

    let ComponentToRender;
    if (this.state.showResults) {
      ComponentToRender = <Results origin={this.state.origin} destination={this.state.destination} handleBackToSearchClick={this.handleBackToSearchClick} />
    } else {
      ComponentToRender = <SearchForm submitCities={this.submitCities} />
    }

    return (
      <div id='content'>
        {ComponentToRender}
      </div>
    );
  }
}

export default App;