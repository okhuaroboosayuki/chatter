import { Helmet } from "react-helmet-async";
import "../styles/scss/sign-in.scss";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthenticationContext";
import { useContext, useState } from "react";
import { auth, db, provider } from "../lib/Firebase";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ButtonLoader } from "./Loader";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { doc, setDoc } from "firebase/firestore";
import GoogleIcon from "../icons/GoogleIcon";

export const Login = () => {
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const { login, googleSignIn } = useContext(AuthContext);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      if (values.email === "") {
        setError("email is required");
      }
      try {
        const email = values.email;
        const password = values.password;

        await login({ auth, email, password });

        const loggedInUserId = auth.currentUser?.uid;

        navigate(`/feed/${loggedInUserId}`);
      } catch (error: any) {
        if (error.code === "auth/user-not-found") {
          setError("User does not exist");
        } else if (error.code === "auth/wrong-password") {
          setError("Incorrect password");
        } else if (error.code === "auth/too-many-requests") {
          setError("Too many requests. Try again later");
        } else if (error.code === "auth/network-request-failed") {
          setError("Network error. Check your internet connection");
        } else return;
      }
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("An email address is required"),
      password: Yup.string().required("Password is required"),
    }),
  });

  const handleGoogleSignIn = async () => {
    if (error) setError("");

    try {
      await googleSignIn({ auth, provider });

      const loggedInUserId = auth.currentUser?.uid;

      const userRef = doc(db, "users", `${loggedInUserId}`);

      await setDoc(
        userRef,
        {
          id: loggedInUserId,
          firstName: auth.currentUser?.displayName?.split(" ")[0],
          lastName: auth.currentUser?.displayName?.split(" ")[1],
          email: auth.currentUser?.email,
          designation: "",
          picture: auth.currentUser?.photoURL,
        },
        { merge: true }
      );

      navigate(`/feed/${loggedInUserId}`);
    } catch (error: any) {
      if (error.code === "auth/network-request-failed") {
        setError("Network error. Check your internet connection");
      } else if (error.code === "auth/too-many-requests") {
        setError("Too many requests. Try again later");
      } else return;
    }
  };

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
        <form onSubmit={formik.handleSubmit}>
          {error && <div className="main_error">{error}</div>}
          <h2 className="login_header">Welcome Back</h2>
          <div className="wrapper_container">
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
                style={
                  formik.errors.email && formik.touched.email
                    ? { border: "1px solid red" }
                    : { border: "1px solid #ced4da" }
                }
                autoComplete="on"
              />
            </div>
            {formik.errors.email && formik.touched.email && (
              <div className="error">{formik.errors.email}</div>
            )}
          </div>

          <div className="wrapper_container">
            <div className="input_wrapper">
              <label htmlFor="password">Password</label>
              <div
                className="input"
                style={
                  formik.errors.password && formik.touched.password
                    ? { border: "1px solid red" }
                    : { border: "1px solid #ced4da" }
                }
              >
                <input
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  type="password"
                  name="password"
                  id="password"
                  placeholder="**********"
                  className="password_input"
                  autoComplete="on"
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
            </div>
            {formik.errors.password && formik.touched.password && (
              <div className="error">{formik.errors.password}</div>
            )}
          </div>

          <div className="submit_btn">
            {formik.isSubmitting ? (
              <ButtonLoader />
            ) : (
              <button type="submit">Log In</button>
            )}
          </div>

          <div className="or_sign_with">
            <div className="google" onClick={handleGoogleSignIn}>
              <span>
                <GoogleIcon />
                <div>Sign in with google</div>
              </span>
            </div>
          </div>

          <div className="back_home" onClick={() => navigate("/")}>
            back
          </div>
        </form>
      </div>
    </>
  );
};
