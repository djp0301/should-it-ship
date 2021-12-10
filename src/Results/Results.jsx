import React from 'react';
import Button from '@mui/material/Button';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import Card from '@mui/material/Card';
import CityCard from '../CityCard/CityCard.jsx';
import './Results.css';

class Results extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      originLoaded: false,
      originDetails: false,
      destinationLoaded: false,
      destinationDetails: false,
      memphisLoaded: false,
      memphisDetails: false,
      louisvilleLoaded: false,
      louisvilleDetails: false
    }

    this.setOrigin = this.setOrigin.bind(this);
    this.setDestination = this.setDestination.bind(this);
    this.setMemphis = this.setMemphis.bind(this);
    this.setLouisville = this.setLouisville.bind(this);
  }

  setOrigin = (details) => {
    this.setState({originLoaded: true, originDetails: details})
  }

  setDestination = (details) => {
    this.setState({destinationLoaded: true, destinationDetails: details})
  }

  setMemphis = (details) => {
    this.setState({memphisLoaded: true, memphisDetails: details})
  }

  setLouisville = (details) => {
    this.setState({louisvilleLoaded: true, louisvilleDetails: details})
  }


  render() {

    let originCity = this.props.origin.cityName.slice(0,-5);
    let destinationCity = this.props.destination.cityName.slice(0,-5);
    return (
      <div className='results'>
        <h1>{originCity} to {destinationCity}</h1>
        <CityCard city={this.props.origin} type={'origin'} setLocation={this.setOrigin} loaded={this.state.originLoaded} details={this.state.originDetails} />
        <CityCard city={this.props.destination} type={'destination'} setLocation={this.setDestination} loaded={this.state.destinationLoaded} details={this.state.destinationDetails} />
        <CityCard city={{cityName: 'Memphis, TN, USA', latLng: {lat: 35.117500, lng: -89.971107}}} setLocation={this.setMemphis} loaded={this.state.memphisLoaded} details={this.state.memphisDetails}>FedEx (Memphis, TN)</CityCard>
        <CityCard city={{cityName: 'Louisville, KY, USA', latLng: {lat: 38.328732, lng: -85.764771}}} setLocation={this.setLouisville} loaded={this.state.louisvilleLoaded} details={this.state.louisvilleDetails}>UPS (Louisville, KY)</CityCard>
        <Button style={{marginTop: '2em', marginLeft: 'auto', marginRight: 'auto'}} variant="contained" startIcon={<KeyboardReturnIcon />} onClick={this.props.handleBackToSearchClick}>Return to Search</Button>
      </div>
    )
  }
}

export default Results;