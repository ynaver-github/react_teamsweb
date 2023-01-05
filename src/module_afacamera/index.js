import React from "react"
import App from "./app"
import { createRoot } from 'react-dom/client';
import store from './redux/store'
import { Provider } from 'react-redux'
import MainActivity, { loader as mainLoader } from "./components/main-activity";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ASForm from "./components/asform";
import 'semantic-ui-css/semantic.min.css';

const container = document.getElementById('root');
const root = createRoot(container);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/main-activity/",
    element: <MainActivity />,
    loader: mainLoader,
  },
  {
    path: "/asform/",
    element: <ASForm />,
    loader: mainLoader,
  },
]);

root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
);

