import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Loading from './components/Loading';
import { Provider } from 'react-redux';
import store from './redux/store';
import './utils/global-api';
import { HelmetProvider } from 'react-helmet-async';
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminContextProvider from './context/AdminContext';
import Protected from './components/Protected';
import NotFound from './pages/NotFound';
const Teachers = lazy(() => import('./pages/Teachers'));
const Admins = lazy(() => import('./pages/Admins'));
const Login = lazy(() => import('./pages/Login'));
const Home = lazy(() => import('./pages/Home'));
const AddAdmin = lazy(() => import('./pages/AddAdmin'));
const AddTeacher = lazy(() => import('./pages/AddTeacher'));
const Profile = lazy(() => import('./pages/profile/Profile'));
const UpdateAdmin = lazy(() => import('./pages/UpdateAdmin'));
const Settings = lazy(() => import('./pages/Settings'));
const ResetPassword = lazy(() => import('./pages/ResetPassword'));
const LoginLayout = lazy(() => import('./layouts/LoginLayout'));
const RootLayout = lazy(() => import('./layouts/RootLayout'));

const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <NotFound />,
    element: (
      <Protected>
        <RootLayout />
      </Protected>
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },

      {
        path: 'teachers',
        element: <Teachers />,
      },

      {
        path: 'settings',
        element: <Settings />,
      },
      {
        path: 'admins',
        children: [
          {
            index: true,
            element: <Admins />,
          },
          {
            path: ':id',
            element: <UpdateAdmin />,
          },
        ],
      },
      {
        path: 'profile',
        element: <Profile />,
      },
      {
        path: 'add-teacher',
        element: <AddTeacher />,
      },
      {
        path: 'add-admin',
        element: <AddAdmin />,
      },
    ],
  },

  {
    path: '/',
    element: <LoginLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'reset-password',
        element: <ResetPassword />,
      },
    ],
  },
]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Suspense fallback={<Loading />}>
      <Provider store={store}>
        <HelmetProvider>
          <AdminContextProvider>
            <RouterProvider router={router} />
          </AdminContextProvider>
        </HelmetProvider>
      </Provider>
    </Suspense>
  </React.StrictMode>
);

reportWebVitals();
