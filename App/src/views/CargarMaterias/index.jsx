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
import { UsersToolbar, MateriasTable } from './components';

// Component styles
import styles from './styles';
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

class CargarMateria extends Component {
    signal = true;

    state = {
        isLoading: false,
        limit: 10,
        carga: [],
        selectedUsers: [],
        error: null
    };

    async getMaterias(){
        try{
            this.setState({ isLoading: true });

            const { limit } = this.state;

            const { users } = await getUsers(limit);

            let materias = await axios({ 
            method: 'Get', 
            url: 'http://localhost:3000/user/materias/' + localStorage.getItem('u_id'), 
            headers: {auth: localStorage.getItem('token')}
            });

            let carga = materias.data;   

            if (this.signal) {
                this.setState({
                    isLoading: false,
                    carga
                });
            }
        }catch(error){
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
        this.getMaterias();
    }

    componentWillUnmount() {
        this.signal = false;
    }

    handleSelect = selectedUsers => {
        this.setState({ selectedUsers });
    };

    renderMaterias(){
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
      
          if (carga.length === 0) {
            return <Typography variant="h6">There are no users</Typography>;
          }
      
          return (
            <MateriasTable
              //
              onSelect={this.handleSelect}
              carga={carga}
            />
          );
    }

    render(){
        const { classes } = this.props;
        const { selectedUsers } = this.state;

        return(
            <DashboardLayout title="Materias">
                <div className={classes.root}>
                    <h1>Cargas actuales</h1>
                    <div 
                        className={classes.content}
                    >
                        {this.renderMaterias()}
                    </div>
                </div>
            </DashboardLayout>
        );
        
    }    
}

CargarMateria.propTypes = {
    className: PropTypes.string,
    classes: PropTypes.object.isRequired
};
  
export default withStyles(styles)(CargarMateria);


