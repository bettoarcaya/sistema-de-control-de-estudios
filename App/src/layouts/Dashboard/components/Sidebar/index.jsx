import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';

// Externals
import classNames from 'classnames';
import PropTypes from 'prop-types';

// Material helpers
import { withStyles } from '@material-ui/core';

// Material components
import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Typography
} from '@material-ui/core';

// Material icons
import {
  DashboardOutlined as DashboardIcon,
  PeopleOutlined as PeopleIcon,
  ShoppingBasketOutlined as ShoppingBasketIcon,
  LockOpenOutlined as LockOpenIcon,
  TextFields as TextFieldsIcon,
  ImageOutlined as ImageIcon,
  InfoOutlined as InfoIcon,
  AccountBoxOutlined as AccountBoxIcon,
  SettingsOutlined as SettingsIcon
} from '@material-ui/icons';

// Component styles
import styles from './styles';

class Sidebar extends Component {
  render() {

    const { classes, className, tipoUsuario, nombreUsuario, apellidoUsuario } = this.props;
    
    const rootClassName = classNames(classes.root, className);

    let content;

    if(tipoUsuario == 'ESTUDIANTE'){
      content = <List
          component="div"
          disablePadding
        >
          <ListItem
            activeClassName={classes.activeListItem}
            className={classes.listItem}
            component={NavLink}
            to="/dashboard"
          >
            <ListItemIcon className={classes.listItemIcon}>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText
              classes={{ primary: classes.listItemText }}
              primary="Panel de control"
            />
          </ListItem>
          <ListItem
            activeClassName={classes.activeListItem}
            className={classes.listItem}
            component={NavLink}
            to="/users"
          >
            <ListItemIcon className={classes.listItemIcon}>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText
              classes={{ primary: classes.listItemText }}
              primary="Carga / Historial academico"
            />
          </ListItem>
        </List>
    }else if(tipoUsuario == 'ADMIN'){
      content = <List
          component="div"
          disablePadding
        >
          <ListItem
            activeClassName={classes.activeListItem}
            className={classes.listItem}
            component={NavLink}
            to="/dashboard"
          >
            <ListItemIcon className={classes.listItemIcon}>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText
              classes={{ primary: classes.listItemText }}
              primary="Panel de control"
            />
          </ListItem>
          <ListItem
            activeClassName={classes.activeListItem}
            className={classes.listItem}
            component={NavLink}
            to="/users"
          >
            <ListItemIcon className={classes.listItemIcon}>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText
              classes={{ primary: classes.listItemText }}
              primary="Usuarios"
            />
          </ListItem>
        </List>
    }else{
      content = <List
          component="div"
          disablePadding
        >
          <ListItem
            activeClassName={classes.activeListItem}
            className={classes.listItem}
            component={NavLink}
            to="/dashboard"
          >
            <ListItemIcon className={classes.listItemIcon}>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText
              classes={{ primary: classes.listItemText }}
              primary="Panel de control"
            />
          </ListItem>
          <ListItem
            activeClassName={classes.activeListItem}
            className={classes.listItem}
            component={NavLink}
            to="/users"
          >
            <ListItemIcon className={classes.listItemIcon}>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText
              classes={{ primary: classes.listItemText }}
              primary="Materias"
            />
          </ListItem>
        </List>
    }

    return (
      <nav className={rootClassName}>
        <div className={classes.logoWrapper}>
          <Link
            className={classes.logoLink}
            to="/"
          >
          </Link>
        </div>
        <Divider className={classes.logoDivider} />
        <div className={classes.profile}>
          <Link to="/account">
            <Avatar
              alt="Roman Kutepov"
              className={classes.avatar}
              src=""
            />
          </Link>
          <Typography
            className={classes.nameText}
            variant="h6"
          >
            {nombreUsuario}
          </Typography>
          <Typography
            className={classes.bioText}
            variant="caption"
          >
            {tipoUsuario}
          </Typography>
        </div>
        <Divider className={classes.profileDivider} />
          {content}
        {/*<List
          component="div"
          disablePadding
        >
          <ListItem
            activeClassName={classes.activeListItem}
            className={classes.listItem}
            component={NavLink}
            to="/dashboard"
          >
            <ListItemIcon className={classes.listItemIcon}>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText
              classes={{ primary: classes.listItemText }}
              primary="Panel de control"
            />
          </ListItem>
          <ListItem
            activeClassName={classes.activeListItem}
            className={classes.listItem}
            component={NavLink}
            to="/users"
          >
            <ListItemIcon className={classes.listItemIcon}>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText
              classes={{ primary: classes.listItemText }}
              primary="Carga / Historial academico"
            />
          </ListItem>
        </List>*/}
        <Divider className={classes.listDivider} />
      </nav>
    );

    {/*if(tipoUsuario == 'ESTUDIANTE'){
      return (
        <nav className={rootClassName}>
          <div className={classes.logoWrapper}>
            <Link
              className={classes.logoLink}
              to="/"
            >
            </Link>
          </div>
          <Divider className={classes.logoDivider} />
          <div className={classes.profile}>
            <Link to="/account">
              <Avatar
                alt="Roman Kutepov"
                className={classes.avatar}
                src=""
              />
            </Link>
            <Typography
              className={classes.nameText}
              variant="h6"
            >
              {nombreUsuario}
            </Typography>
            <Typography
              className={classes.bioText}
              variant="caption"
            >
              {tipoUsuario}
            </Typography>
          </div>
          <Divider className={classes.profileDivider} />
          <List
            component="div"
            disablePadding
          >
            <ListItem
              activeClassName={classes.activeListItem}
              className={classes.listItem}
              component={NavLink}
              to="/dashboard"
            >
              <ListItemIcon className={classes.listItemIcon}>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText
                classes={{ primary: classes.listItemText }}
                primary="Panel de control"
              />
            </ListItem>
            <ListItem
              activeClassName={classes.activeListItem}
              className={classes.listItem}
              component={NavLink}
              to="/users"
            >
              <ListItemIcon className={classes.listItemIcon}>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText
                classes={{ primary: classes.listItemText }}
                primary="Carga / Historial academico"
              />
            </ListItem>
            {/*<ListItem
              activeClassName={classes.activeListItem}
              className={classes.listItem}
              component={NavLink}
              to="/products"
            >
              <ListItemIcon className={classes.listItemIcon}>
                <ShoppingBasketIcon />
              </ListItemIcon>
              <ListItemText
                classes={{ primary: classes.listItemText }}
                primary="Products"
              />
            </ListItem>
            <ListItem
              activeClassName={classes.activeListItem}
              className={classes.listItem}
              component={NavLink}
              to="/sign-in"
            >
              <ListItemIcon className={classes.listItemIcon}>
                <LockOpenIcon />
              </ListItemIcon>
              <ListItemText
                classes={{ primary: classes.listItemText }}
                primary="Authentication"
              />
            </ListItem>
            <ListItem
              activeClassName={classes.activeListItem}
              className={classes.listItem}
              component={NavLink}
              to="/typography"
            >
              <ListItemIcon className={classes.listItemIcon}>
                <TextFieldsIcon />
              </ListItemIcon>
              <ListItemText
                classes={{ primary: classes.listItemText }}
                primary="Typography"
              />
            </ListItem>
            <ListItem
              activeClassName={classes.activeListItem}
              className={classes.listItem}
              component={NavLink}
              to="/icons"
            >
              <ListItemIcon className={classes.listItemIcon}>
                <ImageIcon />
              </ListItemIcon>
              <ListItemText
                classes={{ primary: classes.listItemText }}
                primary="Icons and Images"
              />
            </ListItem>
            <ListItem
              activeClassName={classes.activeListItem}
              className={classes.listItem}
              component={NavLink}
              to="/account"
            >
              <ListItemIcon className={classes.listItemIcon}>
                <AccountBoxIcon />
              </ListItemIcon>
              <ListItemText
                classes={{ primary: classes.listItemText }}
                primary="Account"
              />
            </ListItem>
            <ListItem
              activeClassName={classes.activeListItem}
              className={classes.listItem}
              component={NavLink}
              to="/settings"
            >
              <ListItemIcon className={classes.listItemIcon}>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText
                classes={{ primary: classes.listItemText }}
                primary="Settings"
              />
            </ListItem>*/}
         {/**  </List>
          <Divider className={classes.listDivider} />
        </nav>
      );
    }*/}
  }
}
Sidebar.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Sidebar);
