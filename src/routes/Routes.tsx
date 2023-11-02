import { createBrowserRouter } from "react-router-dom";
import { SignUp } from "../components/SignUp";
import { Login } from "../components/Login";
import { Feed } from "../pages/Feed";
import { SignIn } from "../pages/SignIn";
import { ErrorPage } from "../pages/ErrorPage";
import { Suspense, lazy } from "react";
import { AllBlogs } from "../components/AllBlogs";
import { SingleBlog } from "../pages/SingleBlog";
import { Loader } from "../components/Loader";
import { ProtectedRouteOne, ProtectedRouteTwo } from "./ProtectedRoutes";

// lazy load some pages
const App = lazy(() => import("../App"));
const NewBlogPost = lazy(() =>
  import("../pages/NewBlogPost").then(({ NewBlogPost }) => ({
    default: NewBlogPost,
  }))
);

// set protected routes

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
    element: (
      <Suspense fallback={<Loader />}>
        <ProtectedRouteTwo>
          <SignIn />
        </ProtectedRouteTwo>
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: <SignUp />,
      },
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
  {
    path: "/feed/:userId",
    element: (
      <Suspense fallback={<Loader />}>
        <ProtectedRouteOne>
          <Feed />
        </ProtectedRouteOne>
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: <AllBlogs />,
      },
    ],
  },
  {
    path: "/feed/:userId/new-post",
    element: (
      <Suspense fallback={<Loader />}>
        <ProtectedRouteOne>
          <NewBlogPost />
        </ProtectedRouteOne>
      </Suspense>
    ),
  },
  {
    path: "/feed/:userId/post/:blogId",
    element: (
      <Suspense fallback={<Loader />}>
        <ProtectedRouteOne>
          <SingleBlog />
        </ProtectedRouteOne>
      </Suspense>
    ),
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);
