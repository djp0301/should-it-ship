import React from 'react';
import logo from './logo.svg';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import './App.css';

function Main() {
  const [address, setAddress] = React.useState("");
  const handleSelect = async value => {};

  return (
    <div>
      <PlacesAutocomplete value={address} onChange={setAddress} onSelect={handleSelect}>
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) =>
          <div>
            <input {...getInputProps({placeholder: "Type address"})}/>
            <div>
              {loading ? <div>...loading</div> : null}

              {suggestions.map((suggestion) => {
                return <div>{suggestion.description}</div>
              })}
            </div>
          </div>
        }
      </PlacesAutocomplete>
    </div>
  );
}

export default Main;
