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

  handleClick = () => {
    this.setState({ open: !this.state.open });
  };

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
      title,
      color,
      notifNum,
      ...other
    } = this.props;

    const style = {
      paddingLeft: 8 * (3 + 2 * depth),
    };

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
              <div>{title}</div>
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
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><circle fill={color} cx="12" cy="12" r="8"/></svg>
          {title}
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
  notifNum: PropTypes.number,
  isActiveNotif: PropTypes.bool,
  color: PropTypes.string,
};

AppDrawerNavItem.defaultProps = {
  openImmediately: false,
};

export default withStyles(styles)(AppDrawerNavItem);
