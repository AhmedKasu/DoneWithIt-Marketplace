import { createBrowserRouter } from 'react-router-dom';

import App from '../App';
import Signin from '../pages/Signin';
import Signup from '../pages/Signup';
import Layout from './Layout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <App /> },
      { path: 'signup', element: <Signup /> },
      { path: 'signin', element: <Signin /> },
    ],
  },
]);

export default router;
