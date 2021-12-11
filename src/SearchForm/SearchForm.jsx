import React from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import Button from '@mui/material/Button';
import AirplaneTicketTwoToneIcon from '@mui/icons-material/AirplaneTicketTwoTone';
import './SearchForm.css';

class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      originCity: '',
      destinationCity: '',
      originLatLng: '',
      destinationLatLng: '',
      originSelected: false,
      destinationSelected: false
    };
  }

  handleOriginChange = originCity => {
    this.setState({ originCity, originSelected: false, originLatLng: '' });
  };

  handleDestinationChange = destinationCity => {
    this.setState({ destinationCity, destinationSelected: false, destinationLatLng: '' });
  };

  handleOriginSelect = originCity => {
    // this.setState({originCity, originSelected: true});
    geocodeByAddress(originCity)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        this.setState({originCity, originSelected: true, originLatLng: latLng});
        console.log('Origin City LatLng', latLng)
      })
      .catch(error => console.error('Error', error));
  };

  handleDestinationSelect = destinationCity => {
    // this.setState({destinationCity, destinationSelected: true});
    geocodeByAddress(destinationCity)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        this.setState({destinationCity, destinationSelected: true, destinationLatLng: latLng});
        console.log('Desination City LatLng', latLng)
      })
      .catch(error => console.error('Error', error));
  };

  handleSubmit = () => {
    this.props.submitCities(
      {
        cityName: this.state.originCity, latLng: this.state.originLatLng
      },
      {
        cityName: this.state.destinationCity, latLng: this.state.destinationLatLng
      }
    );
  }

  render() {

    let locationsSelected = this.state.originSelected && this.state.destinationSelected;
    let SubmitButton;
    if (locationsSelected) {
      SubmitButton = <Button style={{marginTop: '2em'}} variant="contained" onClick={this.handleSubmit}>Submit</Button>
    } else {
      SubmitButton = <Button style={{marginTop: '2em'}} variant="contained" disabled>Submit</Button>
    };

    const searchOptions = {
      componentRestrictions: {country: ['us']},
      types: ['(cities)']
    }

    return (
      <div>
        {/* <LocalShippingIcon sx={{height: '3em', width: 'auto', color: 'rgba(0,0,0,0.60)'}}/> */}
        <AirplaneTicketTwoToneIcon sx={{height: '3em', width: 'auto', color: 'rgba(0,0,0,0.60)'}}/>
        <h1 id='search-form-header'>Should It Ship?</h1>
        <PlacesAutocomplete
          value={this.state.originCity}
          onChange={this.handleOriginChange}
          onSelect={this.handleOriginSelect}
          searchOptions={searchOptions}
        >
          {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
            <div className='search-box-container'>
              <input
                {...getInputProps({
                  placeholder: 'Origin City...',
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
                    : { backgroundColor: 'rgba(0,0,0,0.4)', cursor: 'pointer' };
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
            <div className='search-box-container'>
              <input
                {...getInputProps({
                  placeholder: 'Destination City...',
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
                    : { backgroundColor: 'rgba(0,0,0,0.4)', cursor: 'pointer' };
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

export default SearchForm;