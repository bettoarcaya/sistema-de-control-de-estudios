import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Externals
import classNames from 'classnames';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';

// Material helpers
import { withStyles } from '@material-ui/core';

// Material components
import {
  Avatar,
  Checkbox,
  Button,
  Table,
  TextField,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TablePagination
} from '@material-ui/core';

// Shared helpers
import { getInitials } from 'helpers';

// Shared components
import { Portlet, PortletContent } from 'components';

// Component styles
import styles from './styles';
import axios from 'axios';

class EstudiantesTable extends Component {
  state = {
    selectedUsers: [],
    rowsPerPage: 10,
    page: 0
  };

  handleSelectAll = event => {
    const { users, onSelect } = this.props;

    let selectedUsers;

    if (event.target.checked) {
      selectedUsers = users.map(user => user.id);
    } else {
      selectedUsers = [];
    }

    this.setState({ selectedUsers });

    onSelect(selectedUsers);
  };

  handleSelectOne = (event, id) => {
    const { onSelect } = this.props;
    const { selectedUsers } = this.state;

    const selectedIndex = selectedUsers.indexOf(id);
    let newSelectedUsers = [];

    if (selectedIndex === -1) {
      newSelectedUsers = newSelectedUsers.concat(selectedUsers, id);
    } else if (selectedIndex === 0) {
      newSelectedUsers = newSelectedUsers.concat(selectedUsers.slice(1));
    } else if (selectedIndex === selectedUsers.length - 1) {
      newSelectedUsers = newSelectedUsers.concat(selectedUsers.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedUsers = newSelectedUsers.concat(
        selectedUsers.slice(0, selectedIndex),
        selectedUsers.slice(selectedIndex + 1)
      );
    }

    this.setState({ selectedUsers: newSelectedUsers });

    onSelect(newSelectedUsers);
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  async handleGuardar(){
      let forma = document.getElementById('forma');
      let notas = [];
      for (let index = 0; index < forma.getElementsByTagName('input').length; index++) {
        notas[forma.getElementsByTagName('input')[index].name]= forma.getElementsByTagName('input')[index].value;
            
      }

     let response = await axios({ 
        method: 'POST', 
        url: 'http://localhost:3000/user/guardar', 
        headers: {auth: localStorage.getItem('token')}, 
        data: { notas } 
      });
  }

  render() {
    const { classes, className, users, carga } = this.props;
    const { activeTab, selectedUsers, rowsPerPage, page } = this.state;

    const rootClassName = classNames(classes.root, className);
    
    console.log("notas", carga);

    return (
      <Portlet className={rootClassName}>
          <form id="forma">
        <PortletContent noPadding>
          <PerfectScrollbar>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="left">cedula</TableCell>
                  <TableCell align="left">nombre</TableCell>
                  <TableCell align="left">apellido</TableCell>
                  <TableCell align="left">nota</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {carga
                  .filter(user => {
                    if (activeTab === 1) {
                      return !user.returning;
                    }

                    if (activeTab === 2) {
                      return user.returning;
                    }

                    return user;
                  })
                  .slice(0, rowsPerPage)
                  .map(user => (
                    <TableRow
                      className={classes.tableRow}
                      hover
                      key={user.id}
                      selected={selectedUsers.indexOf(user.id) !== -1}
                    >
                      <TableCell className={classes.tableCell}>
                        <div className={classes.tableCellInner}>
                          <Link to="#">
                            <Typography
                              className={classes.nameText}
                              variant="body1"
                            >
                              {user.estudiante.cedula}
                            </Typography>
                          </Link>
                        </div>
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {user.estudiante.nombre}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {user.estudiante.apellido}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        <input type="number" max="10" min="0" name={user.estudiante.cedula}/>
                        
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </PerfectScrollbar>
        </PortletContent>
            <Button
                className={classes.signInButton}
                color="primary"
                onClick={this.handleGuardar}
                size="large"
                variant="contained"
            >
                Guardar
            </Button>
        </form>
      </Portlet>
      
    );
  }
}

EstudiantesTable.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  onSelect: PropTypes.func,
  onShowDetails: PropTypes.func,
  users: PropTypes.array.isRequired
};

EstudiantesTable.defaultProps = {
  users: [],
  onSelect: () => {},
  onShowDetails: () => {}
};

export default withStyles(styles)(EstudiantesTable);