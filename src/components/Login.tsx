import { Helmet } from "react-helmet-async";
import "../styles/scss/sign-in.scss";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthenticationContext";
import { useContext } from "react";
import { auth } from "../lib/Firebase";
import { useFormik } from "formik";
import * as Yup from "yup";

export const Login = () => {
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
        
        await login({auth, email, password});

        const loggedInUserId = auth.currentUser?.uid;

        navigate(`/feed/${loggedInUserId}`);
      } catch (error) {
        console.log(error);
      }
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("An email address is required"),
      password: Yup.string().required("Password is required"),
    }),
  });

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
              <VisibilityOffOutlinedIcon className="visibility_icon" />
            </div>
            {formik.errors.password && formik.touched.password && (
              <div className="error">{formik.errors.password}</div>
            )}
          </div>

          <button type="submit">Log in</button>
        </form>
      </div>
    </>
  );
};
