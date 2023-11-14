import { createBrowserRouter } from 'react-router-dom';

import Layout from './Layout';
import PrivateRoutes from './PrivateRoutes';

import Signup from '../pages/Signup';
import Signin from '../pages/Signin';
import Home from '../pages/Home';
import CreateListing from '../pages/CreateListing';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'signup', element: <Signup /> },
      { path: 'signin', element: <Signin /> },
    ],
  },
  {
    element: <PrivateRoutes />,
    children: [{ path: 'createListing', element: <CreateListing /> }],
  },
]);

export default router;
