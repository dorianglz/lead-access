import React from 'react';
import ReactDOM from 'react-dom/client';
import { AuthProvider } from './context/AuthProvider';

import './index.css';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

// PAGES
import MainPage from './Main.js'
import Login from './Login.js';
import Collaborators from './collaborators.js';
import { PrivateRoute } from './component/privateRoute.js';

const router = createBrowserRouter([
  {
    path: "/",
    element: <PrivateRoute> <MainPage /> </PrivateRoute>,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/collaborators",
    element: <PrivateRoute> <Collaborators /> </PrivateRoute>,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);