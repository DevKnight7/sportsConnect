import {  Navigate } from "react-router-dom";

import { isAuthenticUser } from "../utils/validateUser";
import {useSelector} from "react-redux"
import { AuthReducerState } from "../shared/customTypes";
import React from "react";

export type ProtectedRouteProps = {
  authenticationPath: string;
  outlet: JSX.Element;
};

export default function ProtectedRoute({
  authenticationPath,
  outlet,
}: ProtectedRouteProps) {
  const isLoggedIn = useSelector(({ authReducer }: AuthReducerState) => authReducer.isLoggedIn);
  
  if (isLoggedIn) {
    return outlet;
  } else {
    return <Navigate to={{ pathname: authenticationPath }} />;
  }
}
