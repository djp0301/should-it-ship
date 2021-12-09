import React from 'react';
import Card from '@mui/material/Card';
import CircularProgress from '@mui/material/CircularProgress';
import LinearProgress from '@mui/material/LinearProgress';

class CityCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false
    }
  }

  render() {

    let LoadingIndicator;

    if (!this.state.loaded) {
      LoadingIndicator = <div style={{width: '75%'}}><LinearProgress /></div>
    }

    return (
      <Card>
        <h3>{this.props.city.cityName.slice(0,-5)}</h3>
        {LoadingIndicator}
      </Card>
    )
  }
}

export default CityCard;