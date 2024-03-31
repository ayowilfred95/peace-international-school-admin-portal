/* eslint-disable camelcase */

import React, { useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  stepButtonClasses,
  TextField,
} from '@mui/material';
import { Container } from '@mui/system';
import { LoadingButton } from '@mui/lab';
import SaveIcon from '@mui/icons-material/Save';
import { useEffect } from 'react';

const users = [
  {
    value: 'Staff',
    label: 'Staff',
  },
  {
    value: 'Student',
    label: 'Student',
  },
];
const studentClass = [
  {
    value: 'KG-1',
    label: 'KG-1',
  },
  {
    value: 'KG-2',
    label: 'KG-2',
  },
  {
    value: 'NURSERY-1',
    label: 'NURSERY-1',
  },
  {
    value: 'NURSERY-2',
    label: 'NURSERY-2',
  },
  {
    value: 'PRIMARY-1',
    label: 'PRIMARY-1',
  },
  {
    value: 'PRIMARY-2',
    label: 'PRIMARY-2',
  },
  {
    value: 'PRIMARY-3',
    label: 'PRIMARY-3',
  },
  {
    value: 'PRIMARY-4',
    label: 'PRIMARY-4',
  },
  {
    value: 'PRIMARY-5',
    label: 'PRIMARY-5',
  },
  {
    value: 'PRIMARY-6',
    label: 'PRIMARY-6',
  },
  {
    value: 'JSS-1',
    label: 'JSS-1',
  },
  {
    value: 'JSS-2',
    label: 'JSS-2',
  },
  {
    value: 'JSS-3',
    label: 'JSS-3',
  },
  {
    value: 'SSS-1',
    label: 'SSS-1',
  },
  {
    value: 'SSS-2',
    label: 'SSS-2',
  },
  {
    value: 'SSS-3',
    label: 'SSS-3',
  },
];
const states = [
  {
    value: 'Abia ',
    label: 'Abia ',
  },
  {
    value: 'Adamawa',
    label: 'Adamawa',
  },
  {
    value: 'Akwa Ibom',
    label: 'Akwa Ibom',
  },
  {
    value: 'Anambra',
    label: 'Anambra',
  },
  {
    value: 'Bauchi',
    label: 'Bauchi',
  },
  {
    value: 'Bayelsa',
    label: 'Bayelsa',
  },
  {
    value: 'Benue',
    label: 'Benue',
  },
  {
    value: 'Borno',
    label: 'Borno',
  },
  {
    value: 'Cross River ',
    label: 'Cross River ',
  },
  {
    value: 'Delta',
    label: 'Delta',
  },
  {
    value: 'Ebonyi',
    label: 'Ebonyi',
  },
  {
    value: 'Edo',
    label: 'Edo',
  },
  {
    value: 'Ekiti',
    label: 'Ekiti',
  },
  {
    value: 'Enugu',
    label: 'Enugu',
  },
  {
    value: 'Gombe',
    label: 'Gombe',
  },
  {
    value: 'Imo',
    label: 'Imo',
  },
  {
    value: 'Jigawa',
    label: 'Jigawa',
  },
  {
    value: 'Kaduna',
    label: 'Kaduna',
  },
  {
    value: 'Kano ',
    label: 'Kano ',
  },
  {
    value: 'Katsina ',
    label: 'Katsina ',
  },
  {
    value: 'Kebbi',
    label: 'Kebbi',
  },
  {
    value: 'Kogi ',
    label: 'Kogi ',
  },
  {
    value: 'Kwara ',
    label: 'Kwara ',
  },
  {
    value: 'Lagos',
    label: 'Lagos',
  },
  {
    value: 'Nasarawa',
    label: 'Nasarawa',
  },
  {
    value: 'Niger ',
    label: 'Niger ',
  },
  {
    value: 'Ogun ',
    label: 'Ogun ',
  },
  {
    value: 'Ondo ',
    label: 'Ondo ',
  },
  {
    value: 'Osun',
    label: 'Osun',
  },
  {
    value: 'Oyo',
    label: 'Oyo',
  },
  {
    value: 'Plateau',
    label: 'Plateau',
  },
  {
    value: 'Rivers',
    label: 'Rivers',
  },
  {
    value: 'Sokoto',
    label: 'Sokoto',
  },
  {
    value: 'Taraba',
    label: 'Taraba',
  },
  {
    value: 'Yobe ',
    label: 'Yobe ',
  },
  {
    value: 'Zamfara',
    label: 'Zamfara',
  },
];

