import React from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import Button from '@mui/material/Button';
import InfoIcon from '@mui/icons-material/Info';
import AirplaneTicketTwoToneIcon from '@mui/icons-material/AirplaneTicketTwoTone';
import AboutAppModal from '../AboutAppModal/AboutAppModal.jsx';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { alpha } from '@mui/material/styles'
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
      destinationSelected: false,
      showAboutAppModal: false
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

  handleModalOpen = () => {
    this.setState({showAboutAppModal: true})
  }

  handleModalClose = () => {
    this.setState({showAboutAppModal: false})
  }

  render() {

    const theme = createTheme({
      palette: {
        primary: {
          // Purple and green play nicely together.
          main: '#90caf9',
        },
        secondary: {
          // This is green.A700 as hex.
          main: alpha('#292b2c', 0.6),
        },
      },
    });

    let locationsSelected = this.state.originSelected && this.state.destinationSelected;
    let SubmitButton;
    if (locationsSelected) {
      SubmitButton = <Button style={{marginTop: '2em', display: 'block', margin: 'auto'}} variant="contained" onClick={this.handleSubmit}>Submit</Button>
    } else {
      SubmitButton = <Button style={{marginTop: '2em', display: 'block', margin: 'auto'}} variant="contained" disabled>Submit</Button>
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

        <ThemeProvider theme={theme}>
          <Button id='about-app-button' style={{marginTop: '2em', marginLeft: 'auto', marginRight: 'auto'}} variant="outlined" color="secondary" startIcon={<InfoIcon />} onClick={this.handleModalOpen}>About This App</Button>
        </ThemeProvider>

        <AboutAppModal open={this.state.showAboutAppModal} onClose={this.handleModalClose}></AboutAppModal>
      </div>
    );
  }
}

export default SearchForm;