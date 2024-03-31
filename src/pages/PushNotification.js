import { Button, InputLabel, TextField, Typography, createTheme, ThemeProvider } from '@mui/material';
import { Box, Container } from '@mui/system';
import { LoadingButton } from '@mui/lab';
import SaveIcon from '@mui/icons-material/Save';
import React, { useState } from 'react';

import './Dashboard.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0098db',
    },
  },
});
export default function PushNotification() {
  const [title, setTitle] = useState();
  const [body, setBody] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const USER = JSON.parse(window.localStorage.getItem('user-info'));

  const token = USER.token;

  const handlePush = async () => {
    setLoading(true);
    // e.preventDefault();

    try {
      const item = { title, body };
      let result = await fetch('https://ulego.ng/api/v1/notification', {
        method: 'POST',
        body: JSON.stringify(item),
        headers: {
          'Content-Type': 'application/json ',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      result = await result.json();
      console.log('result', result);
      setLoading(false);
      if (result.status === 'success') {
        setLoading(false);
      } else {
        setError(true);
      }
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <Container maxWidth="xl">
          <Typography variant="h4" sx={{ mb: 5 }}>
            Announcement
          </Typography>
          <Box>
            <Box className="pushNotification"> </Box>
            <Box mt={4}>
              <InputLabel>Notification Title/Heading</InputLabel>
              <TextField
                type="text"
                fullWidth
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                margin="normal"
              />
              <InputLabel>Notification Body</InputLabel>
              <TextField
                multiline
                rows={4}
                value={body}
                onChange={(e) => setBody(e.target.value)}
                margin="normal"
                fullWidth
              />
              <Box>
                {!loading && (
                  <LoadingButton fullWidth size="large" type="submit" onClick={handlePush} variant="contained">
                    Send Notification
                  </LoadingButton>
                )}
                {loading && (
                  <LoadingButton
                    loading
                    loadingPosition="start"
                    startIcon={<SaveIcon />}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    disabled
                  >
                    Sending Notification
                  </LoadingButton>
                )}
              </Box>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
}
