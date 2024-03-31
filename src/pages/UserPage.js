import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  Button,
  Popover,
  Checkbox,
  Box,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  createTheme,
  ThemeProvider,
  TableContainer,
  TablePagination,
  Skeleton,
  Modal,
  Select,
  TextField,
  InputLabel,
  FormControl,
  Grid,
  Backdrop,
  CircularProgress,
} from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
// components
import Label from '../components/label';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
// sections
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';
// mock

const theme = createTheme({
  palette: {
    primary: {
      main: '#0098db',
    },
  },
});

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '1px solid #0098db',
  boxShadow: 24,
  p: 4,
};
const styleEdit = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '1px solid #0098db',
  boxShadow: 24,
  p: 4,
};
// ----------------------------------------------------------------------

const url = 'https://ulego.ng/api/v1/student';
const urlGet = 'https://ulego.ng/api/v1/teacher/getTeacherStudents/';


const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'company', label: 'Phone Number', alignRight: false },
  { id: 'role', label: 'Student Number', alignRight: false },
  { id: 'isVerified', label: 'Date of Birth', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: '' },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}









function applySortFilter(array, comparator, query, selectedClass) {

  const filteredArray = array.filter((user) => {
    return (
      (selectedClass === 'ALL' || user.className === selectedClass) &&
      Object.values(user).some(
        (value) =>
          typeof value === 'string' &&
          value?.toString()?.toLowerCase()?.includes(query?.toLowerCase())
      )
    );
  });

  const stabilizedThis = filteredArray.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  return stabilizedThis.map((el) => el[0]);
}





export default function UserPage() {
  const [openModal, setOpenModal] = useState(false);

  const [error, setError] = useState(' ');


  const handleOpenModal = () =>{ 
    handleCloseMenu()
    setOpenModal(true)
  };

  const handleCloseModal = () => setOpenModal(false);

  const [age, setAge] = useState('ALL');

  // const handleChange = (event) => {
  //   setAge(event.target.value);
  // };

  const handleChange = (event) => {
    setAge(event.target.value);
    setFilterName(''); // Reset the filter when changing the class
  };
  

  const [openModalEdit, setOpenModalEdit] = useState(false);

  const handleOpenModalEdit = () => setOpenModalEdit(true);

  const handleCloseModalEdit = () => setOpenModalEdit(false);

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [staff, setStaff] = useState([]);

  const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const USER = JSON.parse(window.localStorage.getItem('user-info'));

  const [listId, setListId] = useState(null);

  const [firstName, setFirstName] = useState('');

  const [surname, setSurName] = useState('');

  const [lastName, setLastName] = useState('');

  const [email, setEmail] = useState('');

  const [studentState, setStudentState] = useState('');

  const [phoneNumber, setPhoneNumber] = useState('');

  const token = USER.token;

  const admin =JSON.parse(localStorage.getItem('user-info')); 

  // console.log(admin.data.isAdmin);

  const fetchStaff = async () => {
    setLoading(true);
    if(admin.data.isAdmin === true){
      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        console.log(data);
        if (data.status === 'success') {
          setLoading(false);
          setStaff(data);
        } else if (data.status === 'failed') {
          navigate('/login');
        }
      } catch (err) {
        setLoading(true);
      }
    }else{

        // setLoading(true);
        try {
          const response = await fetch(urlGet + admin.data.id, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              Authorization: `Bearer ${token}`,
            },
          });
          const data = await response.json();
          console.log(data);
          if (data.status === 'success') {
            setLoading(false);
            setStaff(data);
          } else if (data.status === 'failed') {
            navigate('/login');
          }
        } catch (err) {
          setLoading(false);
        }
      
    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  let USERLIST;