const AccountProfileCreate = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState('');
  const [firstName, setFirstName] = useState('');
  const [surname, setSurName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  // const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneNumber, setNumber] = useState('');
  const [state, setState] = useState('');
  const [className, setStuClass] = useState('');
  const [parentName, setParentName] = useState('');
  const [parentNumber, setParentNumber] = useState('');
  const [address, setAddress] = useState('');
  const [DOB, setDob] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [LGA, setLGA] = useState('');
  const [yearOfAdmission, setYearOfAdmission] = useState('');
  const [nameOfParent, setNameOfParent] = useState('');
  const [previousClass, setPreviousClass] = useState('');

  const [country, setCountry] = useState('');
  const [teacher_id, setTeacherId] = useState('');
  // const [teacher_id, setTeacher_id] = useState('')
  const [success, setSuccess] = useState(false);
  const [successTeacher, setSuccessTeacher] = useState(false);

  const admin =JSON.parse(localStorage.getItem('user-info')); 

  // console.log(admin.data.isAdmin);

  const USER = JSON.parse(window.localStorage.getItem('user-info'));

  const token = USER.token;

  const handleStudent = async () => {
    setLoading(true);
    // e.preventDefault();

    try {
      const item = { firstName, surname, phoneNumber, state, teacher_id, DOB,LGA, nameOfParent, yearOfAdmission, email, previousClass, className };
     
      let result = await fetch(' https://ulego.ng/api/v1/student', {
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
        setSuccess(true);
      } else {
        setError(true);
      }
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  const handleStaff = async () => {
    console.log("hello");
    setLoading(true);
    // e.preventDefault();
    try {
      const item = { firstName, lastName, email, phoneNumber, className, password};
      let result = await fetch('https://ulego.ng/api/v1/teacher/register', {
        method: 'POST',
        body: JSON.stringify(item),
        headers: {
          'Content-Type': 'application/json ',
          Accept: 'applicaation/json',
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(token);
      result = await result.json();
      console.log('result', result);
      // window.alert("Staff Created Successfully with the following details" + "\n" + "Name:" +" " + firstName + " " + lastName + "\n" + "Email:" + " " + number)
      //   window.location.reload(true)
      setLoading(false);
      setSuccessTeacher(true);
      setFirstName('');
      setLastName('');
      setSurName('');
      setNumber('');
      setPassword('');
      setCountry('');
      setConfirmPassword('');
    } catch (err) {
      setLoading(false);
      setError('Couldnt create staff');
    }
  };
  useEffect(() => {
    if(admin.data.isAdmin === false){
      setUser("Student")
    }
  }, [])
  

  return (
    <>
      {!error == null && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">Student created successfully</Alert>}
      {successTeacher && <Alert severity="success">Teacher created successfully</Alert>}
      <form autoComplete="off" noValidate>
        <Card>
          <Box sx={{ bgcolor: '#e8e9eb', pb: 3 }}>
            <CardHeader subheader="The information can be edited" title="Profile" />

            <Container>
              <TextField
                sx={{ mt: 2 }}
                fullWidth
                label="Select User Type"
                name="UserType"
                onChange={(e) => setUser(e.target.value)}
                helperText="Please make sure you select the correct user type"
                required
                select
                SelectProps={{ native: true }}
                value={user}
                variant="outlined"
              >{
                admin.data.isAdmin === true ? users.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                )) : <option value={"option.value"}>
                Student
              </option>
              }
              
              </TextField>
            </Container>
          </Box>
          <Divider sx={{ mt: 0 }} />
          {user === 'Student' ? (
            <>
              <CardContent>
                <Grid container spacing={3}>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      size="small"
                      helperText="Please specify the first name"
                      label="First name"
                      name="firstName"
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                      value={firstName}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      size="small"
                      fullWidth
                      label="Last name"
                      name="lastName"
                      onChange={(e) => setSurName(e.target.value)}
                      required
                      value={surname}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      size="small"
                      fullWidth
                      label="Email Address"
                      name="email"
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      value={email}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      size="small"
                      fullWidth
                      label="Phone Number"
                      name="phone"
                      onChange={(e) => {
                        setNumber(e.target.value);
                      }}
                      type="number"
                      value={phoneNumber}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      size="small"
                      label="Select State"
                      name="state"
                      onChange={(e) => setState(e.target.value)}
                      required
                      select
                      SelectProps={{ native: true }}
                      value={state}
                      variant="outlined"
                    >
                      {states.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      size="small"
                      label="LGA"
                      name="LGA"
                      onChange={(e) => setLGA(e.target.value)}
                      required
                      value={LGA}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      size="small"
                      label="Select Class"
                      name="Class"
                      onChange={(e) => setStuClass(e.target.value)}
                      required
                      select
                      SelectProps={{ native: true }}
                      value={className}
                      variant="outlined"
                    >
                      {studentClass.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      size="small"
                      fullWidth
                      label=""
                      type="date"
                      name="Date"
                      onChange={(e) => setDob(e.target.value)}
                      required
                      value={DOB}
                      variant="outlined"
                      helperText="Date of Birth"
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      size="small"
                      type="number"
                      label="Year Admitted"
                      name="yearOfAdmission"
                      onChange={(e) => setYearOfAdmission(e.target.value)}
                      required
                      value={yearOfAdmission}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      size="small"
                      label="Name of Parent"
                      name="nameOfParenttName"
                      onChange={(e) => setNameOfParent(e.target.value)}
                      required
                      value={nameOfParent}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                  <TextField
                      fullWidth
                      size="small"
                      label="Previous Class"
                      name="previousClass"
                      onChange={(e) => setPreviousClass(e.target.value)}
                      required
                      select
                      SelectProps={{ native: true }}
                      value={previousClass}
                      variant="outlined"
                    >
                      {studentClass.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      size="small"
                      type="text"
                      label="Teacher's ID"
                      onChange={(e) => setTeacherId(e.target.value)}
                      required
                      value={teacher_id}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <TextField
                      fullWidth
                      size="small"
                      type="text"
                      label="House Address"
                      onChange={(e) => setAddress(e.target.value)}
                      required
                      value={address}
                      variant="outlined"
                    />
                  </Grid>
                </Grid>
              </CardContent>

              {/* .......,,,,,,,,,,,,,,..................,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,.............................,,,,,,,,,,,,,,,,,,,.......... */}

              {/* 
          <Divider>PARENT/GUARDIANS INFORMATIONS</Divider>
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={12}
              xs={12}
            >
              <TextField
                fullWidth
                size='small'
                helperText="Please specify parent name in full"
                label="Parent/Guardians Name"
                name="firstName"
                onChange={(e)=>setParentName(e.target.value)}
                required
                value={parentName}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={12}
              xs={12}
            >
              <TextField
               size='small'
                fullWidth
                label="Home Address"
                name="lastName"
                onChange={(e)=>setAddress(e.target.value)}
                required
                value={address}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
               size='small'
                fullWidth
                label="Email Address"
                name="email"
                onChange={(e)=>setEmail(e.target.value)}
                required
                value={email}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
               size='small'
                fullWidth
                label="Phone Number"
                name="phone"
                onChange={(e)=>setPhoneNumber(e.target.value)}
                type="number"
                value={phoneNumber}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
                <TextField
               size='small'
                fullWidth
                label="Occupation"
                name="occupation"
                onChange={(e)=>setParentNumber(e.target.value)}
                type="text"
                value={parentNumber}
                variant="outlined"
              />
            </Grid>
         
          </Grid>
        </CardContent> */}

              {/* ................////////////////////////////.......................................///////////////////////........... */}

              {/* 
          <Divider>MORE INFORMATIONS</Divider>
        <CardContent>
          <Grid
            container
            spacing={3}
          >
           
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
               size='small'
                fullWidth
                label=""
                type="date"
                name="Date"
                
                required
                variant="outlined"
                helperText="Date of Admission"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
               size='small'
                fullWidth
                label="Admission Number"
                name="AN"
                
                type="text"
             
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
                <TextField
               size='small'
                fullWidth
                label="Class Admitted Into"
                name="occupation"
                
                type="text"
                
                variant="outlined"
              />
            </Grid>
         
          </Grid>
        </CardContent>
        <Divider /> */}

              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  p: 2,
                }}
              >
                {!loading && (
                  <LoadingButton
                    disabled={!firstName || !surname || !phoneNumber || !state || !teacher_id || !DOB}
                    fullWidth
                    size="large"
                    type="submit"
                    onClick={handleStudent}
                    variant="contained"
                  >
                    Create Student
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
                    Creating Student
                  </LoadingButton>
                )}
              </Box>
            </>
          ) : (
            <>
              {' '}
              <CardContent>
                <Grid container spacing={3}>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      helperText="Please specify the first name"
                      label="First name"
                      name="firstName"
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                      value={firstName}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      label="Last name"
                      name="lastName"
                      onChange={(e) => setLastName(e.target.value)}
                      required
                      value={lastName}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      label="Email Address"
                      name="email"
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      value={email}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      label="Phone Number"
                      name="phone"
                      onChange={(e) => setNumber(e.target.value)}
                      type="number"
                      value={phoneNumber}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                  <TextField
                      fullWidth
                      label="country"
                      name="country"
                      onChange={(e) => setCountry(e.target.value)}
                      type="text"
                      value={country}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      label="Select class"
                      name="class"
                      onChange={(e) => setStuClass(e.target.value)}
                      required
                      select
                      value={className}
                      SelectProps={{ native: true }}
                      variant="outlined"
                    >
                      {studentClass.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </TextField>
                  </Grid>
                  
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      label="Password"
                      name="password"
                      onChange={(e) => setPassword(e.target.value)}
                      type="text"
                      value={password}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      label="Confirm password"
                      name="confirm"
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      type="text"
                      value={confirmPassword}
                      variant="outlined"
                    />
                  </Grid>
                </Grid>
              </CardContent>
              <Divider />
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  p: 2,
                }}
              >
                {!loading && (
                  <LoadingButton
                    disabled={ password !== confirmPassword || !firstName || !lastName || !email || !phoneNumber || !password }
                    fullWidth
                    size="large"
                    type="submit"
                    onClick={handleStaff}
                    variant="contained"
                  >
                    Create Staff
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
                    Creating Staff
                  </LoadingButton>
                )}
              </Box>
            </>
          )}
        </Card>
      </form>
    </>
  );
};

export default AccountProfileCreate;
