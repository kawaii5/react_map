import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import Collapse from '@material-ui/core/Collapse';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Icon from '@material-ui/core/Icon';

const options = [
  'Call',
  'Report',
  'Escalate',
  'Dismiss',
];

const styles = theme => ({
  item: {
    display: 'block',
    paddingTop: 0,
    paddingBottom: 0,
    width: 250,
    backgroundColor: '#CECECE',
    fontWeight: theme.typography.fontWeightMedium,
  },
  itemLeaf: {
    display: 'flex',
    paddingTop: 0,
    paddingBottom: 0,
    backgroundColor: '#FFFFFF',
    fontWeight: theme.typography.fontWeightRegular,
  },
  button: {
    justifyContent: 'flex-start',
    textTransform: 'none',
    width: '100%',
    fontWeight: theme.typography.fontWeightMedium,
  },
  buttonLeaf: {
    justifyContent: 'flex-start',
    textTransform: 'none',
    width: '100%',
    fontWeight: theme.typography.fontWeightRegular,
  },
  menuNav: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowBlock: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

class AppDrawerNavItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: props.openImmediately,
      anchorEl: null,
    };
  }

  componentDidMount() {
    // So we only run this logic once.
    if (!this.props.openImmediately) {
      return;
    }
  }

  // Side nav menu dropdown - show/hide
  handleClick = () => {
    this.setState({ open: !this.state.open });
  };

  // Menu pop-up actions
  handleClickMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleCloseMenu = () => {
    this.setState({ anchorEl: null });
  };
  
  render() {
    const {
      children,
      classes,
      depth,
      onClick,
      openImmediately,
      isActiveNotif,
      notifNum,
      title,
      color,
      ...other
    } = this.props;

    const style = {
      paddingLeft: 8 * (3 + 2 * depth),
    };

    // Change the Active variable to a bool
    const isActive = isActiveNotif > 0 ? true : false;

    // Options that are shown under each Header
    if (depth > 0) {
      return (
        <ListItem className={classes.itemLeaf} disableGutters {...other}>
          <Button
            aria-label="More"
            aria-owns={this.state.anchorEl ? 'long-menu' : null}
            aria-haspopup="true"
            className={classNames(classes.buttonLeaf, `depth-${depth}`)}
            disableRipple
            onClick={this.handleClickMenu}
            style={style}
          >
            <div className={classes.rowBlock}>
              <div>
                <svg height="24" width="100">
                  {isActive ? (
                    <text x="0" y="17" fill="red">{title}</text>
                  ) : (
                    <text x="0" y="17" fill="gray">{title}</text>
                  )}
                </svg>
              </div>
              <div><Icon>keyboard_arrow_right</Icon></div>
            </div>
          </Button>
          <Menu
            id="long-menu"
            anchorEl={this.state.anchorEl}
            open={Boolean(this.state.anchorEl)}
            onClose={this.handleCloseMenu}
            PaperProps={{
              style: {
                marginLeft: 230,
                textAlign: 'center',
                width: 200,
              },
            }}
          >
            {options.map(option => (
              <MenuItem className={classes.menuNav} key={option}>
                {option}
              </MenuItem>
            ))}
            <Icon>more_horiz</Icon>
          </Menu>
        </ListItem>
      );
    }

    // notifNum stores how many "cars" need attention
    const notifBool = notifNum > 0 ? true : false;

    // Header Options
    return (
      <ListItem className={classes.item} disableGutters {...other}>
        <Button
          classes={{
            root: classes.button,
            label: openImmediately ? 'algolia-lvl0' : '',
          }}
          onClick={this.handleClick}
          style={style}
        >
          <div className={classes.rowBlock}>
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <circle fill={color} cx="12" cy="12" r="8"/>
              </svg>
              {title}
            </div>
            <div>
              {notifBool ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <circle fill="#FF1F1F" cx="12" cy="12" r="8"/>
                    <text textAnchor="middle" x="12" y="17" fill="white">{notifNum}</text>
                  </svg>
              ) : (
                null
              )}
              {this.state.open ? (
                  <svg xmlns="http://www.w3.org/2000/svg" transform="rotate(-90 -3 -3)" width="24" height="24" viewBox="0 0 24 24">
                    <path d="M5 8l4 4 4-4z"/>
                  </svg>
              ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path d="M5 8l4 4 4-4z"/>
                  </svg>
              )}
            </div>
          </div>
        </Button>
        <Collapse in={this.state.open} timeout="auto" unmountOnExit>
          {children}
        </Collapse>
      </ListItem>
    );
  }
}

AppDrawerNavItem.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object.isRequired,
  depth: PropTypes.number.isRequired,
  onClick: PropTypes.func,
  openImmediately: PropTypes.bool,
  title: PropTypes.string.isRequired,
  isActiveNotif: PropTypes.number,
  notifNum: PropTypes.number,
  color: PropTypes.string,
};

AppDrawerNavItem.defaultProps = {
  openImmediately: false,
};

export default withStyles(styles)(AppDrawerNavItem);
