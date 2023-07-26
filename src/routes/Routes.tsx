import { createBrowserRouter, useNavigate } from "react-router-dom";
import { SignUp } from "../components/SignUp";
import { Login } from "../components/Login";
import { Feed } from "../pages/Feed";
import { SignIn } from "../pages/SignIn";
import { ErrorPage } from "../pages/ErrorPage";
import { Suspense, lazy, useContext, useEffect } from "react";
import { AllBlogs } from "../components/AllBlogs";
import { AuthContext } from "../context/AuthenticationContext";
import { SingleBlog } from "../pages/SingleBlog";
import { Loader } from "../components/Loader";

// lazy load some pages
const App = lazy(() => import("../App"));
const NewBlogPost = lazy(() =>
  import("../pages/NewBlogPost").then(({ NewBlogPost }) => ({
    default: NewBlogPost,
  }))
);

// set protected routes
type ProtectedRouteProps = {
  children: React.ReactNode;
};

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const route = window.location.pathname;

  useEffect(() => {
    if (!currentUser) {
      if (route !== "/signup" && route !== "/signup/login") {
      navigate("/signup");
      }
    }

  
  }, [currentUser, navigate, route]);

  return <>{children}</>;
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<Loader />}>
        <App />
      </Suspense>
    ),
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
    path: "/feed/:userId/new-post",
    element: (
      <ProtectedRoute>
        <Suspense fallback={<Loader />}>
          <NewBlogPost />
        </Suspense>
      </ProtectedRoute>
    ),
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
    path: "*",
    element: <ErrorPage />,
  },
]);
