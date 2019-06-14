import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

const baseAPI = "http://localhost:3000";
let state = { 
    email: '', 
    password: '',
  }
let message = {
    status: '',
    msg: ''
  }

const useStyles = makeStyles(theme => ({
    '@global': {
      body: {
        backgroundColor: theme.palette.common.white,
      },
    },
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      background: "white"
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

  function handleChange(event){
    state[event.target.id] = event.target.value;
  }

  function handleSubmit(event) {
    event.preventDefault();
    state.email = event.target.email.value;
    state.password = event.target.password.value;
    //console.log(state.email, state.password);
    
    axios.post(baseAPI + '/auth/login', {email: state.email, password: state.password})
          .then(res => {
              console.log(res.data);
              
          })
          .catch(error => {
            console.error(error);
            message.status = 'Error';
            message.msg = "Usuario o contrasena incorrecta";
            alert(message.status + "!" + " " + message.msg);
          });
  }
  
function App() {
    const classes = useStyles();

    
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
        </Avatar>
        <div>{message.msg}</div>
        <ValidatorForm className={classes.form} type="POST" onSubmit={handleSubmit} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            onChange={handleChange}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Contrasena"
            type="password"
            id="password"
            onChange={handleChange}
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Entrar
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Olvidaste tu contrasena?
              </Link>
            </Grid>
          </Grid>
        </ValidatorForm>
      </div>
      <Box mt={5}>
      </Box>
    </Container>
  );
}

export default App;
