import { createBrowserRouter, useNavigate } from "react-router-dom";
import App from "../App";
import { SignIn } from "../pages/SignIn";
import { SignUp } from "../components/SignUp";
import { Login } from "../components/Login";
import { Confirmation } from "../components/Confirmation";
import { Feed } from "../pages/Feed";
import { AuthContext } from "../context/AuthenticationContext";
import { useContext, useEffect } from "react";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate("/signup");
    }
  }, [currentUser, navigate])

  return <>{children}</>;
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/signup",
    element: <SignIn />,
    children: [
      {
        index: true,
        element: <SignUp />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "confirm",
        element: <Confirmation />,
      },
    ],
  },
  {
    path: "/:userId/feed",
    element: (
      <ProtectedRoute>
        <Feed />
      </ProtectedRoute>
    ),
  },
]);
