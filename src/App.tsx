import { RouterProvider } from 'react-router-dom';
import '@fontsource-variable/libre-franklin';
import './styles/styles.scss';
import { router } from './routes/router';
import Spinner from './statics/Spinner';

export const App = () => {
  return <RouterProvider router={router} fallbackElement={<Spinner />} />;
};
