import React, { Component, Fragment } from 'react';

// Externals
import classNames from 'classnames';
import compose from 'recompose/compose';
import PropTypes from 'prop-types';
import axios from 'axios';

// Material helpers
import { withStyles, withWidth } from '@material-ui/core';

// Material components
import { Drawer } from '@material-ui/core';

// Custom components
import { Sidebar, Topbar, Footer } from './components';

// Component styles
import styles from './styles';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    if(localStorage.getItem('isAuthenticated') === 'false'){
      window.location="http://localhost:3006/sign-in";
    }
    console.log(this.props);
    this.getInfo();

    const isMobile = ['xs', 'sm', 'md'].includes(props.width);

    this.state = {
      isOpen: !isMobile
    };
  }

  getInfo = async () => {
    try{
      let res = await axios({ 
        method: 'Get', 
        url: 'http://localhost:3000/user/' + localStorage.getItem('u_id'), 
        headers: {auth: localStorage.getItem('token')}
      })
      console.log("response", res.data);
    }catch(error){
      console.log("error: " + error);
    }
  }

  handleClose = () => {
    this.setState({ isOpen: false });
    localStorage.setItem('isAuthenticated', false);
  };

  handleToggleOpen = () => {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen
    }));
  };

  render() {
    const { classes, width, title, children } = this.props;
    const { isOpen } = this.state;

    const isMobile = ['xs', 'sm', 'md'].includes(width);
    const shiftTopbar = isOpen && !isMobile;
    const shiftContent = isOpen && !isMobile;

    return (
      <Fragment>
        <Topbar
          className={classNames(classes.topbar, {
            [classes.topbarShift]: shiftTopbar
          })}
          isSidebarOpen={isOpen}
          onToggleSidebar={this.handleToggleOpen}
          title={title}
        />
        <Drawer
          anchor="left"
          classes={{ paper: classes.drawerPaper }}
          onClose={this.handleClose}
          open={isOpen}
          variant={isMobile ? 'temporary' : 'persistent'}
        >
          <Sidebar className={classes.sidebar} />
        </Drawer>
        <main
          className={classNames(classes.content, {
            [classes.contentShift]: shiftContent
          })}
        >
          {children}
          <Footer />
        </main>
      </Fragment>
    );
  }
}

Dashboard.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  title: PropTypes.string,
  width: PropTypes.string.isRequired
};

export default compose(
  withStyles(styles),
  withWidth()
)(Dashboard);
