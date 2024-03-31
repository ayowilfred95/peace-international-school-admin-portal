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
  TableBody,
  TableRow,
} from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
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
import QuestionList from './QuestionList';

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
  // alignItems: 'center',
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
const getResultUrl = 'https://ulego.ng/api/v1/course/student/courses/';

// ----------------------------------------------------------------------
// ----------------------------------------------------------------------
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const CreateSchools = () => {
  const [openSnack, setOpenSnack] = useState(false);

  const handleCloseSnack = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnack(false);
  };

  const USER = JSON.parse(window.localStorage.getItem('user-info'));

  const token = USER.token;
  const [success, setSuccess] = useState(false);

  const [anchorElPop, setAnchorElPop] = React.useState(null);

  const [loading, setLoading] = useState(false);

  const [stuId, setStuId] = useState();

  const [studentList, setStudentList] = useState([]);
  const [studentSubject, setStudentSubject] = useState([]);

  const [resultData, setResultData] = useState([]);

  const [error, setError] = useState('');

  const [staff, setStaff] = useState([]);

  const [openModal, setOpenModal] = React.useState(false);

  const [openResult, setOpenResult] = useState(false);

  const [selectedSubject, setSelectedSubject] = useState();

  const [student_id, setStudentId] = useState();

  const [course_name, setCourseName] = useState('');

  const [test_score, setTextScore] = useState();

  const [exam_score, setExamScore] = useState();

  const [grade, setGrade] = useState('');

  // const [total, setTotal] = useState('');

  const [student_fullName, setStudentFullName] = useState('');

  const [anchorEl, setAnchorEl] = React.useState(null);

  const [stuclass, setClass] = React.useState('');

  // ----------------------------------------------------------------------
  // ----------------------------------------------------------------------

  const total = parseFloat(test_score) + parseFloat(exam_score);
  const handleClickPop = (event) => {
    setAnchorElPop(event.currentTarget);
  };

  const handleClosePop = () => {
    setAnchorElPop(null);
  };

  const openPop = Boolean(anchorElPop);

  const pop_id = openPop ? 'simple-popover' : undefined;

  const handleCloseResult = () => {
    setOpenResult(false);
  };

  // const handleOpenModal = (e, firstName, secondName, id) => {
  //   setOpenModal(true);
  //   setSelectedSubject(e.target.value);

  //   setStudentFullName(firstName + ' ' + secondName);
  //   setStudentId(id);
  // };

  const handleCloseModal = () => setOpenModal(false);

  const handleChange = (event) => {
    setClass(event.target.value);
    // console.log(stuclass);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSuccess(false);
  };

  const open = Boolean(anchorEl);
  const admin = JSON.parse(localStorage.getItem('user-info'));

  console.log(admin.data.isAdmin);

  // const fetchStaff = async () => {
  //   setLoading(true);
  //   try {
  //     const response = await fetch(url, {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Accept: 'application/json',
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     const data = await response.json();
  //     // console.log(data);
  //     setLoading(false);
  //     setStaff(data);
  //   } catch (err) {
  //     setLoading(false);
  //   }
  // };

  // const getStudentResult = async (id) => {
  //   setLoading(true);
  //   try {
  //     const response = await fetch(getResultUrl + id, {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Accept: 'application/json',
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     const data = await response.json();
  //     setResultData(data.data[0].report);
  //     console.log(resultData, '=>NEw Sammy');
  //     setLoading(false);
  //     setOpenResult(true);
  //     setSelectedSubject(e.target.value);
  //   } catch (err) {
  //     setLoading(false);
  //   }
  // };
  const classes = [
    { id: 1, name: 'JSS1' },
    { id: 2, name: 'JSS2' },
    { id: 3, name: 'JSS3' },
    { id: 4, name: 'SSS1' },
    { id: 5, name: 'SSS2' },
    { id: 6, name: 'SSS3' },
  ];

  // const handleDelete = async (id) => {
  //   const USER = JSON.parse(window.localStorage.getItem('user-info'));

  //   const token = USER.token;
  //   setLoading(true);
  //   try {
  //     const response = await fetch('https://ulego.ng/api/v1/course/' + id, {
  //       method: 'DELETE',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Accept: 'application/json',
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     setLoading(false);
  //     // console.log(id, "gggg")
  //     // window.location.reload(true);
  //     handleCloseResult();
  //     handleClosePop();
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };


  const [selectedOptions, setSelectedOptions] = useState({});
  
  // Sample questions and options
  const questions = [
    {
      question: 'What is the capital of France?',
      options: ['Paris', 'London', 'Berlin', 'Rome'],
      correctAnswer: 'Paris'
    },
    {
      question: 'Who is the author of "To Kill a Mockingbird"?',
      options: ['Harper Lee', 'Stephen King', 'J.K. Rowling', 'Mark Twain'],
      correctAnswer: 'Harper Lee'
    },
    {
      question: 'What is the chemical symbol for gold?',
      options: ['Au', 'Ag', 'Fe', 'Cu'],
      correctAnswer: 'Au'
    },
    {
      question: 'What is the largest mammal in the world?',
      options: ['Blue whale', 'Elephant', 'Giraffe', 'Hippopotamus'],
      correctAnswer: 'Blue whale'
    },
    {
      question: 'Who painted the Mona Lisa?',
      options: ['Leonardo da Vinci', 'Vincent van Gogh', 'Pablo Picasso', 'Michelangelo'],
      correctAnswer: 'Leonardo da Vinci'
    },
    {
      question: 'What is the boiling point of water in degrees Celsius?',
      options: ['100°C', '0°C', '50°C', '200°C'],
      correctAnswer: '100°C'
    },
    {
      question: 'Which planet is known as the Red Planet?',
      options: ['Earth', 'Mars', 'Venus', 'Jupiter'],
      correctAnswer: 'Mars'
    },
    {
      question: 'Who discovered penicillin?',
      options: ['Alexander Fleming', 'Marie Curie', 'Isaac Newton', 'Albert Einstein'],
      correctAnswer: 'Alexander Fleming'
    },
    {
      question: 'What is the capital of Japan?',
      options: ['Tokyo', 'Beijing', 'Seoul', 'Bangkok'],
      correctAnswer: 'Tokyo'
    },
    {
      question: 'What is the chemical symbol for oxygen?',
      options: ['O', 'O2', 'H2O', 'C'],
      correctAnswer: 'O'
    },
    // Add more questions here...
  ];
  
  // export default questions;
  

  const handleSelect = (question, option) => {
    setSelectedOptions({ ...selectedOptions, [question]: option });
  };




  const fetchStudent = async (id) => {
    setStudentSubject([
      { label: 'Mathematics' },
      { label: 'English Language' },
      { label: 'P.H.E' },
      { label: 'Christain Religious Studies' },
      { label: 'Social Studies' },
      { label: 'French Language' },
      { label: 'Igbo Language' },
      { label: 'Home Economics' },
      { label: 'Basic Science' },
      { label: 'Physics' },
      { label: 'Music' },
      { label: 'Essay' },
      { label: 'History' },
      { label: 'C.R.S' },
      { label: 'Business Studies' },
      { label: 'Phonetics ' },
      { label: 'Literature-In-English' },
      { label: 'Agricultural Science' },
      { label: 'Basic Technology' },
      { label: 'Physical Health Education' },
      { label: 'Computer Science' },
      { label: 'Security' },
      { label: 'Cultural and Creative art' },
      { label: 'Government' },
      { label: 'Civic Education' },
      { label: 'Chemistry' },
      { label: 'Accounting' },
      { label: 'Economics' },
      { label: 'Marketing' },
      { label: 'Animal Husbandry' },
      { label: 'Biology' },
      { label: 'Commerce' },
      { label: 'Geography' },
      { label: 'Igbo-Literature' },
    ]);
    // setLoading(true);
    // try {
    //   const response = await fetch(urlGet + id, {
    //     method: 'GET',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       Accept: 'application/json',
    //       Authorization: `Bearer ${token}`,
    //     },
    //   });
    //   const data = await response.json();
    //   setLoading(false);

    //   setStudentList(data.data[0].student);
    //   console.log(studentList);
    // } catch (err) {
    //   setLoading(false);
    // }
  };

  // useEffect(() => {
  //   if (admin.data.isAdmin === true) {
  //     // fetchStaff();
  //   } else {
  //     fetchStudent(admin.data.id);
  //   }
  // }, []);

  // const handleCreateResult = async () => {
  //   setLoading(true);
  //   // e.preventDefault();

  //   try {
  //     const item = { course_name, grade, total, test_score, exam_score, student_fullName, student_id };
  //     let result = await fetch(createUrl, {
  //       method: 'POST',
  //       body: JSON.stringify(item),
  //       headers: {
  //         'Content-Type': 'application/json ',
  //         Accept: 'application/json',
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     result = await result.json();
  //     setOpenSnack(true);
  //     console.log('result', result);
  //     setLoading(false);
  //     setCourseName(' ');
  //     setGrade(' ');
  //     setTextScore(' ');
  //     setExamScore(' ');
  //     setTotal(' ');
  //     setSuccess(true);
  //   } catch (err) {
  //     setError(err);
  //     setLoading(false);
  //   }
  // };

  // console.log('Dominion ', staff.data);

  return (
    <Box sx={{ borderRadius: '30px' }}>
      <Snackbar open={success} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Result Created Successfully
        </Alert>
      </Snackbar>
      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel id="demo-simple-select-label" sx={{ fontSize: '16px' }}>
          Select Class
        </InputLabel>
        <Select
          mb={3}
          value={stuclass}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          variant="standard"
          size="small"
          label="Age"
          onChange={handleChange}
        >
          {
            classes.map((data, index) => (
              <MenuItem
                key={index}
                value={data}
                onClick={() => fetchStudent(data.id)}
                sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}
              >
                {/* <Typography variant="h6" sx={{ textAlign: 'center' }}>
                  {data.firstName} {data.lastName}
                </Typography> */}
                <Typography variant="h6" sx={{ textAlign: 'center' }}>
                  {data.name}
                </Typography>
              </MenuItem>
            ))
          }
        </Select>
      </FormControl>

      {studentSubject.length === 0 ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img src={nodata} alt="no-data" width="50%" />
        </Box>
      ) : (
        <Box sx={{ p: 3, mb: 1 }}>
          <Grid container spacing={2}>
            {studentSubject.map((data, index) => (
              <Grid item lg={3} md={3} sm={6} key={data.id}>
                <Box
                  sx={{
                    border: '1px solid #808080',
                    borderRadius: '10px',
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Avatar />
                  <Box sx={{ mt: 1, textAlign: 'center' }}>
                    <Typography variant="body" sx={{ fontWeight: 'bolder', fontSize: '12px', textAlign: 'center' }}>
                      {data.label}
                    </Typography>
                    <br />
                  
                    {/* <Button
                      variant="outlined"
                      fullWidth
                      sx={{ mb: 1, mt: 2 }}
                      value={`${data.firstName} ${data.surname} - ID: ${data.id}`}
                      onClick={(e) => handleOpenModal(e, data.firstName, data.surname, data.id)}
                    >
                      Create Test
                    </Button> */}
                    <Button
                    sx={{
                      mt:"20px"
                    }}
                      variant="contained"
                    
                      onClick={
                        ()=>{
                          setOpenResult(true)
                          setSelectedSubject(data.label)
                        }
                      }
                      fullWidth
                    >
                     Add / Get Questions
                    </Button>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {/* ------------------------------------------------------------------------------------------------------------------- */}
    
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 4 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Modal
        open={openResult}
        onClose={handleCloseResult}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box sx={{ textAlign: 'right', mb: 2 }}>
            <IconButton onClick={handleCloseResult}>
              <HighlightOffIcon sx={{ fontSize: '30px' }} />
            </IconButton>
          </Box>
          <Box
            sx={{
              borderRadius: '20px',
              display: 'flex',
              justifyContent: 'space-around',
              width: '70%',
              p: 1,
              margin:" 20px auto",
              bgcolor: '#051e34',
              color: '#fff',
            }}
          >
            <Typography variant="body" >{selectedSubject}</Typography>
          </Box>
          {resultData.length !== 0 ? (
            <Box>No Questions...</Box>
          ) : (
            <Box sx={{ overflowY: 'scroll', height: '70vh' }}>
              <Box sx={{
                width:"inherit",
                
              }}>
<QuestionList questions={questions} onSelect={handleSelect} />

                
              </Box>

           
            </Box>
          )}
          <Button onClick={() => console.log(selectedOptions)}>Submit</Button>
          <Button
                      variant="outlined"
                      fullWidth
                      sx={{ mb: 1, mt: 1 }}
                      // value={`${data.firstName} ${data.surname} - ID: ${data.id}`}
                      //  onClick={(e) => handleOpenModal(e, data.firstName, data.surname, data.id)}
                    >
                      Add Questions
                    </Button>
        </Box>
      </Modal>
      <Popover
        id={pop_id}
        open={openPop}
        anchorEl={anchorElPop}
        onClose={handleClosePop}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Typography sx={{ p: 2 }}>Are you sure?</Typography>
        <Button sx={{ color: 'error' }} onClick={() => handleDelete(stuId)}>
          Yes
        </Button>
        <Button onClick={handleClosePop}>No</Button>
      </Popover>
      <Snackbar open={openSnack} autoHideDuration={6000} onClose={handleCloseSnack}>
        <Alert onClose={handleCloseSnack} severity="success" sx={{ width: '100%' }}>
          Result Created Successfully
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CreateSchools;

const subjectList = [
  { label: 'Mathematics' },
  { label: 'English Language' },
  { label: 'P.H.E' },
  { label: 'Christain Religious Studies' },
  { label: 'Social Studies' },
  { label: 'French Language' },
  { label: 'Igbo Language' },
  { label: 'Home Economics' },
  { label: 'Basic Science' },
  { label: 'Physics' },
  { label: 'Music' },
  { label: 'Essay' },
  { label: 'History' },
  { label: 'C.R.S' },
  { label: 'Business Studies' },
  { label: 'Phonetics ' },
  { label: 'Literature-In-English' },
  { label: 'Agricultural Science' },
  { label: 'Basic Technology' },
  { label: 'Physical Health Education' },
  { label: 'Computer Science' },
  { label: 'Security' },
  { label: 'Cultural and Creative art' },
  { label: 'Government' },
  { label: 'Civic Education' },
  { label: 'Chemistry' },
  { label: 'Accounting' },
  { label: 'Economics' },
  { label: 'Marketing' },
  { label: 'Animal Husbandry' },
  { label: 'Biology' },
  { label: 'Commerce' },
  { label: 'Geography' },
  { label: 'Igbo-Literature' },
];
