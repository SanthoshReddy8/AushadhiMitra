import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { auth, database} from '../firebase/firebase';

const styles = {
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
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
};

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const userRef = database.ref(`users/${user.uid}`);
          const snapshot = await userRef.once('value');
          if (snapshot.exists()) {
            setUserData(snapshot.val());
          } else {
            setError('User data not found.');
          }
        } catch (error) {
          setError(error.message);
        }
      } else {
        setError('User not authenticated.');
      }
    };

    fetchUserData();
  }, []);

  if (error) {
    return <Typography variant="body2" color="error">{error}</Typography>;
  }

  return (
    <Box sx={styles.root}>
      <Paper sx={styles.paper}>
        {userData ? (
          <>
            <Typography variant="h4" align="center" gutterBottom>
              Profile
            </Typography>
            <Typography variant="body1">Username: {userData.username}</Typography>
            <Typography variant="body1">Email: {userData.email}</Typography>
            <Typography variant="body1">Phone Number: {userData.phoneNumber}</Typography>
          </>
        ) : (
          <Typography variant="body1" align="center">Loading...</Typography>
        )}
      </Paper>
    </Box>
  );
};

export default Profile;
