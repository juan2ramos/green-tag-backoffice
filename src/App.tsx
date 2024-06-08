import { RouterProvider } from 'react-router-dom';
import './styles/styles.scss';
import { router } from './routes/router';
import Spinner from './statics/Spinner';
import '@fontsource-variable/libre-franklin';
import '@fontsource-variable/roboto-flex';

import '@fontsource-variable/raleway';

export const App = () => {
  return <RouterProvider router={router} fallbackElement={<Spinner />} />;
};
