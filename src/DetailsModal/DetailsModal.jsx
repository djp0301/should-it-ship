import React from 'react';
import Button from '@mui/material/Button';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import './DetailsModal.css';

class DetailsModal extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {

    let allMessages = this.props.details.alerts.map((alert) => {
      return(
        <div>
          <hr></hr>
          <h2>{alert.event}</h2>
          <div>
            <strong>Active Until: </strong><span>{new Date(alert.end * 1000).toLocaleString()}</span>
          </div>
          <div>
            <p>{alert.description}</p>
          </div>
        </div>
      )
    })

    return(
      <div className='results' style={{maxHeight: '80vh'}}>
        <div className='alert-details'>
          <h1>{this.props.details.cityName.slice(0,-5)}</h1>
          <em>Current Severe Weather Alerts</em>
          <div className='alert-details' style={{overflow: 'auto', maxHeight: '55vh'}}>
            {allMessages}
          </div>
          <Button id='return-to-results-button' style={{marginTop: '2em', marginLeft: 'auto', marginRight: 'auto'}} variant="contained" startIcon={<KeyboardReturnIcon />} onClick={this.props.closeModal}>Return to Results</Button>
        </div>
      </div>
    )
  }
}

export default DetailsModal;