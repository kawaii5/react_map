import React from 'react';
import PropTypes from 'prop-types';

const styles = {
  sidebar: {
    width: 256,
    height: '100%',
  },
  sidebarLink: {
    display: 'block',
    padding: '16px 0px',
    color: '#757575',
    textDecoration: 'none',
  },
  divider: {
    margin: '8px 0',
    height: 1,
    backgroundColor: '#757575',
  },
  content: {
    padding: '16px',
    height: '100%',
    backgroundColor: 'white',
  },
};

const SidebarContent = (props) => {
  const links = [];

  for (let ind = 0; ind < 10; ind++) {
    links.push(
      <a key={ind} style={styles.sidebarLink}>Mock menu item {ind}</a>);
  }

  return (
    <div style={styles.content}>
      <a href="index.html" style={styles.sidebarLink}>Home</a>
      {links}
    </div>
  );
};

SidebarContent.propTypes = {
  style: PropTypes.object,
};

export default SidebarContent;