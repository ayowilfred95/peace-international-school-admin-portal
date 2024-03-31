import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
// @mui
import { Grid, Button, Container, Stack, Typography } from '@mui/material';
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Box } from '@mui/system';
import Update from '../components/tests/Update';
import Remarks from '../components/Results/Remarks';
import Report from '../components/Results/Report';

// components


const darkTheme = createTheme({
  palette: {
    primary: {
      main: "#051e34",
    },
  },
});

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{mt:3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

// ----------------------------------------------------------------------

export default function Tests() {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <Helmet>
        <title> Tests | Promise Int'l Dashboard  </title>
      </Helmet>
  

      <ThemeProvider theme={darkTheme}>
      <Container>
        <Box mb={2}>
          <Typography variant='h3'>Tests</Typography>
        </Box>
      <Box sx={{ width: "100%" }}>
          
          <TabPanel value={value} index={0}>
          {/* <Box sx={{textAlign:'right'}}>
        <Button variant='contained'     aria-label="basic tabs example" value={value} sx={{textTransform:'initial', fontFamily:'Gilroy-Bold'}} onClick={()=>setValue(2)}    {...a11yProps(2)} >Create New Parent</Button>
    </Box> */}
<Update/>
          </TabPanel>
       
     
        </Box>
      
     
      </Container>
      </ThemeProvider>
    </>
  );
}
