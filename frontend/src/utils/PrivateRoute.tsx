import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
interface PrivateRouteProps {
  component: React.FC;
  path: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component: Component,
  ...rest
}) => {
  const context = useAuth();
  context?.user;

  return (
    <Route
      {...rest}
      element={context?.user ? <Component /> : <Navigate to="/login" replace />}
    />
  );
};

export default PrivateRoute;
