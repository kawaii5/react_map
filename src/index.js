import React from 'react';
import ReactDOM from 'react-dom';

import mapboxgl from 'mapbox-gl';

import List from '@material-ui/core/List';
import Drawer from '@material-ui/core/Drawer';
import AppDrawerNavItem from './AppDrawerNavItem';
import Divider from '@material-ui/core/Divider';

mapboxgl.accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      lng: -120,
      lat: 33,
      zoom: 5
    };
  }

  componentDidMount() {
    const { lng, lat, zoom } = this.state;

    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/dark-v9',
      center: [lng, lat],
      zoom
    });

    map.on('move', () => {
      const { lng, lat } = map.getCenter();

      this.setState({
        lng: lng.toFixed(4),
        lat: lat.toFixed(4),
        zoom: map.getZoom().toFixed(2)
      });
    });
  }

  ObjectLength( object ) {
    var length = 0;
    for( var key in object ) {
        if( object.hasOwnProperty(key) ) {
            ++length;
        }
    }
    return length;
  };

  render() {
    const styles = theme => ({
      dark: {
        backgroundColor: '#F5F5F5F2',
      },
    });

    const service = [
      {key: "Alpha", value: 1},
      {key: "Bravo", value: 0},
      {key: "Charlie", value: 1},
    ];
    const standby = [
      {key: "Echo", value: 0},
    ];
    const out = [
      {key: "Delta", value: 0},
    ];

    var notifNumber = 0;
    for (var i=0; i < service.length; ++i) {
      notifNumber += service[i].value;
    }

    const carListService = (
      <AppDrawerNavItem depth="0" key="IN" openImmediately="true" title="Cars in Service" color="#00FF04" notifNum={notifNumber}> 
        {service.map(option => (
          <AppDrawerNavItem depth="1" key="IN" title={option.key} isActiveNotif={option.value}/>
        ))}
      </AppDrawerNavItem>
    );

    const carListStandby = (
      <AppDrawerNavItem depth="0" key="STANDINGBY" title="Cars Standing By" color="#FFDB6A">
        {standby.map(option => (
          <AppDrawerNavItem depth="1" key="STANDINGBY" title={option.key} isActiveNotif={option.value}/>
        ))}
      </AppDrawerNavItem>
    );

    const carListOut = (
      <AppDrawerNavItem depth="0" key="OUT" title="Cars Out of Service" color="#7E7E7E">
        {out.map(option => (
          <AppDrawerNavItem depth="1" key="OUT" title={option.key} isActiveNotif={option.value}/>
        ))}
      </AppDrawerNavItem>
    );

    const { lng, lat, zoom } = this.state;

    return (
      <div style={{backgroundColor: '#F5F5F5F2'}}>
        <Drawer style={{backgroundColor: '#F5F5F5F2'}} variant="permanent">
          <List className={styles.dark}>{carListService}</List>
          <Divider/>
          <List className={styles.dark}>{carListStandby}</List>
          <Divider/>
          <List className={styles.dark}>{carListOut}</List>
          <Divider/>
        </Drawer>
        <div className="inline-block absolute top right mt12 ml12 bg-darken75 color-white z1 py6 px12 round-full txt-s txt-bold">
          <div>{`Longitude: ${lng} Latitude: ${lat} Zoom: ${zoom}`}</div>
        </div>
        <div ref={el => this.mapContainer = el} className="absolute top right left bottom" />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('application'));
