import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
import { useState, useEffect } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography, createTheme, ThemeProvider } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
// components
import { Link } from 'react-router-dom';
import Iconify from '../components/iconify';
// sections
import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
} from '../sections/@dashboard/app';

// ----------------------------------------------------------------------

const theme = createTheme({
  palette: {
    primary: {
      main: '#0098db',
    },
  },
});
export default function DashboardAppPage() {
  const theme = useTheme();

  const [loading, setLoading] = useState(true);
  const [staff, setStaff] = useState([]);
  const [student, setStudent] = useState([]);

  const USER = JSON.parse(window.localStorage.getItem('user-info'));

  const token = USER.token;

  const admin =JSON.parse(localStorage.getItem('user-info')); 

  console.log(admin.data.isAdmin);

  const fetchStudent = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://ulego.ng/api/v1/student', {
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
      setStudent(data);
    } catch (err) {
      setLoading(false);
    }
  };

  const fetchStaff = async () => {
    const urlStaff = ' https://ulego.ng/api/v1/teacher';

    setLoading(true);
    try {
      const response = await fetch(urlStaff, {
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
    fetchStudent();
    fetchStaff();
  }, []);

  const dataStudent = student.data ?? [];
  const dataStaff = staff.data ?? [];
  console.log(dataStudent);
  const total = dataStaff.length + dataStudent.length;

  return (
    <>
      <Helmet>
        <title> Dashboard | Promise Int'l Dashboard </title>
      </Helmet>
      <ThemeProvider theme={theme}>
        <Container maxWidth="xl">
          <Typography variant="h4" sx={{ mb: 5 }}>
            Hi, Welcome back
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={ admin.data.isAdmin === true ? 3 : 6 }>
              <Link to="/dashboard/student" style={{ textDecoration: 'none' }}>
                <AppWidgetSummary
                  title="Registered Student"
                  total={dataStudent.length ?? 0} 
                  icon={'mdi:account-student-outline'}
                />
              </Link>
            </Grid>

            <Grid item xs={12} sm={6} md={ admin.data.isAdmin === true ? 3 : 6 }>
              <Link to="/dashboard/teachers" style={{ textDecoration: 'none' }}>
                <AppWidgetSummary
                  title="Registered Staff"
                  total={dataStaff.length ?? 0}
                  icon={'ph:chalkboard-teacher-light'}
                />
              </Link>
            </Grid>

            {
              admin.data.isAdmin === true && 
              <>
                <Grid item xs={12} sm={6} md={3}>
                <Link to="/dashboard/create" style={{ textDecoration: 'none' }}>
                  <AppWidgetSummary title="Create Student/Staff" total={total} icon={'material-symbols:add'} />
                </Link>
              </Grid>
  
              <Grid item xs={12} sm={6} md={3}>
                <Link to="/dashboard/push" style={{ textDecoration: 'none' }}>
                  <AppWidgetSummary title="Push Notification" total=" " icon={'ic:outline-notification-add'} />
                </Link>
              </Grid></>
              // )
            }

           

            {/* <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits
              title="Website Visits"
              subheader="(+43%) than last year"
              chartLabels={[
                '01/01/2003',
                '02/01/2003',
                '03/01/2003',
                '04/01/2003',
                '05/01/2003',
                '06/01/2003',
                '07/01/2003',
                '08/01/2003',
                '09/01/2003',
                '10/01/2003',
                '11/01/2003',
              ]}
              chartData={[
                {
                  name: 'Team A',
                  type: 'column',
                  fill: 'solid',
                  data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                },
                {
                  name: 'Team B',
                  type: 'area',
                  fill: 'gradient',
                  data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                },
                {
                  name: 'Team C',
                  type: 'line',
                  fill: 'solid',
                  data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                },
              ]}
            />
          </Grid> */}

            <Grid item xs={12} md={6} lg={4}>
              <AppCurrentVisits
                title="Registered Users"
                chartData={[
                  { label: 'Student', value: dataStudent.length },
                  { label: 'Staff', value: dataStaff.length },
                ]}
                chartColors={[
                  theme.palette.primary.main,
                  theme.palette.info.main,
                  theme.palette.warning.main,
                  theme.palette.error.main,
                ]}
              />
            </Grid>

            <Grid item xs={12} md={6} lg={8}>
              <AppNewsUpdate
                title="Newly Registered"
                list={dataStudent.slice(0, 5).map((data, index) => ({
                  id: data.id,
                  title: `${data.firstName} ${data.surname}`,
                  description: data.phoneNumber,
                  image: data.firstName.charAt(0),
                  postedAt: data.createdAt,
                  link: '/dashboard/student',
                }))}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={8}>
              <AppNewsUpdate
                title="Newly Registered"
                list={dataStaff.slice(0, 5).map((data, index) => ({
                  id: data.id,
                  title: `${data.firstName} ${data.lastName}`,
                  description: data.email,
                  image: data.firstName.charAt(0),
                  postedAt: data.createdAt,
                  link: '/dashboard/teachers',
                }))}
              />
            </Grid>

            {/* <Grid item xs={12} md={6} lg={4}>
            <AppOrderTimeline
              title="Order Timeline"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: [
                  '1983, orders, $4220',
                  '12 Invoices have been paid',
                  'Order #37745 from September',
                  'New order placed #XF-2356',
                  'New order placed #XF-2346',
                ][index],
                type: `order${index + 1}`,
                time: faker.date.past(),
              }))}
            />
          </Grid> */}

            {/* <Grid item xs={12} md={6} lg={4}>
            <AppTrafficBySite
              title="Traffic by Site"
              list={[
                {
                  name: 'FaceBook',
                  value: 323234,
                  icon: <Iconify icon={'eva:facebook-fill'} color="#1877F2" width={32} />,
                },
                {
                  name: 'Google',
                  value: 341212,
                  icon: <Iconify icon={'eva:google-fill'} color="#DF3E30" width={32} />,
                },
                {
                  name: 'Linkedin',
                  value: 411213,
                  icon: <Iconify icon={'eva:linkedin-fill'} color="#006097" width={32} />,
                },
                {
                  name: 'Twitter',
                  value: 443232,
                  icon: <Iconify icon={'eva:twitter-fill'} color="#1C9CEA" width={32} />,
                },
              ]}
            />
          </Grid> */}
          </Grid>
        </Container>
      </ThemeProvider>
    </>
  );
}
