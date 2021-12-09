import React from 'react';
import Card from '@mui/material/Card';
import CircularProgress from '@mui/material/CircularProgress';
import LinearProgress from '@mui/material/LinearProgress';
import axios from 'axios';


class CityCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      severeWeather: false
    }

  }

  componentDidMount() {
    console.dir(process.env.REACT_APP_OPEN_WEATHER_API_KEY);
    axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${this.props.city.latLng.lat}&lon=${this.props.city.latLng.lng}&exclude=current,minutely,hourly,daily&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}`)
    .then((response) => {
      // handle success
      console.log(response);
      let hasAlerts;
      if (response.data.alerts) {
        hasAlerts = true;
      } else {
        hasAlerts = false;
      }
      this.setState({loaded: true, severeWeather: hasAlerts})
    })
    .catch((error) => {
      // handle error
      console.log(error);
    })
    .then(() => {
      // always executed
    });
  }

  render() {

    let LoadingIndicator;
    if (!this.state.loaded) {
      LoadingIndicator = <div style={{width: '75%'}}><LinearProgress /></div>
    }

    let WeatherAlert;
    if (this.state.loaded && this.state.severeWeather) {
      WeatherAlert = <div style={{color: 'red'}}>Sever Weather Detected!!</div>
    }

    return (
      <Card>
        <h3>{this.props.city.cityName.slice(0,-5)}</h3>
        {LoadingIndicator}
        {WeatherAlert}
      </Card>
    )
  }
}

export default CityCard;