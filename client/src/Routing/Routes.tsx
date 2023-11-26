import { createBrowserRouter } from 'react-router-dom';

import Layout from './Layout';
import PrivateRoutes from './PrivateRoutes';

import Signup from '../pages/Signup';
import Signin from '../pages/Signin';
import Home from '../pages/Home';
import CreateListing from '../pages/CreateListing';
import Product from '../pages/Product';
import UserListings from '../pages/UserListings';
import ErrorPage from '../pages/ErrorPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: 'signup', element: <Signup /> },
      { path: 'signin', element: <Signin /> },
    ],
  },
  {
    element: <PrivateRoutes />,
    children: [
      { path: 'createListing', element: <CreateListing /> },
      { path: 'products/:id', element: <Product /> },
      { path: 'me/selling', element: <UserListings /> },
    ],
  },
]);

export default router;
