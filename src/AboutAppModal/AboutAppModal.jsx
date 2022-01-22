import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import './AboutAppModal.css';

class AboutAppModal extends React.Component {

  render() {
    const style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '50%',
      bgcolor: 'background.paper',
      border: '2px solid #000',
      boxShadow: 24,
      p: 4,
    };

    return (
      <Modal open={this.props.open}>
        <Box sx={style}>
          <div className="right-align">
            <CloseIcon onClick={this.props.onClose} className='button' />
          </div>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            About This App
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2, fontSize: '.75em' }}>
            This app is a tool that can be used to determine if time- or temperature-sensitive parcel shipments should be shipped
            out via FedEx or UPS on the current day.<br />
            <br />
            After inputting Origin & Destination search cities, the app will check for severe weather
            in both of those cities, as well as the FedEx and UPS hubs (Memphis and Cincinnati).  If severe weather is found
            in either of the input cities, the result will be a red STOP sign. If severe weather is found at either of the
            courier hubs, the result will be a warning sign and an indication of which courier should be avoided.
            You can also click on the smaller STOP sign icon next to a specific city and view
            the severe weather details for that city.<br />
            <br />
            API's used are: Google Places API & Open Weather API
          </Typography>
        </Box>
      </Modal>
    );
  }
}

export default AboutAppModal;