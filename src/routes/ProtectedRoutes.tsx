import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthenticationContext";
import { ProtectedRouteProps } from "../types/Types";
import { useEffect, useContext } from "react";

export function ProtectedRouteOne({ children }: ProtectedRouteProps) {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();


  //check if user is logged in through local storage, if not redirect to login page
  useEffect(() => {
    const isUserLoggedIn = localStorage.getItem("isUserLoggedIn");
    if (!isUserLoggedIn) {
      navigate("/signup/login");
    } else return;
  }, [currentUser, navigate]);

  return <>{children}</>;
}

export function ProtectedRouteTwo({ children }: ProtectedRouteProps) {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  //check if user is logged in through local storage, if yes redirect to feed page
  useEffect(() => {
    const isUserLoggedIn = localStorage.getItem("isUserLoggedIn");
    if (isUserLoggedIn && currentUser) {
      navigate(`/feed/${currentUser.uid}`);
    } else return;
  }, [currentUser, navigate]);

  return <>{children}</>;
}
