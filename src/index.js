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

  render() {
    const styles = theme => ({
      dark: {
        backgroundColor: '#F5F5F5F2',
      },
    });

    const carListService = (
      <AppDrawerNavItem depth="0" key="IN" openImmediately="true" title="Cars in Service" color="#00FF04" notifNum="2">
        <AppDrawerNavItem depth="1" key="IN" title="Alpha" isActiveNotif="true"></AppDrawerNavItem>
        <AppDrawerNavItem depth="1" key="IN" title="Bravo"></AppDrawerNavItem>
        <AppDrawerNavItem depth="1" key="IN" title="Charlie"></AppDrawerNavItem>
      </AppDrawerNavItem>
    );

    const carListStandby = (
      <AppDrawerNavItem depth="0" key="STANDINGBY" title="Cars Standing By" color="#FFDB6A">
        <AppDrawerNavItem depth="1" key="STANDINGBY" title="Echo"></AppDrawerNavItem>
      </AppDrawerNavItem>
    );

    const carListOut = (
      <AppDrawerNavItem depth="0" key="OUT" title="Cars Out of Service" color="#7E7E7E">
        <AppDrawerNavItem depth="1" key="OUT" title="Delta"></AppDrawerNavItem>
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

ReactDOM.render(<App />, document.getElementById('sidebar'));
