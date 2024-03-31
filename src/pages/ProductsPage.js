import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
import Tooltip from '@mui/material/Tooltip';
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
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  Box,
  TextField,
  Grid,
  createTheme,
  ThemeProvider,
  TableContainer,
  Modal,
  TablePagination,
  Skeleton,
  Backdrop,
  CircularProgress,
} from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';

import ContentCopyIcon from '@mui/icons-material/ContentCopy';
// components
import { Link } from 'react-router-dom';
import Label from '../components/label';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
import Success from './success.png';
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';
// mock

const subjects = [
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
  bgcolor: 'white',
  border: '1px solid #0098db',
  boxShadow: 24,
  p: 4,
};
// ----------------------------------------------------------------------

const url = 'https://ulego.ng/api/v1/teacher';

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'company', label: 'Email', alignRight: false },
  { id: 'role', label: 'Class Name', alignRight: false },
  { id: 'isVerified', label: 'Teachers ID', alignRight: false },
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

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user?.firstName?.toLowerCase().indexOf(query?.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function ProductsPage() {
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    handleCloseMenu();
    setOpenModal(true);
  };

  const handleCloseModal = () => setOpenModal(false);

  const [loading, setLoading] = useState(true);

  const [staff, setStaff] = useState([]);

  const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [listId, setListId] = useState(null);

  const [listCourse, setListCourse] = useState([]);

  const [openModalEdit, setOpenModalEdit] = useState(false);

  const [openModalEditCourse, setOpenModalEditCourse] = useState(false);


  const [success, setSuccess] = useState(false);

  const [isError, setIsError] = useState(false);

  const [errorMsg, setErrMsg] = useState('error message');

  const [courseName, setCourseName] = useState('');

  const USER = JSON.parse(window.localStorage.getItem('user-info'));

  const token = USER.token;

  const [copied, setCopied] = useState(false);

  const handleCopyClick = (id) => {
    const textField = document.createElement('textarea');
    textField.innerText = id;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand('copy');
    document.body.removeChild(textField);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };

  // const handleCopyClick = (id) => {
  //   copy(id);
  //   setCopied(true);
  //   setTimeout(() => {
  //     setCopied(false);
  //   }, 1500);
  // };

  const fetchStaff = async () => {
    setLoading(true);
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
      setLoading(false);
      setStaff(data);
    } catch (err) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`https://ulego.ng/api/v1/teacher/${id} `, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      handleCloseModal();
      fetchStaff();
    } catch (err) {
      console.log(err);
    }
  };

  const USERLIST = staff.data ?? [];

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
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

  function setErrorWithTimeout(message, setErrMsg, setIsError) {
    setErrMsg(message);
    setIsError(true);

    setTimeout(() => {
      setErrMsg('');
      setIsError(false);
    }, 3000);
  }

  const handleOpenModalEdit = () => {
    handleCloseMenu();
    setOpenModalEdit(true);
  };

  const handleOpenModalEditCourse = () => {
    handleCloseMenu();
    setOpenModalEditCourse(true);
  };

  const handleUpdate = async (id) => {
    setLoading(true);
    // e.preventDefault();

    try {
      const item = {
        courseSubject: courseName, // Replace with the appropriate course subject
        teacherId: id, // Replace with the appropriate teacher ID
      };

      let result = await fetch(`https://ulego.ng/api/v1/course/teacher/course/subject`, {
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

      if (result.status === 'success') {
        setLoading(false);
        setSuccess(true);
        setCourseName('')
        fetchStaff()
      } else {
        setLoading(false);
        setErrorWithTimeout(result.message, setErrMsg, setIsError);
      }
    } catch (err) {
      setErrorWithTimeout(err, setErrMsg, setIsError);
      console.log(err);
      setLoading(false);
    }
  };














  const handleRemove = async (id) => {
    setLoading(true);
    // e.preventDefault();

    try {
     

      let result = await fetch(`https://ulego.ng/api/v1/course/${id}/${courseName}`, {
        method: 'DELETE',
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
        setCourseName('')
        setSuccess(true);
        fetchStaff()
      } else {
        setLoading(false);
        setErrorWithTimeout(result.message, setErrMsg, setIsError);
      }
    } catch (err) {
      setErrorWithTimeout(err, setErrMsg, setIsError);
      console.log(err);
      setLoading(false);
    }
  };










  const handleCloseModalEdit = () => {
    setSuccess(false)
    setOpenModalEdit(false)
    setOpenModalEditCourse(false)
  };

  const handleCloseModalEditCourse = () => {
    setSuccess(false)
    setOpenModalEditCourse(false)
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

  const filteredUsers = applySortFilter(USERLIST, getComparator(order, orderBy), filterName);

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
              Teacher's List
            </Typography>
            <Link to="/dashboard/create" style={{ textDecoration: 'none' }}>
              <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
                New Teacher
              </Button>
            </Link>
          </Stack>

          <Card>
            <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

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
                      {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                        const { id, firstName, lastName, email, status, className, course_subject
                          , avatarUrl, state } =
                          row;
                        const selectedUser = selected.indexOf(firstName) !== -1;

                        return (
                          <TableRow hover key={index} tabIndex={-1} role="checkbox" selected={selectedUser}>
                            <TableCell padding="checkbox">
                              <Checkbox checked={selectedUser} onChange={(event) => handleClick(event, firstName)} />
                            </TableCell>

                            <TableCell component="th" scope="row" padding="none">
                              <Stack direction="row" alignItems="center" spacing={2}>
                                <Avatar alt={firstName} sx={{ bgcolor: '#212B36' }}>
                                  {firstName.charAt(0)}
                                </Avatar>

                                <Typography variant="subtitle2" noWrap>
                                  {firstName} {lastName}
                                </Typography>
                              </Stack>
                            </TableCell>
                            <TableCell align="left">
                              <a href={`mailto: ${email}`} style={{ color: '#000', textDecoration: 'none' }}>
                                {email}
                              </a>
                            </TableCell>

                            <TableCell align="left">{className}</TableCell>

                            <TableCell sx={{ display: 'flex', gap: '10px', alignItems: 'center' }} align="left">
                              <Tooltip title={copied ? 'Copied!' : 'Copy ID'} arrow>
                                <IconButton onClick={() => handleCopyClick(id)}>
                                  <ContentCopyIcon />
                                </IconButton>
                              </Tooltip>
                              {id.slice(0, 8)}...
                            </TableCell>

                            {/* <TableCell sx={{display:"flex",gap:"10px",alignItems:"center"}} align="left">
                            {id.slice(0, 8)}.....
                            <ContentCopyIcon/>
                            </TableCell> */}

                            <TableCell align="left">
                              <Label color={(status === 'banned' && 'error') || 'success'}>Admitted</Label>
                            </TableCell>

                            <TableCell align="right" key={id} onClick={() => {
                              setListId(id)
                              setListCourse(course_subject)
                            }}>
                              <IconButton size="large" color="inherit" key={id} onClick={handleOpenMenu}>
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
            width: 170,
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
          Assign subject
        </MenuItem>

        <MenuItem key={listId} sx={{ color: 'error.main' }} onClick={handleOpenModalEditCourse}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
          Remove Subject
        </MenuItem>

        <MenuItem key={listId} sx={{ color: 'error.main' }} onClick={handleOpenModal}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
          Delete Teacher
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
        {success ? (
          <Box sx={styleEdit}>
             <Box display="flex" justifyContent="space-between">
              <Typography id="modal-modal-title" variant="h6" component="h2">
                SuccessFul 😁😁😁
              </Typography>
              <IconButton onClick={handleCloseModalEdit}>
                <CancelIcon />
              </IconButton>
            </Box>
            <img style={{
              margin:"20px auto"
            }} src={Success} width={'80px'} height={'80px'} alt="Success Image" />
          </Box>
        ) : (
          <Box sx={styleEdit}>
            <Box display="flex" justifyContent="space-between">
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Assign Course to Teacher
              </Typography>
              <IconButton onClick={handleCloseModalEdit}>
                <CancelIcon />
              </IconButton>
            </Box>
            <Typography id="modal-modal-title" mt={'30px'} variant="h6" component="h2">
              Teacher ID : {listId}
            </Typography>
            <TextField
              sx={{
                mt: '30px',
              }}
              fullWidth
              label="Select Course"
              name="class"
              onChange={(e) => setCourseName(e.target.value)}
              // required
              select
              value={courseName}
              variant="outlined"
            >
              {subjects.map((option, index) => (
                <MenuItem
                  key={index}
                  value={option.label} // Set the value attribute to the label of the subject
                >
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            {isError && (
              <em
                style={{
                  margin: '50px 10px',
                  color: 'red',
                }}
              >
                {errorMsg}
              </em>
            )}
            <br />
            <Button
              variant="contained"
              sx={{
                mt: '20px',
              }}
              onClick={() => handleUpdate(listId)}
            >
              Assign
            </Button>
            <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 4 }} open={loading}>
              <CircularProgress color="inherit" />
            </Backdrop>
          </Box>
        )}
      </Modal>








      <Modal open={openModalEditCourse} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        {success ? (
          <Box sx={styleEdit}>
             <Box display="flex" justifyContent="space-between">
              <Typography id="modal-modal-title" variant="h6" component="h2">
                SuccessFul 😁😁😁
              </Typography>
              <IconButton onClick={handleCloseModalEdit}>
                <CancelIcon />
              </IconButton>
            </Box>
            <img style={{
              margin:"20px auto"
            }} src={Success} width={'80px'} height={'80px'} alt="Success Image" />
          </Box>
        ) : (
          <Box sx={styleEdit}>
            <Box display="flex" justifyContent="space-between">
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Delete Course of Teacher
              </Typography>
              <IconButton onClick={handleCloseModalEditCourse}>
                <CancelIcon />
              </IconButton>
            </Box>
            <Typography id="modal-modal-title" mt={'30px'} variant="h6" component="h2">
              Teacher ID : {listId}
            </Typography>
            <TextField
              sx={{
                mt: '30px',
              }}
              fullWidth
              label="Select Course"
              name="class"
              onChange={(e) => setCourseName(e.target.value)}
              // required
              select
              value={courseName}
              variant="outlined"
            >
              {listCourse?.map((option, index) => (
                <MenuItem
                  key={index}
                  value={option} // Set the value attribute to the label of the subject
                >
                  {option}
                </MenuItem>
              ))}
            </TextField>
            {isError && (
              <em
                style={{
                  margin: '50px 10px',
                  color: 'red',
                }}
              >
                {errorMsg}
              </em>
            )}
            <br />
            <Button
            color="error"
              variant="contained"
              sx={{
                mt: '20px',
              }}
              onClick={() => handleRemove(listId)}
            >
              Remove
            </Button>
            <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 4 }} open={loading}>
              <CircularProgress color="inherit" />
            </Backdrop>
          </Box>
        )}
      </Modal>
    </>
  );
}
