import React from 'react';
import Button from '@mui/material/Button';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import CircularProgress from '@mui/material/CircularProgress';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DangerousTwoToneIcon from '@mui/icons-material/DangerousTwoTone';
import WarningTwoToneIcon from '@mui/icons-material/WarningTwoTone';
import CityCard from '../CityCard/CityCard.jsx';
import DetailsModal from '../DetailsModal/DetailsModal.jsx';
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
      originAlerts: null,
      destinationLoaded: false,
      destinationHasAlert: false,
      destinationAlerts: null,
      memphisLoaded: false,
      memphisHasAlert: false,
      memphisAlerts: null,
      louisvilleLoaded: false,
      louisvilleHasAlert: false,
      louisvilleAlerts: null,
      displayDetailsModal: false,
      modalDetails: null
    }

    this.setOrigin = this.setOrigin.bind(this);
    this.setDestination = this.setDestination.bind(this);
    this.setMemphis = this.setMemphis.bind(this);
    this.setLouisville = this.setLouisville.bind(this);
    this.displayModal = this.displayModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  setOrigin = (details) => {
    if (details.hasAlert) {
      this.setState({originLoaded: true, originHasAlert: true, routeHasAlert: true, originAlerts: details.alerts})
    } else {
      this.setState({originLoaded: true})
    }
  }

  setDestination = (details) => {
    if (details.hasAlert) {
      this.setState({destinationLoaded: true, destinationHasAlert: true, routeHasAlert: true, destinationAlerts: details.alerts})
    } else {
      this.setState({destinationLoaded: true})
    }
  }

  setMemphis = (details) => {
    if (details.hasAlert) {
      this.setState({memphisLoaded: true, memphisHasAlert: true, routeHasAlert: true, memphisAlerts: details.alerts})
    } else {
      this.setState({memphisLoaded: true})
    }
  }

  setLouisville = (details) => {
    if (details.hasAlert) {
      this.setState({louisvilleLoaded: true, louisvilleHasAlert: true, routeHasAlert: true, louisvilleAlerts: details.alerts})
    } else {
      this.setState({louisvilleLoaded: true})
    }
  }

  displayModal(alerts, cityName) {
    this.setState({displayModal: true, modalDetails: {alerts, cityName}})
  }

  closeModal() {
    this.setState({displayModal: false, modalDetails: null})
  }

  render() {
    let originCity = this.props.origin.cityName.slice(0,-5);
    let destinationCity = this.props.destination.cityName.slice(0,-5);
    let OverallResult;

    if (!this.state.originLoaded || !this.state.destinationLoaded || !this.state.memphisLoaded || !this.state.louisvilleLoaded) {
      OverallResult = <CircularProgress className='loadingBar' />
    } else {
      if (!this.state.originHasAlert && !this.state.destinationHasAlert) {
        if (!this.state.memphisHasAlert && !this.state.louisvilleHasAlert) {
          OverallResult = <CheckCircleIcon sx={{height: '3em', width: 'auto', marginBottom: '1em'}} className='approvalIcon' />;
        } else if (this.state.memphisHasAlert && this.state.louisvilleHasAlert) {
          OverallResult = <DangerousTwoToneIcon sx={{height: '3em', width: 'auto', marginBottom: '1em'}} className='rejectionIcon overallIcon' />
        } else {
          OverallResult = <WarningTwoToneIcon sx={{height: '3em', width: 'auto', marginBottom: '1em'}} className='warningIcon overallIcon' />
        }
      } else {
        OverallResult = <DangerousTwoToneIcon sx={{height: '3em', width: 'auto', marginBottom: '1em'}} className='rejectionIcon overallIcon' />
      }
    }

    let CarrierExplanation;
    if (!this.state.originHasAlert && !this.state.destinationHasAlert) {
      if (this.state.memphisHasAlert && !this.state.louisvilleHasAlert) {
        CarrierExplanation = <em>Only ship via UPS</em>
      } else if (!this.state.memphisHasAlert && this.state.louisvilleHasAlert) {
        CarrierExplanation = <em>Only ship via FedEx</em>
      }
    }

    if (this.state.displayModal) {
      return (
        <DetailsModal details={this.state.modalDetails} closeModal={this.closeModal} />
      )
    } else {
      return (
        <div className='results'>
          <h1 className='results-header'>{originCity} to {destinationCity}</h1>
          {OverallResult}
          {CarrierExplanation}

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Result</TableCell>
                  <TableCell align="center">Location</TableCell>
                  <TableCell align="center">Details</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <CityCard city={this.props.origin} type={'origin'} setLocation={this.setOrigin} loaded={this.state.originLoaded} hasAlert={this.state.originHasAlert} alerts={this.state.originAlerts} displayModal={this.displayModal}/>
                <CityCard city={this.props.destination} type={'destination'} setLocation={this.setDestination} loaded={this.state.destinationLoaded} hasAlert={this.state.destinationHasAlert} alerts={this.state.destinationAlerts} displayModal={this.displayModal} />
                <CityCard city={{cityName: 'Memphis, TN, USA', latLng: {lat: 35.117500, lng: -89.971107}}} setLocation={this.setMemphis} loaded={this.state.memphisLoaded} hasAlert={this.state.memphisHasAlert} alerts={this.state.memphisAlerts} displayModal={this.displayModal} carrier='FedEx' />
                <CityCard city={{cityName: 'Louisville, KY, USA', latLng: {lat: 38.328732, lng: -85.764771}}} setLocation={this.setLouisville} loaded={this.state.louisvilleLoaded} hasAlert={this.state.louisvilleHasAlert} alerts={this.state.louisvilleAlerts} displayModal={this.displayModal} carrier='UPS' />
              </TableBody>
            </Table>
          </TableContainer>


          <Button id='return-home-button' style={{marginTop: '2em', marginLeft: 'auto', marginRight: 'auto'}} variant="contained" startIcon={<KeyboardReturnIcon />} onClick={this.props.handleBackToSearchClick}>Return to Search</Button>
        </div>
      )
    }
  }

}

export default Results;