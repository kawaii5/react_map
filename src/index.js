import React from 'react';
import ReactDOM from 'react-dom';

import mapboxgl from 'mapbox-gl';

import List from '@material-ui/core/List';
import Drawer from '@material-ui/core/Drawer';
import AppDrawerNavItem from './AppDrawerNavItem';

mapboxgl.accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      lng: 5,
      lat: 34,
      zoom: 1.5
    };
  }

  componentDidMount() {
    const { lng, lat, zoom } = this.state;

    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v9',
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
    const mailFolderListItems = (
      <div>
        <AppDrawerNavItem depth="0" key="IN" openImmediately="true" title="Cars in Service">
          <AppDrawerNavItem depth="1" key="IN" openImmediately="true" title="Alpha">
          </AppDrawerNavItem>
          <AppDrawerNavItem depth="1" key="IN" openImmediately="true" title="Bravo">
          </AppDrawerNavItem>
          <AppDrawerNavItem depth="1" key="IN" openImmediately="true" title="Charlie">
          </AppDrawerNavItem>
        </AppDrawerNavItem>
        <AppDrawerNavItem depth="0" key="STANDINGBY" openImmediately="true" title="Cars Standing By">
        </AppDrawerNavItem>
        <AppDrawerNavItem depth="0" key="OUT" openImmediately="true" title="Cars Out of Service">
        </AppDrawerNavItem>
      </div>
    );

    const styles = theme => ({
      drawerPaper: {
        width: 250,
        position: 'left',
        backgroundColor: 'rbga(52,52,52,0.6)',
      },
      content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 3,
        minWidth: 0, // So the Typography noWrap works
      },
      toolbar: theme.mixins.toolbar,
    });


    const { lng, lat, zoom } = this.state;

    return (
      <div>
        <Drawer
          variant="permanent"
          classes={{
            paper: styles.drawerPaper,
          }}
        >
          <div className={styles.toolbar} />
          <List>{mailFolderListItems}</List>
        </Drawer>

        <main className={styles.content}>
          <div className="inline-block absolute top right mt12 ml12 bg-darken75 color-white z1 py6 px12 round-full txt-s txt-bold">
            <div>{`Longitude: ${lng} Latitude: ${lat} Zoom: ${zoom}`}</div>
          </div>
          <div ref={el => this.mapContainer = el} className="absolute top right left bottom" />
        </main>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('sidebar'));
