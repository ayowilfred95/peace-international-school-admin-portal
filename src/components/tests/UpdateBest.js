import {
    Avatar,
    Button,
    FormControl,
    Grid,
    IconButton,
    InputLabel,
    MenuItem,
    MenuList,
    Divider,
    ListItem,
    Select,
    TextField,
    Typography,
    Table,
    TableHead,
    TableCell,
    alpha,
    Paper,
    TableBody,
    TableContainer,
    TablePagination,
    TableRow,
    TableSortLabel,
    Toolbar,
    Checkbox,
    Tooltip,
    FormControlLabel,
    Switch,
  } from '@mui/material';
  import Snackbar from '@mui/material/Snackbar';
//   import { DataGrid } from '@mui/x-data-grid';
  import MuiAlert from '@mui/material/Alert';
  import Autocomplete from '@mui/material/Autocomplete';
  import { Box } from '@mui/system';
  import Popover from '@mui/material/Popover';
  import React, { useState, useEffect } from 'react';
  import './Result.css';
  import logo from '../../img/logo.png';
  import PrintIcon from '@mui/icons-material/Print';
  import Backdrop from '@mui/material/Backdrop';
  import CircularProgress from '@mui/material/CircularProgress';
  import { LoadingButton } from '@mui/lab';
  import SaveIcon from '@mui/icons-material/Save';
  import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
  import EditIcon from '@mui/icons-material/Edit';
  import nodata from '../../img/nodata.png';
  
  
  import Modal from '@mui/material/Modal';
  import HighlightOffIcon from '@mui/icons-material/HighlightOff';
  
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: {
      lg: 700,
      xs: 450,
      sm: 600,
      md: 700,
    },
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 2,
    pt: 4,
  };
  // ----------------------------------------------------------------------
  // ----------------------------------------------------------------------
  
  const url = 'https://ulego.ng/api/v1/teacher';
  const urlGet = 'https://ulego.ng/api/v1/teacher/getTeacherStudents/';
  const createUrl = 'https://ulego.ng/api/v1/course';
  // const getResultAverage = 'https://ulego.ng/api/v1/course/student/courses/average';
  const getAllStudent = 'https://ulego.ng/api/v1/student';
  
  // ----------------------------------------------------------------------
  // ----------------------------------------------------------------------
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  
  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }

  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];



  const UpdateBest = () => {
    const [openSnack, setOpenSnack] = useState(false);

    const USER = JSON.parse(window.localStorage.getItem('user-info'));
    const token = USER.token;
    const [loading, setLoading] = useState(true);
    const [sortedStudents, setSortedStudents] = useState([]);
    const [allStudents, setAllStudents] = useState([]);
    const [studentAverage, setStudentAverage] = useState([]);
    const [filteredStudents, setFilteredStudents] = useState([]);
    const [selectedClass, setClass] = useState('JSS-1');
  
    const handleChange = (event) => {
      setClass(event.target.value);
    };


    const fetchAllStudents = async () => {


      setLoading(true);
      try {
        const response = await fetch(getAllStudent, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
    
        // const promises = data.data.map(async (student) => {
        //   try {
        //     const response = await fetch(`${getResultAverage}/${student.id}`, {
        //       method: 'GET',
        //       headers: {
        //         'Content-Type': 'application/json',
        //         Accept: 'application/json',
        //         Authorization: `Bearer ${token}`,
        //       },
        //     });
        //     const averageData = await response.json();
        //     console.log(averageData);
        //     return { ...student, average: averageData.data.averageCourseScore };
        //   } catch (averageError) {
        //     console.error('Error fetching average:', averageError);
        //     return student;
        //   }
        // });
    
        // const studentsWithAverages = await Promise.all(promises);
        // setLoading(false);
        // console.log(studentsWithAverages);
        setStudentAverage(data);
        // console.log(studentAverage);
    
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.error('Error fetching all students:', err);
      }
    };
    
  
   
  
    const filterStudentsByClass = () => {
      const filtered = allStudents.filter((student) => student.className === selectedClass);
      setFilteredStudents(filtered);
    };

    const filterAndSortStudents = () => {
      const filtered = studentAverage.filter((student) => student.className === selectedClass);
      const sorted = filtered.sort((a, b) => (a.average || 0) < (b.average || 0) ? 1 : -1);
      setSortedStudents(sorted);
    };

    useEffect(() => {
      filterAndSortStudents();
    }, [selectedClass, studentAverage]);
  
  
    useEffect(() => {
      fetchAllStudents();
    }, []);
  
   
    
  
    useEffect(() => {
      if (allStudents.length > 0) {
        fetchAverages();
      }
    }, [allStudents]);
  

 
    useEffect(() => {
      filterStudentsByClass();
    }, [selectedClass, allStudents]); 
  

    
  

    
    return (
      <Box sx={{ borderRadius: '30px' }}>
        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 4 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      
        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel id="demo-simple-select-label" sx={{ fontSize: '16px' }}>
            Select Class 
          </InputLabel>
          <Select
            mb={3}
            value={`${selectedClass}`}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            variant="standard"
            size="small"
            label="Age"
            onChange={handleChange}
          >
                <MenuItem value="JSS-1"
                  sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}
                >
                  <Typography variant="h6" sx={{ textAlign: 'center' }}>
                   JSS-1
                  </Typography>
                
                </MenuItem>
                <MenuItem value="JSS-2"
                  sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}
                >
                  <Typography variant="h6" sx={{ textAlign: 'center' }}>
                   JSS-2
                  </Typography>
                
                </MenuItem>
                <MenuItem value="JSS-3"
                  sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}
                >
                  <Typography variant="h6" sx={{ textAlign: 'center' }}>
                   JSS-3
                  </Typography>
                
                </MenuItem>
                <MenuItem value="SSS-1"
                  sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}
                >
                  <Typography variant="h6" sx={{ textAlign: 'center' }}>
                   SSS-1
                  </Typography>
                
                </MenuItem>
                <MenuItem value="SSS-2"
                  sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}
                >
                  <Typography variant="h6" sx={{ textAlign: 'center' }}>
                   SSS-2
                  </Typography>
                
                </MenuItem>
                <MenuItem value="SSS-3"
                  sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}
                >
                  <Typography variant="h6" sx={{ textAlign: 'center' }}>
                   SSS-3
                  </Typography>
                
                </MenuItem>
          </Select>
        </FormControl>
  
        {sortedStudents.length === 0 ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img src={nodata} alt="no-data" width="50%" />
          </Box>
        ) : (
          <Box sx={{ p: 3, mb: 1 }}>
           <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{fontWeight:"600",fintSize:"20px"}}>Name</TableCell>
            <TableCell sx={{fontWeight:"600",fintSize:"20px"}} align="right">Student Number </TableCell>
            <TableCell sx={{fontWeight:"600",fintSize:"20px"}} align="right">Date Of Birth</TableCell>
            {/* <TableCell sx={{fontWeight:"600",fintSize:"20px"}} align="right">Average(%)</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedStudents.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.firstName}  {row.surname}
              </TableCell>
              <TableCell align="right">{row.matriculationNumber}</TableCell>
              <TableCell align="right">{row.DOB}</TableCell>
              {/* <TableCell align="right">{row.carbs}</TableCell> */}
              {/* <TableCell align="right">{row.average === null ? "Pending..." : row.average.toFixed(2) + "%"} </TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer> 
          </Box>
        )}
  
       
      </Box>
    );
  };
  
  export default UpdateBest;
  