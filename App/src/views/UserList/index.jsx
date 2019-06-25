import React, { Component } from 'react';

// Externals
import PropTypes from 'prop-types';
import axios from 'axios';

// Material helpers
import { withStyles } from '@material-ui/core';

// Material components
import { CircularProgress, Typography } from '@material-ui/core';

// Shared layouts
import { Dashboard as DashboardLayout } from 'layouts';

// Shared services
import { getUsers } from 'services/user';

// Custom components
import { UsersToolbar, UsersTable } from './components';

// Component styles
import styles from './style';
import { async } from 'q';

import { Link } from 'react-router-dom';

// Material components
import {
  Avatar,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination
} from '@material-ui/core';

class UserList extends Component {
  signal = true;

  state = {
    isLoading: false,
    limit: 10,
    users: [],
    carga: [],
    selectedUsers: [],
    error: null,
    historial: [],
  };

  constructor(props){
    super(props);

    //this.getCarga(); 
  }

 async gethistorial(){

  try {
    this.setState({ isLoading: true });

    const { limit } = this.state;

    const { users } = await getUsers(limit);

    let historiales = await axios({ 
      method: 'Get', 
      url: 'http://localhost:3000/user/historico/' + localStorage.getItem('u_id'), 
      headers: {auth: localStorage.getItem('token')}
    });

    let historial = historiales.data;   

    if (this.signal) {
      this.setState({
        isLoading: false,
        users,
        historial
      });
    }
  } catch (error) {
    if (this.signal) {
      this.setState({
        isLoading: false,
        error
      });
    }
  }
  }

  async getUsers() {
    try {
      this.setState({ isLoading: true });

      const { limit } = this.state;

      const { users } = await getUsers(limit);

      let cargas = await axios({ 
        method: 'Get', 
        url: 'http://localhost:3000/user/carga/' + localStorage.getItem('u_id'), 
        headers: {auth: localStorage.getItem('token')}
      });

      let carga = cargas.data;  

      if (this.signal) {
        this.setState({
          isLoading: false,
          users,
          carga
        });
      }
    } catch (error) {
      if (this.signal) {
        this.setState({
          isLoading: false,
          error
        });
      }
    }
  }

  componentDidMount() {
    this.signal = true;
    this.getUsers();
    this.gethistorial();
  }

  componentWillMount(){
    
  }

  componentWillUnmount() {
    this.signal = false;
  }

  handleSelect = selectedUsers => {
    this.setState({ selectedUsers });
  };

  renderUsers() {
    const { classes } = this.props;
    const { isLoading, users, error, carga } = this.state;

    if (isLoading) {
      return (
        <div className={classes.progressWrapper}>
          <CircularProgress />
        </div>
      );
    }

    if (error) {
      return <Typography variant="h6">{error}</Typography>;
    }

    if (users.length === 0) {
      return <Typography variant="h6">There are no users</Typography>;
    }

    return (
      <UsersTable
        //
        onSelect={this.handleSelect}
        users={users}
        carga={carga}
      />
    );
  }

   renderHistorial(){
    const { classes } = this.props;
    const { isLoading, users, error, historial } = this.state;

    if (isLoading) {
      return (
        <div className={classes.progressWrapper}>
          <CircularProgress />
        </div>
      );
    }

    if (error) {
      return <Typography variant="h6">{error}</Typography>;
    }

    if (users.length === 0) {
      return <Typography variant="h6">There are no users</Typography>;
    }

    return (
      <UsersTable
        //
        onSelect={this.handleSelect}
        users={users}
        carga={historial}
      />
    );
  }

  render() {
    const { classes } = this.props;
    const { selectedUsers } = this.state;

    return (
      <DashboardLayout title="Datos academicos">
        <div className={classes.root}>
          <h1>Carga Actual</h1>
          <div 
            className={classes.content}
          >
            {this.renderUsers()}
          </div>
          <h1>Historial academico</h1>
          <div className={classes.content}>
            {this.renderHistorial()}
          </div>
        </div>
      </DashboardLayout>
    );
  }
}

UserList.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(UserList);
