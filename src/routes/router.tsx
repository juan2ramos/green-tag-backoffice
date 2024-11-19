import { createBrowserRouter } from 'react-router-dom';
import HomePage from '../modules/home/pages/HomePage';
import { Root } from '../Root';

import AdvertiserPage from '@/modules/green-tag/advertiser/pages/AdvertiserPage';
import CompensationPage from '@/modules/green-tag/compensation/pages/CompensationPage';
import { BonusPage } from '@/modules/green-tag/bonus/pages/BonusPage';
import AgencyPage from '@/modules/green-tag/agency/pages/AgencyPage';
import ReportPage from '@/modules/green-tag/reports/pages/ReportPage';
import { DefaultLayout } from '../layouts/DefaultLayout';
import { AuthLayout } from '../layouts/AuthLayout';

import { LoginPage } from '@/modules/auth/pages/auth/Login';
import { CampaignPage } from '@/modules/green-list/campaign/pages/campaignPage';
import { ClientPage } from '@/modules/green-list/client/pages/clientPage';
import { CampaignDetailPage } from '@/modules/green-list/campaign/pages/campaignDetailPage';
import { SitePage } from '@/modules/green-list/site/pages/sitePage';
import { VideoPage } from '@/modules/green-adserving/videos/pages/videoPage';
import { RichMediaPage } from '@/modules/green-adserving/rich-media/pages/richMediaPage';
import { VideoPageDetail } from '@/modules/green-adserving/videos/pages/videoDetailPage';
import { ProjectPage } from '@/modules/green-tag/projects/pages/ProjectPage';

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
          { path: 'advertisers', element: <AdvertiserPage /> },
          { path: 'compensation', element: <CompensationPage /> },
          { path: 'bonos', element: <BonusPage /> },
          { path: 'projects', element: <ProjectPage /> },
          { path: 'report', element: <ReportPage /> },
        ],
      },
      {
        path: 'green-list',
        element: <DefaultLayout />,
        children: [
          { path: 'campaigns', element: <CampaignPage /> },
          { path: 'clients', element: <ClientPage /> },
          { path: 'sites', element: <SitePage /> },
          { path: 'campaigns/:id', element: <CampaignDetailPage /> },
        ],
      },
      {
        path: 'green-adserving',
        element: <DefaultLayout />,
        children: [
          { path: 'videos', element: <VideoPage /> },
          { path: 'rich-media', element: <RichMediaPage /> },
          { path: 'videos/:id', element: <VideoPageDetail /> },
        ],
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