if (admin.data.isAdmin === true) {
  USERLIST = staff.data ?? [];
} else {
  USERLIST = staff.data?.[0]?.student || [];
}

  // const USERLIST = staff.data ?? [];



  // const USERLIST = admin.data.isAdmin === true ? staff.data ?? [] : staff.data[0].student ?? [];

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`https://ulego.ng/api/v1/student/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
     
      fetchStaff();
       handleCloseModal()
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = async (id) => {
    setLoading(true);
    // e.preventDefault();

    try {
      const item = { firstName, lastName, email, phoneNumber };
      let result = await fetch(`https://ulego.ng/api/v1/student/${id}`, {
        method: 'PUT',
        body: JSON.stringify(item),
        headers: {
          'Content-Type': 'application/json ',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      result = await result.json();
      console.log('result', result);

      if (result.status === 'success') {
        setLoading(false);
        setSuccess(true);
      } else {
        setLoading(false);
        setError(true);
      }
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  const handleOpenMenu = (e, firstName, surName, phoneNumber, email, state) => {
    setOpen(e.currentTarget);
    setFirstName(firstName);
    setSurName(surName);
    setPhoneNumber(phoneNumber);
    setEmail(email);
    setStudentState(state);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = USERLIST.map((n) => n.firstName);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  // const filteredUsers = applySortFilter(USERLIST, getComparator(order, orderBy), filterName);

  const filteredUsers = applySortFilter(
    USERLIST,
    getComparator(order, orderBy),
    filterName,
    age
  );
  



  const isNotFound = !filteredUsers.length && !!filterName;

  return (
    <>
      <Helmet>
        <title> User | Promise Int'l Dashboard </title>
      </Helmet>
      <ThemeProvider theme={theme}>
        <Container>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4" gutterBottom>
              Student List
            </Typography>
            {
              admin.data.isAdmin === true && <Link to="/dashboard/create">
              <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
                New student
              </Button>
            </Link>
            }
            
          </Stack>

          <Card sx={{
            position:"relative"
          }}>
            <Box sx={{display:"flex",
            justifyContent:"space-between",
            alignItems:"center"
          }}>
            <UserListToolbar numSelected={selected.length}
             onFilterName={handleFilterByName}
              />
              <Box sx={{ minWidth: 120,position:"absolute", right:"20px", bgcolor:"white" }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Class</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value={"ALL"}>ALL</MenuItem>
          <MenuItem value={"JSS-1"}>JSS-1</MenuItem>
          <MenuItem value={"JSS-2"}>JSS-2</MenuItem>
          <MenuItem value={"JSS-3"}>JSS-3</MenuItem>
          <MenuItem value={"SSS-1"}>SSS-1</MenuItem>
          <MenuItem value={"SSS-2"}>SSS-2</MenuItem>
          <MenuItem value={"SSS-3"}>SSS-3</MenuItem>
        </Select>
      </FormControl>
    </Box>
            </Box>

            <Scrollbar>
              <TableContainer sx={{ minWidth: 800 }}>
                <Table>
                  <UserListHead
                    order={order}
                    orderBy={orderBy}
                    headLabel={TABLE_HEAD}
                    rowCount={USERLIST.length}
                    numSelected={selected.length}
                    onRequestSort={handleRequestSort}
                    onSelectAllClick={handleSelectAllClick}
                  />
                  {!loading && (
                    <TableBody>
                      {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                        const { id, firstName, surname, DOB, status, email, company, phoneNumber, matriculationNumber, state } =
                          row;
                        const selectedUser = selected.indexOf(firstName) !== -1;

                        return (
                          <TableRow hover key={id} tabIndex={-1} role="checkbox" selected={selectedUser}>
                            <TableCell padding="checkbox">
                              <Checkbox checked={selectedUser} onChange={(event) => handleClick(event, firstName)} />
                            </TableCell>

                            <TableCell component="th" scope="row" padding="none">
                              <Stack direction="row" alignItems="center" spacing={2}>
                                <Avatar alt={firstName} sx={{ bgcolor: '#212B36' }}>
                                  {firstName.charAt(0)}
                                </Avatar>

                                <Typography variant="subtitle2" noWrap>
                                  {firstName} {surname}
                                </Typography>
                              </Stack>
                            </TableCell>
                            <TableCell align="left">{phoneNumber}</TableCell>

                            <TableCell align="left">{matriculationNumber}</TableCell>

                            <TableCell align="left">{DOB}</TableCell>

                            <TableCell align="left">
                              <Label color={(status === 'banned' && 'error') || 'success'}>Admitted</Label>
                            </TableCell>

                            <TableCell
                              align="right"
                              key={id}
                              onClick={() => {
                                setListId(id);
                              }}
                            >
                              <IconButton
                                size="large"
                                color="inherit"
                                onClick={(e) => handleOpenMenu(e, firstName, surname, phoneNumber, email, state)}
                              >
                                <Iconify icon={'eva:more-vertical-fill'} />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                      {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                          <TableCell colSpan={6} />
                        </TableRow>
                      )}
                    </TableBody>
                  )}

                  {loading && (
                    <TableBody>
                      <TableRow hover tabIndex={-1} role="checkbox">
                        <TableCell padding="checkbox">
                          <Checkbox />
                        </TableCell>

                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Skeleton variant="circular" width={40} height={40} />
                            <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                          </Stack>
                        </TableCell>
                        <TableCell align="left">
                          <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                        </TableCell>

                        <TableCell align="left">
                          <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                        </TableCell>

                        <TableCell align="left">
                          <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                        </TableCell>

                        <TableCell align="left">
                          <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                        </TableCell>

                        <TableCell align="right">
                          <IconButton size="large" color="inherit" onClick={handleOpenMenu}>
                            <Iconify icon={'eva:more-vertical-fill'} />
                          </IconButton>
                        </TableCell>
                      </TableRow>

                      <TableRow hover tabIndex={-1} role="checkbox">
                        <TableCell padding="checkbox">
                          <Checkbox />
                        </TableCell>

                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Skeleton variant="circular" width={40} height={40} />
                            <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                          </Stack>
                        </TableCell>
                        <TableCell align="left">
                          <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                        </TableCell>

                        <TableCell align="left">
                          <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                        </TableCell>

                        <TableCell align="left">
                          <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                        </TableCell>

                        <TableCell align="left">
                          <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                        </TableCell>

                        <TableCell align="right">
                          <IconButton size="large" color="inherit" onClick={handleOpenMenu}>
                            <Iconify icon={'eva:more-vertical-fill'} />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  )}

                  {isNotFound && (
                    <TableBody>
                      <TableRow>
                        <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                          <Paper
                            sx={{
                              textAlign: 'center',
                            }}
                          >
                            <Typography variant="h6" paragraph>
                              Not found
                            </Typography>

                            <Typography variant="body2">
                              No results found for &nbsp;
                              <strong>&quot;{filterName}&quot;</strong>.
                              <br /> Try checking for typos or using complete words.
                            </Typography>
                          </Paper>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  )}
                </Table>
              </TableContainer>
            </Scrollbar>

            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={USERLIST.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Card>
        </Container>
      </ThemeProvider>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem onClick={handleOpenModalEdit}>
          <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem sx={{ color: 'error.main' }} onClick={handleOpenModal}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>

      <Modal open={openModal} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Are you sure you want to delete?
          </Typography>
          <Box display="flex" justifyContent="space-around" mt={3} key={listId}>
            <Button variant="outlined" color="error" onClick={() => handleDelete(listId)}>
              Yes
            </Button>
            <Button variant="outlined" onClick={handleCloseModal}>
              No
            </Button>
          </Box>
        </Box>
      </Modal>

      <Modal open={openModalEdit} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={styleEdit}>
          <Box display="flex" justifyContent="space-between">
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Edit details
            </Typography>
            <IconButton onClick={handleCloseModalEdit}>
              <CancelIcon />
            </IconButton>
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="space-around"
            p={4}
            mt={3}
            sx={{ border: '1px solid #0098db ' }}
          >
            <Grid container spacing={2}>
              <Grid item lg={6}>
                <TextField
                  label="First Name"
                  size="small"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item lg={6}>
                <TextField
                  label="Surname"
                  size="small"
                  value={surname}
                  onChange={(e) => setSurName(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item lg={6}>
                <TextField
                  label="State"
                  size="small"
                  value={studentState}
                  onChange={(e) => setStudentState(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item lg={6}>
                <TextField
                  label="Phone Number"
                  size="small"
                  type="number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item lg={12}>
                <TextField
                  label="Email"
                  size="small"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item lg={12}>
                <TextField
                  label="Address"
                  size="small"
                  type="text"
                  onChange={(e) => setFirstName(e.target.value)}
                  margin="normal"
                  fullWidth
                />
              </Grid>
            </Grid>

            <Button variant="contained" onClick={() => handleUpdate(listId)}>
              Update
            </Button>
            <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 4 }} open={loading}>
              <CircularProgress color="inherit" />
            </Backdrop>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
