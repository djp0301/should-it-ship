import React from 'react';
import Button from '@mui/material/Button';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';

class Results extends React.Component {
  render() {
    return (
      <div>
        <div>Results Here!</div>
        <Button variant="contained" startIcon={<KeyboardReturnIcon />} onClick={this.props.handleBackToSearchClick}>Return to Search</Button>
      </div>
    )
  }
}

export default Results;