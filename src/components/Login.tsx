import { Helmet } from "react-helmet-async";
import "../styles/scss/sign-in.scss";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthenticationContext";
import { useContext, useState } from "react";
import { auth } from "../lib/Firebase";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ButtonLoader } from "./Loader";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';

export const Login = () => {
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      try {
        const email = values.email;
        const password = values.password;

        await login({ auth, email, password });

        const loggedInUserId = auth.currentUser?.uid;

        navigate(`/feed/${loggedInUserId}`);
      } catch (error: any) {
        if (error.code === "auth/user-not-found") {
          setError("No user found with this email address");
        } else if (error.code === "auth/wrong-password") {
          setError("Incorrect password");
        } else if (error.code === "auth/too-many-requests") {
          setError("Too many requests. Try again later");
        } else if (error.code === "auth/network-request-failed") {
          setError("Network error. Check your internet connection");
        } else {
          setError("Something went wrong. Try again later");
        }
      }
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("An email address is required"),
      password: Yup.string().required("Password is required"),
    }),
  });

  // handle password visibility
  const handlePasswordVisibility = () => {
    if (formik.values.password.length < 1) {
      return;
    } else {
      setPasswordVisibility(!passwordVisibility);

      if (passwordVisibility) {
        document.getElementById("password")?.setAttribute("type", "password");
      } else {
        document.getElementById("password")?.setAttribute("type", "text");
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>Log In</title>
        <meta name="description" content="Log in to get access to the app" />
        <link rel="canonical" href="/signup/login" />
      </Helmet>
      <div className="login_container">
        <h2 className="login_header">Welcome Back</h2>

        <form onSubmit={formik.handleSubmit}>
          <div className="input_wrapper">
            <label htmlFor="email">Email Address</label>
            <input
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="email"
              name="email"
              id="email"
              className="email_input"
              placeholder="Johndoe@gmail.com"
            />
            {formik.errors.email && formik.touched.email && (
              <div className="error">{formik.errors.email}</div>
            )}
            {error && <div className="error">{error}</div>}
          </div>

          <div className="input_wrapper">
            <label htmlFor="password">Password</label>
            <div className="input">
              <input
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="password"
                name="password"
                id="password"
                placeholder="**********"
                className="password_input"
              />
              {passwordVisibility ? (
                <VisibilityOutlinedIcon
                  className="visibility_icon"
                  onClick={handlePasswordVisibility}
                />
              ) : (
                <VisibilityOffOutlinedIcon
                  className="visibility_icon"
                  onClick={handlePasswordVisibility}
                />
              )}
            </div>
            {formik.errors.password && formik.touched.password && (
              <div className="error">{formik.errors.password}</div>
            )}
          </div>

          {formik.isSubmitting ? (
            <ButtonLoader />
          ) : (
            <button type="submit">Log in</button>
          )}
        </form>
      </div>
    </>
  );
};
