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

class UserList extends Component {
  signal = true;

  state = {
    isLoading: false,
    limit: 10,
    users: [],
    selectedUsers: [],
    error: null,
    carga: [
      {
      nombre: 'Matematica I',
      codigo: '1234567',
      estado: 'cursando',
      carrera: 'ing en computacion',
      nota: '--'
      },
      {
        nombre: 'Programacion orientada a objetos',
        codigo: '0726789',
        estado: 'cursando',
        carrera: 'ing en computacion',
        nota: '--'
      },
      {
        nombre: 'automata',
        codigo: '0729876',
        estado: 'cursando',
        carrera: 'ing en computacion',
        nota: '--'
      }
    ],
    historial: [
      {
      nombre: 'economia',
      codigo: '1234567',
      estado: 'aprobada',
      carrera: 'ing en computacion',
      nota: '7'
      },
      {
        nombre: 'abstraccion de datos',
        codigo: '0726789',
        estado: 'reprobada',
        carrera: 'ing en computacion',
        nota: '4'
      },
      {
        nombre: 'introduccion a la ing en computacion',
        codigo: '0729876',
        estado: 'aprobada',
        carrera: 'ing en computacion',
        nota: '6'
      }
    ],
  };

  /*carga = [
    {
    nombre: 'Matematica I',
    codigo: '1234567',
    estado: 'cursando',
    carrera: 'ing en computacion',
    nota: '--'
    },
    {
      nombre: 'Programacion orientada a objetos',
      codigo: '0726789',
      estado: 'cursando',
      carrera: 'ing en computacion',
      nota: '--'
    },
    {
      nombre: 'automata',
      codigo: '0729876',
      estado: 'cursando',
      carrera: 'ing en computacion',
      nota: '--'
    }
  ];*/

  getCarga = async() => {
    const carga = await axios({ 
      method: 'Get', 
      url: 'http://localhost:3000/user/carga/' + localStorage.getItem('u_id'), 
      headers: {auth: localStorage.getItem('token')} 
    });

    console.log("carga", carga);
  }

  async getUsers() {
    try {
      this.setState({ isLoading: true });

      const { limit } = this.state;

      const { users } = await getUsers(limit);
      
      const user_id = localStorage.getItem('u_id');

      const token = localStorage.getItem('token');
      if (this.signal) {
        this.setState({
          isLoading: false,
          users
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
    this.getCarga();
  }

  componentWillUnmount() {
    this.signal = false;
  }

  handleSelect = selectedUsers => {
    this.setState({ selectedUsers });
  };

  renderUsers() {
    const { classes } = this.props;
    const { isLoading, users, error } = this.state;

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
      />
    );
  }

   renderCarga(){
    const { classes } = this.props;
    const { isLoading, users, error } = this.state;
    let materias = [];

    try{
      const response = axios({ 
        method: 'Get', 
        url: 'http://localhost:3000/user/carga/' + localStorage.getItem('u_id'), 
        headers: {auth: localStorage.getItem('token')}
      }).then(res => {
        materias = res.data;
      });
    }catch(error){
      console.log(error);
    }

    /*if(localStorage.getItem('u_id') == '2'){
      materias = this.state.carga;
    }*/

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

    if (materias.length === 0) {
      return <Typography variant="h6">Este usuario aun no posee carga</Typography>;
    }

    return (
      <UsersTable
        //
        onSelect={this.handleSelect}
        users={materias}
      />
    );
  }

  renderHistorial() {
    const { classes } = this.props;
    const { isLoading, users, error } = this.state;

    let historia = [];

    if(localStorage.getItem('u_id') == '2'){
      historia = this.state.historial;
    }

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

    if (historia.length === 0) {
      return <Typography variant="h6">Este usuario aun no posee historial</Typography>;
    }

    return (
      <UsersTable
        //
        onSelect={this.handleSelect}
        users={historia}
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
          <div className={classes.content}>{this.renderCarga()}</div>
          <h1>Historial academico</h1>
          <div className={classes.content}>{this.renderHistorial()}</div>
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
