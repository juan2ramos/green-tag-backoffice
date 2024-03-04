import { createBrowserRouter, Outlet } from 'react-router-dom';
import { AgencyPage, HomePage } from '../pages';
import Main from '../layouts/Main';
//import ErrorPage from '../pages/ErrorPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Main>
        <Outlet />
      </Main>
    ),
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/agencias', element: <AgencyPage /> },
      { path: 'advertisers', element: 'adasd' },
    ],
    // errorElement: <ErrorPage />,
  },
]);
