import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

/** Import all components */
import Username from './components/Username';
import Register from './components/Register';
import Profile from './components/Profile';
import Password from './components/Password';
import PageNotFound from './components/PageNotFound';

/** Auth middleware */
import { AuthorizeUser, ProtectRoute } from './middleware/auth';

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
    element: (
      <ProtectRoute>
        <Password />
      </ProtectRoute>
    ),
  },
  {
    path: '/profile',
    element: (
      <AuthorizeUser>
        <Profile />
      </AuthorizeUser>
    ),
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
