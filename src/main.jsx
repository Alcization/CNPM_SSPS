import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter,RouterProvider } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import Root from './pages/layout/not_login/Root.jsx'
import Blank from './pages/layout/blank/Blank.jsx'
import Error from './pages/ErrorPage.jsx'
import MainContent from './pages/not_log_in/Main/MainContent.jsx';
import AboutContent from './pages/not_log_in/About/AboutContent.jsx';
import ServiceContent from './pages/not_log_in/Service/ServiceContent.jsx';
import Login from './pages/not_log_in/Login/Login.jsx';
import AdminHome from './pages/layout/admin/Admin.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Blank />, 
    errorElement: <Error />,
    children: [
      {
        path: '',
        element: <Root />,
        children: [
          {
            path: '',
            element: <MainContent />,
          },
          {
            path: 'aboutcontent',
            element: <AboutContent />,
          },
          {
            path: 'servicecontent',
            element: <ServiceContent />,
          }
        ]
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'admin_home',
        element: <AdminHome />,
      },

      /*
      {
        path: '/',
        element: <StudentLayout />,
        errorElement: <Error />,
        children: [
          {
            path: 'student_home'
            element: <StudentHome />,
          },
        ],
      },

      {
        path: '/',
        element: <AdminLayout />,
        errorElement: <Error />,
        children: [
          {
            path: 'admin_home'
            element: <AdminHome />,
          },
        ],
      },
      */
     
    ],
  },


  
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <RouterProvider router={router} />
    </HelmetProvider>
  </React.StrictMode>
)
