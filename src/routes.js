import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import BlogPage from './pages/Result';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';
import CreateStaff from './pages/CreateStaff';
import ProtectedRoute from './sections/auth/login/ProtectedRoute';
import PushNotification from './pages/PushNotification';
import ForgetPassword from './pages/ForgetPassword';
import Payment from './pages/Payment';
import TeacherDashboardAppPage from './pages/TeacherDashboardAppPage';
import TeacherDashboardLayout from './layouts/dashboard/TeacherDashboardLayout';
import Best from './pages/Best';
import Tests from './pages/Tests';


// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element:<ProtectedRoute><DashboardLayout /> </ProtectedRoute> ,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <ProtectedRoute><DashboardAppPage /></ProtectedRoute> },
        { path: 'student', element: <UserPage /> },
        { path: 'teachers', element: <ProductsPage /> },
        { path: 'result', element:<ProtectedRoute> <BlogPage /></ProtectedRoute> },
        { path: 'tests', element:<ProtectedRoute> <Tests /></ProtectedRoute> },
        { path: 'overall_best', element:<ProtectedRoute> <Best /></ProtectedRoute> },
        { path: 'create', element: <CreateStaff /> },
        { path: 'push', element: <PushNotification /> },
        { path: 'payment', element: <Payment /> },
  
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: 'forgetpassword',
      element: <ForgetPassword />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
