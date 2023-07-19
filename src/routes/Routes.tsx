import { createBrowserRouter, useNavigate } from "react-router-dom";
import { SignUp } from "../components/SignUp";
import { Login } from "../components/Login";
import { Feed } from "../pages/Feed";
import { ErrorPage } from "../pages/ErrorPage";
import { Suspense, lazy, useContext, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../lib/Firebase";
import { AllBlogs } from "../components/AllBlogs";
import { AuthContext } from "../context/AuthenticationContext";
import { SingleBlog } from "../pages/SingleBlog";
import { Loader } from "../components/Loader";

// lazy load some pages
const App = lazy(() => import("../App"));
const SignIn = lazy(() =>
  import("../pages/SignIn").then(({ SignIn }) => ({ default: SignIn }))
);
const NewBlogPost = lazy(() =>
  import("../pages/NewBlogPost").then(({ NewBlogPost }) => ({
    default: NewBlogPost,
  }))
);

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
    });

    unsubscribe();
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
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Suspense fallback={<Loader />}>
              <SignUp />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "login",
        element: (
          <ProtectedRoute>
            <Suspense fallback={<Loader />}>
              <Login />
            </Suspense>
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
        <Suspense fallback={<Loader />}>
          <NewBlogPost />
        </Suspense>
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
    path: "/:catchAll(.*)/*",
    element: <ErrorPage />,
  },
]);
