import {
  DASHBOARD_ROUTE,
  LOGIN_ROUTE,
  COINSTABLE_ROUTE,
  CORRELATION_ROUTE,
} from "./consts";
import Login from "../scenes/login";
import Dashboard from "../scenes/dashboard";
import CoinsTable from "../scenes/coinstable";
import Correlation from "../scenes/correlation";

export const publicRoutes = [
  {
    path: LOGIN_ROUTE,
    Component: <Login />,
  },
];

export const privateRoutes = [
  {
    path: DASHBOARD_ROUTE,
    Component: <Dashboard />,
  },
  {
    path: COINSTABLE_ROUTE,
    Component: <CoinsTable />,
  },
  {
    path: CORRELATION_ROUTE,
    Component: <Correlation />,
  },
];
