import React from 'react';
import Button from '@mui/material/Button';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import Card from '@mui/material/Card';
import CityCard from '../CityCard/CityCard.jsx';
import './Results.css';

class Results extends React.Component {
  render() {

    let originCity = this.props.origin.cityName.slice(0,-5);
    let destinationCity = this.props.destination.cityName.slice(0,-5);
    return (
      <div className='results'>
        <h1>{originCity} to {destinationCity}</h1>
        <CityCard city={this.props.origin} type={'origin'} />
        <CityCard city={this.props.destination} type={'destination'} />
        <CityCard city={{cityName: 'Memphis, TN, USA', latLng: {lat: 35.117500, lng: -89.971107}}}>FedEx (Memphis, TN)</CityCard>
        <CityCard city={{cityName: 'Louisville, KY, USA', latLng: {lat: 38.328732, lng: -85.764771}}}>UPS (Louisville, KY)</CityCard>
        <Button style={{marginTop: '2em'}} variant="contained" startIcon={<KeyboardReturnIcon />} onClick={this.props.handleBackToSearchClick}>Return to Search</Button>
      </div>
    )
  }
}

export default Results;