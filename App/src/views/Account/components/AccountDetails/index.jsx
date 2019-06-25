import React, { Component } from 'react';

// Externals
import classNames from 'classnames';
import PropTypes from 'prop-types';
import axios from 'axios';

// Material helpers
import { withStyles } from '@material-ui/core';

// Material components
import { Button, TextField } from '@material-ui/core';

// Shared components
import {
  Portlet,
  PortletHeader,
  PortletLabel,
  PortletContent,
  PortletFooter
} from 'components';

// Component styles
import styles from './styles';

const states = [
  {
    value: 'ESTUDIANTE',
    label: 'Estudiante'
  },
  {
    value: 'ADMIN',
    label: 'Admin'
  },
  {
    value: 'PROFESOR',
    label: 'Profesor'
  }
];

let state = {
  firstName: '',
  lastName: '',
  email: '',
  ced: '',
  tip: '',
};

class Account extends Component {
  

  handleChange = e => {
    this.setState({
      state: e.target.value
    });
  };

  handleGuardar(){
    let formulario = document.getElementById('formulario');
    state.firstName = formulario.getElementsByTagName('input')[0].value;
    state.lastName = formulario.getElementsByTagName('input')[1].value;
    state.email = formulario.getElementsByTagName('input')[2].value;
    state.ced = formulario.getElementsByTagName('input')[3].value;
    state.tip = formulario.getElementsByTagName('input')[4].value;

    let response = axios({ 
      method: 'POST', 
      url: 'http://localhost:3000/user/', 
      headers: {auth: localStorage.getItem('token')}, 
      data: { state } 
    }).then(res => {
      console.log("response", res);
      alert(res.data);
    }).catch(error => {
      console.log("error", error);
    });
    
  }

  render() {
    const { classes, className, ...rest } = this.props;
    //const { firstName, lastName, phone, state, country, email } = this.state;

    const rootClassName = classNames(classes.root, className);

    return (
      <Portlet
        {...rest}
        className={rootClassName}
      >
        <PortletHeader>
          <PortletLabel
            subtitle=""
            title="Agregar usuarios"
          />
        </PortletHeader>
        <PortletContent noPadding>
          <form
            autoComplete="on"
            id='formulario'
          >
            <div className={classes.field}>
              <TextField
                className={classes.textField}
                helperText="Por favor agregue el nombre"
                label="nombre"
                margin="dense"
                required
                variant="outlined"
              />
              <TextField
                className={classes.textField}
                label="apellido"
                margin="dense"
                required
                variant="outlined"
              />
            </div>
            <div className={classes.field}>
              <TextField
                className={classes.textField}
                label="Correo"
                margin="dense"
                required
                variant="outlined"
              />
              <TextField
                className={classes.textField}
                label="Cedula"
                margin="dense"
                type="number"
                variant="outlined"
              />
            </div>
            <div className={classes.field}>
            <TextField
                className={classes.textField}
                label="tipo de usuario"
                margin="dense"
                type="text"
                variant="outlined"
              />
            </div>
          </form>
        </PortletContent>
        <PortletFooter className={classes.portletFooter}>
          <Button
            color="primary"
            variant="contained"
            onClick={this.handleGuardar}
          >
            Guardar
          </Button>
        </PortletFooter>
      </Portlet>
    );
  }
}

Account.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Account);
