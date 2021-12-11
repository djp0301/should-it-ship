import React from 'react';
import Button from '@mui/material/Button';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import CircularProgress from '@mui/material/CircularProgress';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DangerousIcon from '@mui/icons-material/Dangerous';
import CityCard from '../CityCard/CityCard.jsx';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';
import './Results.css';

class Results extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      routeHasAlert: false,
      originLoaded: false,
      originHasAlert: false,
      destinationLoaded: false,
      destinationHasAlert: false,
      memphisLoaded: false,
      memphisHasAlert: false,
      louisvilleLoaded: false,
      louisvilleHasAlert: false
    }

    this.setOrigin = this.setOrigin.bind(this);
    this.setDestination = this.setDestination.bind(this);
    this.setMemphis = this.setMemphis.bind(this);
    this.setLouisville = this.setLouisville.bind(this);
  }

  setOrigin = (details) => {
    if (details.hasAlert) {
      this.setState({originLoaded: true, originHasAlert: true, routeHasAlert: true})
    } else {
      this.setState({originLoaded: true})
    }
  }

  setDestination = (details) => {
    if (details.hasAlert) {
      this.setState({destinationLoaded: true, destinationHasAlert: true, routeHasAlert: true})
    } else {
      this.setState({destinationLoaded: true})
    }
  }

  setMemphis = (details) => {
    if (details.hasAlert) {
      this.setState({memphisLoaded: true, memphisHasAlert: true, routeHasAlert: true})
    } else {
      this.setState({memphisLoaded: true})
    }
  }

  setLouisville = (details) => {
    if (details.hasAlert) {
      this.setState({louisvilleLoaded: true, louisvilleHasAlert: true, routeHasAlert: true})
    } else {
      this.setState({louisvilleLoaded: true})
    }
  }


  render() {
    let originCity = this.props.origin.cityName.slice(0,-5);
    let destinationCity = this.props.destination.cityName.slice(0,-5);
    let OverallResult;

    if (!this.state.originLoaded || !this.state.destinationLoaded || !this.state.memphisLoaded || !this.state.louisvilleLoaded) {
      OverallResult = <CircularProgress className='loadingBar' />
    } else {
      if (!this.state.routeHasAlert) {
        OverallResult = <CheckCircleIcon sx={{height: '3em', width: 'auto', marginBottom: '1em'}} className='approvalIcon' />
      } else {
        OverallResult = <DangerousIcon sx={{height: '3em', width: 'auto', marginBottom: '1em'}} className='rejectionIcon' />
      }
    }

    return (
      <div className='results'>
        <h1>{originCity} to {destinationCity}</h1>
        {OverallResult}

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Result</TableCell>
                <TableCell align="center">Location</TableCell>
                <TableCell align="center">More Information</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <CityCard city={this.props.origin} type={'origin'} setLocation={this.setOrigin} loaded={this.state.originLoaded} hasAlert={this.state.originHasAlert} />
              <CityCard city={this.props.destination} type={'destination'} setLocation={this.setDestination} loaded={this.state.destinationLoaded} hasAlert={this.state.destinationHasAlert} />
              <CityCard city={{cityName: 'Memphis, TN, USA', latLng: {lat: 35.117500, lng: -89.971107}}} setLocation={this.setMemphis} loaded={this.state.memphisLoaded} hasAlert={this.state.memphisHasAlert} carrier='FedEx' />
              <CityCard city={{cityName: 'Louisville, KY, USA', latLng: {lat: 38.328732, lng: -85.764771}}} setLocation={this.setLouisville} loaded={this.state.louisvilleLoaded} hasAlert={this.state.louisvilleHasAlert} carrier='UPS' />
            </TableBody>
          </Table>
        </TableContainer>


        <Button style={{marginTop: '2em', marginLeft: 'auto', marginRight: 'auto'}} variant="contained" startIcon={<KeyboardReturnIcon />} onClick={this.props.handleBackToSearchClick}>Return to Search</Button>
      </div>
    )
  }
}

export default Results;