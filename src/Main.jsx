import React from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import Button from '@mui/material/Button';
import './App.css';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      originCity: '',
      destinationCity: '',
      originSelected: false,
      destinationSelected: false
    };
  }

  handleOriginChange = originCity => {
    this.setState({ originCity, originSelected: false });
  };

  handleDestinationChange = destinationCity => {
    this.setState({ destinationCity, destinationSelected: false});
  };

  handleOriginSelect = originCity => {
    this.setState({originCity, originSelected: true});
    geocodeByAddress(originCity)
      .then(results => getLatLng(results[0]))
      .then(latLng => console.log('Success', latLng))
      .catch(error => console.error('Error', error));
  };

  handleDestinationSelect = destinationCity => {
    this.setState({destinationCity, destinationSelected: true});
    geocodeByAddress(destinationCity)
      .then(results => getLatLng(results[0]))
      .then(latLng => console.log('Success', latLng))
      .catch(error => console.error('Error', error));
  };

  render() {

    let locationsSelected = this.state.originSelected && this.state.destinationSelected;
    let SubmitButton;
    if (locationsSelected) {
      SubmitButton = <Button variant="contained">Submit</Button>
    } else {
      SubmitButton = <Button variant="contained" disabled>Submit</Button>
    };

    const searchOptions = {
      componentRestrictions: {country: ['us']},
      types: ['(cities)']
    }

    return (
      <div>
        <PlacesAutocomplete
          value={this.state.originCity}
          onChange={this.handleOriginChange}
          onSelect={this.handleOriginSelect}
          searchOptions={searchOptions}
        >
          {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
            <div>
              <input
                {...getInputProps({
                  placeholder: 'Search Places ...',
                  className: 'location-search-input',
                })}
              />
              <div className="autocomplete-dropdown-container">
                {loading && <div>Loading...</div>}
                {suggestions.map(suggestion => {
                  const className = suggestion.active
                    ? 'suggestion-item--active'
                    : 'suggestion-item';
                  // inline style for demonstration purpose
                  const style = suggestion.active
                    ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                    : { backgroundColor: '#ffffff', cursor: 'pointer' };
                  return (
                    <div
                      {...getSuggestionItemProps(suggestion, {
                        className,
                        style,
                      })}
                    >
                      <span>{suggestion.description}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </PlacesAutocomplete>

        <PlacesAutocomplete
          value={this.state.destinationCity}
          onChange={this.handleDestinationChange}
          onSelect={this.handleDestinationSelect}
          searchOptions={searchOptions}
        >
          {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
            <div>
              <input
                {...getInputProps({
                  placeholder: 'Search Places ...',
                  className: 'location-search-input',
                })}
              />
              <div className="autocomplete-dropdown-container">
                {loading && <div>Loading...</div>}
                {suggestions.map(suggestion => {
                  const className = suggestion.active
                    ? 'suggestion-item--active'
                    : 'suggestion-item';
                  // inline style for demonstration purpose
                  const style = suggestion.active
                    ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                    : { backgroundColor: '#ffffff', cursor: 'pointer' };
                  return (
                    <div
                      {...getSuggestionItemProps(suggestion, {
                        className,
                        style,
                      })}
                    >
                      <span>{suggestion.description}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </PlacesAutocomplete>

        {SubmitButton}
      </div>
    );
  }
}

export default Main;