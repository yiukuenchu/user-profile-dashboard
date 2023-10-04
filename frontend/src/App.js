import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

/** Import all components */
import Username from './components/Username';
import Register from './components/Register';
import Profile from './components/Profile';
import Password from './components/Password';
import PageNotFound from './components/PageNotFound';

/** root routes */
const router = createBrowserRouter([
  {
    path: '/',
    element: <Username></Username>,
  },
  {
    path: '/register',
    element: <Register></Register>,
  },
  {
    path: '/password',
    element: <Password></Password>,
  },
  {
    path: '/profile',
    element: <Profile></Profile>,
  },
  {
    path: '*',
    element: <PageNotFound></PageNotFound>,
  },
]);

export default function App() {
  return (
    <main>
      <RouterProvider router={router}></RouterProvider>
    </main>
  );
}
