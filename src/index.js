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

    // Default map location focus
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

  // Sums up the "isActive" in the carList
  countActive(carList) {
    var notifNumber = 0;
    for (var i=0; i < carList.length; ++i) {
      notifNumber += carList[i].isActive;
    }
    return notifNumber;
  }

  // Creates the drawer list
  createDrawerNav(carList, title, key, openImmediately, color, notifNum) {
    return (
      <AppDrawerNavItem depth="0" key={key} openImmediately={openImmediately}
                        title={title} color={color} notifNum={notifNum}>
        {carList.map(option => (
          <AppDrawerNavItem depth="1" key={key} title={option.carName} isActiveNotif={option.isActive}/>
        ))}
      </AppDrawerNavItem>
    );
  }

  render() {
    // List for each Header
    const service = [
      {carName: "Alpha", isActive: 1},
      {carName: "Bravo", isActive: 0},
      {carName: "Charlie", isActive: 1},
    ];
    const standby = [
      {carName: "Echo", isActive: 0},
    ];
    const out = [
      {carName: "Delta", isActive: 0},
    ];

    var notifServiceNumber = this.countActive(service);
    var notifStandbyNumber = this.countActive(standby);
    var notifOutNumber = this.countActive(out);

    // Formatting the nested menu
    const carListService = 
      this.createDrawerNav(service, "Cars in Service", "IN", true, "#00FF04", notifServiceNumber);
    const carListStandby = 
      this.createDrawerNav(standby, "Cars Standing By", "STANDBY", false, "#FFDB6A", notifStandbyNumber);
    const carListOut = 
      this.createDrawerNav(out, "Cars Out of Service", "OUT", false, "#7E7E7E", notifOutNumber);

    const { lng, lat, zoom } = this.state;

    return (
      <div>
        <Drawer variant="permanent">
          <List>{carListService}</List>
          <Divider/>
          <List>{carListStandby}</List>
          <Divider/>
          <List>{carListOut}</List>
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
