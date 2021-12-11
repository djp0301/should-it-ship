import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import CheckCircleTwoToneIcon from '@mui/icons-material/CheckCircleTwoTone';
import DangerousTwoToneIcon from '@mui/icons-material/DangerousTwoTone';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import axios from 'axios';
import './CityCard.css';


class CityCard extends React.Component {
  constructor(props) {
    super(props);
    this.clickDetailHandler = this.clickDetailHandler.bind(this);
  }

  componentDidMount() {
    axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${this.props.city.latLng.lat}&lon=${this.props.city.latLng.lng}&exclude=current,minutely,hourly,daily&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}`)
    .then((response) => {
      // handle success
      console.log(response);
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

  clickDetailHandler() {
    this.props.displayModal(this.props.alerts)
  }

  render() {

    let LoadingIndicator;
    if (!this.props.loaded) {
      LoadingIndicator = <CircularProgress className='loadingBar' />
    }

    let WeatherAlert;
    if (this.props.loaded && this.props.hasAlert) {
      WeatherAlert = <DangerousTwoToneIcon sx={{maxHeight: '1em', width: '33%'}} className='rejectionIcon' />;
    } else if (this.props.loaded && !this.props.hasAlert) {
      WeatherAlert = <CheckCircleTwoToneIcon sx={{maxHeight: '1em', width: '33%'}} className='approvalIcon' />
    }

    let CarrierName;
    if (this.props.carrier) {
      CarrierName = ` (${this.props.carrier} Hub)`
    }

    let DetailLink;
    if (this.props.hasAlert) {
      DetailLink = <p style={{cursor: 'pointer', color: 'rgb(25,118,210)'}} onClick={this.clickDetailHandler}>Click Here</p>
    }

    return (
      <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
        <TableCell align="center">{LoadingIndicator}{WeatherAlert}</TableCell>
        <TableCell align="center">{this.props.city.cityName.slice(0,-5)}{CarrierName}</TableCell>
        <TableCell align="center">{DetailLink}</TableCell>
      </TableRow>
    )
  }
}

export default CityCard;