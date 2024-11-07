import { Navigate, useRoutes } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Personnel from "../pages/Personnel";
import PersonnelDetails from "../pages/PersonnelDetail";
import Page404 from "../pages/Page404";
import PersonnelList from "../pages/PersonnelList";
import Home from "../pages/Home";
import NewPassword from "../pages/NewPassword";
export default function Router() {
  const routes = useRoutes([
    {
      path: "/",
      element: <Navigate to="/login" />,
    },
    
    {
      path: "/home",
      element: <Home />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/newPassword",
      element: <NewPassword />,
    },
    { path: "/personnelList", element: <PersonnelList /> },
    {
      path: "/personnel",
      element: <Personnel />,
    },
    {
      path: "/personnelDetail",
      element: <PersonnelDetails />,
    },
    {
      path: "*",
      element: <Page404 />,
    },
  ]);
  return routes;
}
