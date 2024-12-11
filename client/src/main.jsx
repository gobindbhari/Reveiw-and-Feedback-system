import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './pages/Home.jsx';
import CommentForm from './components/CommentForm.jsx';
import ApproveFeedback from './components/ApproveFeedback.jsx';
import NotFound from './pages/NotFound.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children:[
      {
        index: true,
        element: <Home/>
      },
      {
        path:'/form/:id',
        element: <CommentForm/>
      },
      {
        path:'/feedback/app',
        element: <ApproveFeedback/>
      },
    ]
  },
  {
    path:'*',
    element: <NotFound/>
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
