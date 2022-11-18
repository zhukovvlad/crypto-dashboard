import { Routes, Route, Navigate } from "react-router-dom";
import { DASHBOARD_ROUTE, LOGIN_ROUTE } from "../utils/consts";
import { privateRoutes, publicRoutes } from "../utils/routes";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase.utils";

const AppRouter = () => {
  const [user] = useAuthState(auth);

  return user ? (
    <Routes>
      {privateRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} element={Component} />
      ))}
      <Route path="*" element={<Navigate to={DASHBOARD_ROUTE} replace />} />
    </Routes>
  ) : (
    <Routes>
      {publicRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} element={Component} />
      ))}
      <Route path="*" element={<Navigate to={LOGIN_ROUTE} replace />} />
    </Routes>
  );
};

export default AppRouter;
