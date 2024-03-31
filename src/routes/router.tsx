import { createBrowserRouter, Outlet } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import Main from '../layouts/Main';
import ProjectPage from '../pages/ProjectPage';
import AdvertiserPage from '../pages/AdvertiserPage';
import CompensationPage from '../pages/CompensationPage';
import CampaignPage from '../pages/CampaignPage';
import AgencyPage from '../pages/AgencyPage';
import ReportPage from '../pages/ReportPage';
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
      { path: '/agencies', element: <AgencyPage /> },
      { path: '/projects', element: <ProjectPage /> },
      { path: '/advertisers', element: <AdvertiserPage /> },
      { path: '/reportes', element: <ReportPage /> },
      { path: '/compensation', element: <CompensationPage /> },
      { path: '/campaigns', element: <CampaignPage /> },
    ],
    // errorElement: <ErrorPage />,
  },
]);
