import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthenticationContext";
import { ProtectedRouteProps } from "../types/Types";
import { useEffect, useContext } from "react";

export function ProtectedRouteOne({ children }: ProtectedRouteProps) {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate("/signup/login");
    } else return;
  }, [currentUser, navigate]);

  return <>{children}</>;
}

export function ProtectedRouteTwo({ children }: ProtectedRouteProps) {
    const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const route = window.location.pathname;

    useEffect(() => {
        if (currentUser) {
            if (route === "/signup/login" || route === "/signup") {
                navigate(`/feed/${currentUser.uid}`);
            } else return;
        } else return;
    }, [currentUser, navigate, route])

    return <>{children}</>;
}