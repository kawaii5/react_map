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
      docked: false,
      open: false,
      transitions: true,
      touch: true,
      shadow: true,
      pullRight: false,
      touchHandleWidth: 20,
      dragToggleDistance: 30,

      lng: 5,
      lat: 34,
      zoom: 1.5
    };

    this.renderPropCheckbox = this.renderPropCheckbox.bind(this);
    this.renderPropNumber = this.renderPropNumber.bind(this);
    this.onSetOpen = this.onSetOpen.bind(this);
    this.menuButtonClick = this.menuButtonClick.bind(this);
  }

  onSetOpen(open) {
    this.setState({open: open});
  }

  menuButtonClick(ev) {
    ev.preventDefault();
    this.onSetOpen(!this.state.open);
  }

  renderPropCheckbox(prop) {
    const toggleMethod = (ev) => {
      const newState = {};
      newState[prop] = ev.target.checked;
      this.setState(newState);
    };

    return (
      <p key={prop}>
        <input type="checkbox" onChange={toggleMethod} checked={this.state[prop]} id={prop} />
        <label htmlFor={prop}> {prop}</label>
      </p>);
  }

  renderPropNumber(prop) {
    const setMethod = (ev) => {
      const newState = {};
      newState[prop] = parseInt(ev.target.value, 10);
      this.setState(newState);
    };

    return (
      <p key={prop}>
         {prop} <input type="number" onChange={setMethod} value={this.state[prop]} />
      </p>);
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


    const drawerWidth = 240;

    const styles = theme => ({
      drawerPaper: {
        position: 'relative',
        width: drawerWidth,
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
          <div className="inline-block absolute top left mt12 ml12 bg-darken75 color-white z1 py6 px12 round-full txt-s txt-bold">
            <div>{`Longitude: ${lng} Latitude: ${lat} Zoom: ${zoom}`}</div>
          </div>
          <div ref={el => this.mapContainer = el} className="absolute top right left bottom" />
        </main>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('sidebar'));
