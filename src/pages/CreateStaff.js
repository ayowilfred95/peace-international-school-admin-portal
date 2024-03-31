import { Helmet } from 'react-helmet-async';
import React from 'react';
import { Grid, Container, Typography, Card, CardActions, createTheme, ThemeProvider } from '@mui/material';
import CreateAccount from '../components/Account/CreateAccount';
import AccountProfileCreate from '../components/Account/AccountProfileCreate';


const theme = createTheme({
palette:{
    primary:{
        main:"#0098db"
    }
}
})


const CreateStaff = () => {
  return (
    <>
      <Helmet>
        <title> Create | Promise Int'l Dashboard </title>
      </Helmet>
      <ThemeProvider theme={theme}>
      <Container maxWidth="xl">
        <Typography sx={{ mb: 3 }} variant="h4">
          Create Account
        </Typography>
        <Grid container spacing={3}>
          <Grid item lg={4} md={6} xs={12}>
            <CreateAccount />
            <Card sx={{ mt: 2 }}>
              <CardActions> </CardActions>
            </Card>
          </Grid>
          <Grid
            item
            lg={8}
            md={6}
            xs={12}
            // sx={{border:'2px solid red'}}
          >
            <AccountProfileCreate />
            {/* <AccountProfileCreate /> */}
          </Grid>
        </Grid>
      </Container>
      </ThemeProvider>
    </>
  );
};

export default CreateStaff;
