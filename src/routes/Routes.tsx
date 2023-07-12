import { createBrowserRouter, useNavigate } from "react-router-dom";
import App from "../App";
import { SignIn } from "../pages/SignIn";
import { SignUp } from "../components/SignUp";
import { Login } from "../components/Login";
import { Feed } from "../pages/Feed";
import { ErrorPage } from "../pages/ErrorPage";
import { useContext, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../lib/Firebase";
import { AllBlogs } from "../components/AllBlogs";
import { NewBlogPost } from "../pages/NewBlogPost";
import { AuthContext } from "../context/AuthenticationContext";
import { SingleBlog } from "../pages/SingleBlog";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const route = window.location.pathname;

  useEffect(() => {
      if (currentUser) {
        if (route === "/signup" || route === "/signup/login") {
          navigate(`/feed/${currentUser.uid}`);
        }
      } else return;

      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (!user) {
          navigate("/signup");
        }
      }
      );

      return () => unsubscribe();
  }, [currentUser, navigate, route]);

  return <>{children}</>;
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/signup",
    element: <SignIn />,
    errorElement: <ErrorPage />,
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
    ],
  },
  {
    path: "/feed/:userId",
    element: (
      <ProtectedRoute>
        <Feed />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
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
    path: "/feed/:userId/new-post",
    element: (
      <ProtectedRoute>
        <NewBlogPost />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/feed/:userId/post/:blogId",
    element: (
      <ProtectedRoute>
        <SingleBlog />
      </ProtectedRoute>
    ),
  },
  {
    path: "/:catchAll(.*)*",
    element: <ErrorPage />,
  },
]);
