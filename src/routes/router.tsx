import { createBrowserRouter } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import { Root } from '../Root';
import ProjectPage from '../pages/green-tag/ProjectPage';
import AdvertiserPage from '../pages/green-tag/AdvertiserPage';
import CompensationPage from '../pages/green-tag/CompensationPage';
import CampaignPageAnt from '../pages/green-tag/CampaignPage';
import AgencyPage from '../pages/green-tag/AgencyPage';
import ReportPage from '../pages/green-tag/ReportPage';
import { DefaultLayout } from '../layouts/DefaultLayout';
import { AuthLayout } from '../layouts/AuthLayout';
import { LoginPage } from '../components/auth/pages/auth/Login';
import { CampaignPage } from '@/pages/green-list/Campaings';
//import ErrorPage from '../pages/ErrorPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/',
        element: <DefaultLayout />,
        children: [{ path: '/', element: <HomePage /> }],
      },
      {
        path: 'green-tag',
        element: <DefaultLayout />,
        children: [
          { path: 'agencies', element: <AgencyPage /> },
          { path: 'projects', element: <ProjectPage /> },
          { path: 'advertisers', element: <AdvertiserPage /> },
          { path: 'reportes', element: <ReportPage /> },
          { path: 'compensation', element: <CompensationPage /> },
          { path: 'campaigns', element: <CampaignPageAnt /> },
        ],
      },
      {
        path: 'green-list',
        element: <DefaultLayout />,
        children: [
          { path: 'campaigns', element: <CampaignPage /> },
          { path: 'sites', element: <ProjectPage /> },
        ],
      },
      {
        path: 'green-adserving',
        element: <DefaultLayout />,
        children: [{ path: 'creatives', element: <AgencyPage /> }],
      },
      {
        path: 'auth',
        element: <AuthLayout />,
        children: [
          {
            path: 'login',
            element: <LoginPage />,
          },
        ],
      },
    ],
    // errorElement: <ErrorPage />,
  },
  {
    path: '*',
    element: <h1>Not found</h1>,
  },
]);
