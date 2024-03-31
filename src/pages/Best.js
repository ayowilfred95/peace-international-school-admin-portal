import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
// @mui
import { Grid, Button, Container, Stack, Typography } from '@mui/material';
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Box } from '@mui/system';
import Update from '../components/Results/Update';
import Remarks from '../components/Results/Remarks';
import Report from '../components/Results/Report';
import UpdateBest from 'src/components/Results/UpdateBest';

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

export default function Best() {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <Helmet>
        <title> Overall Best | Promise Int'l Dashboard  </title>
      </Helmet>
  

      <ThemeProvider theme={darkTheme}>
      <Container>
        <Box mb={2}>
          <Typography variant='h3'>Overall Best</Typography>
        </Box>
      <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          
          </Box>
          <TabPanel value={value} index={0}>


            <UpdateBest/>



{/* <Update/> */}
          </TabPanel>
       
     
        </Box>
      
     
      </Container>
      </ThemeProvider>
    </>
  );
}
