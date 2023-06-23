import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { SignIn } from "../pages/SignIn";
import { SignUp } from "../components/SignUp";
import { Login } from "../components/Login";

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
    ],
  },
]);
