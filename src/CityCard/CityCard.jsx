import React from 'react';
import Card from '@mui/material/Card';
import CircularProgress from '@mui/material/CircularProgress';
import LinearProgress from '@mui/material/LinearProgress';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import FlagCircleIcon from '@mui/icons-material/FlagCircle';
import axios from 'axios';
import './CityCard.css';


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
      // let hasAlerts;
      // if (response.data.alerts) {
      //   hasAlerts = true;
      // } else {
      //   hasAlerts = false;
      // }
      // this.setState({loaded: true, severeWeather: hasAlerts})
      if (response.data.alerts) {
        this.props.setLocation({hasAlert: true, alerts: response.data.alerts})
      } else {
        this.props.setLocation({hasAlert: false})
      }
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
    if (!this.props.loaded) {
      LoadingIndicator = <CircularProgress className='loadingBar' />
    }

    let WeatherAlert;
    let MoreInfoLink;
    if (this.props.loaded && this.props.details.hasAlert) {
      WeatherAlert = <FlagCircleIcon sx={{height: '100%', width: 'auto'}} className='rejectionIcon' />;
      MoreInfoLink = <p>(Click card for more information)</p>;
    } else if (this.props.loaded && !this.props.details.hasAlert) {
      WeatherAlert = <CheckCircleIcon sx={{height: '100%', width: 'auto'}} className='approvalIcon' />
    }

    return (
      <Card className='cityCard' style={{borderRadius: '1.25em'}}>
        {MoreInfoLink}
        {LoadingIndicator}
        {WeatherAlert}
        <p className='cityCardName'>{this.props.city.cityName.slice(0,-5)}</p>
      </Card>
    )
  }
}

export default CityCard;