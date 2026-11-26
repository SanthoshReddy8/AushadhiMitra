import React, { useState } from 'react';
import { Box, Grid, TextField, Button, Typography, Paper, FormControlLabel, Checkbox } from '@mui/material';
import { auth, database} from '../firebase/firebase';
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
  terms: {
    marginTop: 2,
  },
  successMessage: {
    marginBottom: 2,
    padding: 1,
    backgroundColor: '#4caf50',
    color: '#fff',
    borderRadius: '8px',
    textAlign: 'center',
  },
};

const Signup = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [redirectToLogin, setRedirectToLogin] = useState(false);

  const handleSignUp = async () => {
    setError('');
    setSuccessMessage('');

    
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (!agreeTerms) {
      setError('Please consent to sharing your email address to sign up.');
      return;
    }

    try {
      const userCredential = await auth.createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;

      
      await database.ref('users/' + user.uid).set({
        username,
        phoneNumber,
        email,
      });

      setSuccessMessage('Successfully signed up!');
      setEmail('');
      setUsername('');
      setPhoneNumber('');
      setPassword('');
      setConfirmPassword('');
      setAgreeTerms(false);

      console.log('User signed up and data saved:', email, username, phoneNumber);

      
      setRedirectToLogin(true);
    } catch (error) {
      setError(error.message);
    }
  };

  if (redirectToLogin) {
    return <Navigate to="/login" />;
  }

  return (
    <Box sx={styles.root}>
      <Grid container sx={styles.container}>
        <Grid size={{ xs: 12, sm: 8, md: 6 }}>
          {successMessage && (
            <Typography variant="body2" sx={styles.successMessage}>
              {successMessage}
            </Typography>
          )}
          <Paper sx={styles.paper}>
            <Box component="form" sx={styles.form} noValidate autoComplete="off">
              <Typography variant="h4" align="center" gutterBottom>
                Sign Up
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
                id="username"
                label="Username"
                variant="outlined"
                fullWidth
                margin="normal"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <TextField
                id="phoneNumber"
                label="Phone Number"
                variant="outlined"
                fullWidth
                margin="normal"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
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
              <TextField
                id="confirmPassword"
                label="Confirm Password"
                type="password"
                variant="outlined"
                fullWidth
                margin="normal"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                  />
                }
                label="I consent to the sharing of my email address."
                sx={styles.terms}
                style={{ display: 'flex', alignItems: 'center' }}
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
                onClick={handleSignUp}
              >
                Sign Up
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Signup;
