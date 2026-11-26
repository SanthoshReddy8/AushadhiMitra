import React, { useState, useEffect } from 'react';
import { Box, Grid, TextField, Button, Typography, Paper } from '@mui/material';
import { auth } from '../firebase/firebase';
import { Navigate } from 'react-router-dom'; 

const styles = {
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
  },
  container: {
    justifyContent: 'center',
    width: '100%',
  },
  paper: {
    padding: 4,
    marginX: 'auto',
    borderRadius: '16px',
    marginBottom: 10,
    marginTop: 10,
    boxShadow: 3,
    backgroundColor: 'background.paper',
    maxWidth: 500,
  },
  form: {
    width: '100%',
  },
  button: {
    marginTop: 2,
  },
};

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setIsLoggedIn(true);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLoginClick = async () => {
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      await auth.signInWithEmailAndPassword(email, password);
      console.log('User logged in:', email);
      setIsLoggedIn(true); 
      setEmail('');
      setPassword('');
      setError('');
    } catch (error) {
      setError(error.message);
    }
  };

  if (isLoggedIn) {
    return <Navigate to="/aftrbody" />;
  }

  return (
    <Box sx={styles.root}>
      <Grid container sx={styles.container}>
        <Grid size={{ xs: 12, sm: 8, md: 6 }}>
          <Paper sx={styles.paper}>
            <Box component="form" sx={styles.form} noValidate autoComplete="off">
              <Typography variant="h4" align="center" gutterBottom>
                Login
              </Typography>
              <TextField
                id="email"
                label="Email"
                type="email"
                variant="outlined"
                fullWidth
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                id="password"
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {error && (
                <Typography variant="body2" color="error" align="center">
                  {error}
                </Typography>
              )}
              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={styles.button}
                onClick={handleLoginClick} 
              >
                Login
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Login;