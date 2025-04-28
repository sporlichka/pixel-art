import { createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import CanvasPage from './pages/CanvasPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/canvas/:id',
    element: <CanvasPage />,
  }
]);