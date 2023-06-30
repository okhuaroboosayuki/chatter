import { createBrowserRouter, useNavigate } from "react-router-dom";
import App from "../App";
import { SignIn } from "../pages/SignIn";
import { SignUp } from "../components/SignUp";
import { Login } from "../components/Login";
import { Confirmation } from "../components/Confirmation";
import { Feed } from "../pages/Feed";
import { ErrorPage } from "../pages/ErrorPage";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../lib/Firebase";
import { AllBlogs } from "../components/AllBlogs";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const navigate = useNavigate();
  const route = window.location.pathname;

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (route === "/") {
          navigate(`/feed/${user.uid}`);
        }
        if (route === "/signup") {
          navigate(`/feed/${user.uid}`);
        }
        if (route === "/signup/login") {
          navigate(`/feed/${user.uid}`);
        }
        if (route === "/signup/confirm") {
          navigate(`/feed/${user.uid}`);
        }
      } else return;
    });
  }, [navigate, route]);

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
        element: (
          <ProtectedRoute>
            <SignUp />
          </ProtectedRoute>
        ),
      },
      {
        path: "login",
        element: (
          <ProtectedRoute>
            <Login />
          </ProtectedRoute>
        ),
      },
      {
        path: "confirm",
        element: (
          <ProtectedRoute>
            <Confirmation />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/feed/:userId",
    element: (
      <ProtectedRoute>
        <Feed />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <AllBlogs />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);
