import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DangerousIcon from '@mui/icons-material/Dangerous';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
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
      //DELETE THE FOLLOWING LINES
      this.props.setLocation({hasAlert: Math.random() < 0.5, alerts: 'API Error - Genererated Fake Data for Testing'})
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
    if (this.props.loaded && this.props.hasAlert) {
      WeatherAlert = <DangerousIcon sx={{maxHeight: '1em', width: '33%'}} className='rejectionIcon' />;
      MoreInfoLink = <p>Details</p>;
    } else if (this.props.loaded && !this.props.hasAlert) {
      WeatherAlert = <CheckCircleIcon sx={{maxHeight: '1em', width: '33%'}} className='approvalIcon' />
    }

    let CarrierName;
    if (this.props.carrier) {
      CarrierName = ` (${this.props.carrier} Hub)`
    }

    return (
      <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
        <TableCell align="center">{LoadingIndicator}{WeatherAlert}</TableCell>
        <TableCell align="center">{this.props.city.cityName.slice(0,-5)}{CarrierName}</TableCell>
        <TableCell align="center">Placeholder</TableCell>
      </TableRow>
      // <Card className='cityCard' style={{borderRadius: '1.25em'}}>
      //   {MoreInfoLink}
      //   {LoadingIndicator}
      //   {WeatherAlert}
      //   <p className='cityCardName'>{this.props.city.cityName.slice(0,-5)}</p>
      // </Card>
    )
  }
}

export default CityCard;