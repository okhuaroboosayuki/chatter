import "../styles/scss/sign-in.scss";
import GoogleIcon from "../icons/GoogleIcon";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { Helmet } from "react-helmet-async";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthenticationContext";
import { auth, db, provider } from "../lib/Firebase";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { doc, setDoc } from "firebase/firestore";
import { ButtonLoader } from "./Loader";

export const SignUp = () => {
  const navigate = useNavigate();
  const { signup, googleSignIn } = useContext(AuthContext);

  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [confirmPasswordVisibility, setConfirmPasswordVisibility] =
    useState(false);
  const [error, setError] = useState("");

  // use formik to handle form state and validation
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      designation: "",
    },
    onSubmit: async (values) => {
      setError("");
      try {
        const email = values.email;
        const password = values.password;

        // create a new user in firebase auth
        await signup({ auth, email, password });

        // add user to firestore with the user id from auth and the rest of the form data
        const loggedInUserId = auth.currentUser?.uid;
        const userRef = doc(db, "users", `${loggedInUserId}`);

        await setDoc(
          userRef,
          {
            id: loggedInUserId,
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            designation: values.designation,
            picture: "",
          },
          { merge: true }
        );

        navigate("/signup/login");
      } catch (error: any) {
        if (error.code === "auth/email-already-in-use") {
          setError("Email already in use");
        } else if (error.code === "auth/network-request-failed") {
          setError("Network error. Check your internet connection");
        } else if (error.code === "auth/too-many-requests") {
          setError("Too many requests. Try again later");
        } else {
          setError("Something went wrong. Try again later");
        }
      }
    },
    // use yup to validate the form
    validationSchema: Yup.object({
      firstName: Yup.string().required("First Name is required"),
      lastName: Yup.string().required("Last Name is required"),
      designation: Yup.string().required("Enter your profession"),
      email: Yup.string()
        .email("Invalid email address")
        .required("An email address is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
      //check if password and confirm password match
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords do not match")
        .required("Confirm Password is required"),
    }),
  });

  const handleGoogleSignIn = async () => {
    setError("");
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
      } else {
        setError("Something went wrong. Try again later");
      }
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
  const handleConfirmPasswordVisibility = () => {
    if (formik.values.confirmPassword.length < 1) {
      return;
    } else {
      setConfirmPasswordVisibility(!confirmPasswordVisibility);

      if (confirmPasswordVisibility) {
        document
          .getElementById("confirmPassword")
          ?.setAttribute("type", "password");
      } else {
        document
          .getElementById("confirmPassword")
          ?.setAttribute("type", "text");
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>Register</title>
        <meta name="description" content="Register to get access to the app" />
        <link rel="canonical" href="/signup" />
      </Helmet>

      {error && <div className="error">{error}</div>}

      <form onSubmit={formik.handleSubmit}>
        <h2>Register as a Writer/Reader</h2>
        <div className="names">
          <div className="wrapper_container">
            <div className="input_wrapper">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                className="first_name_input"
                placeholder="John"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                style={
                  formik.errors.firstName && formik.touched.firstName
                    ? { border: "1px solid red" }
                    : { border: "1px solid #ced4da" }
                }
              />
            </div>
            {/* {formik.errors.firstName && formik.touched.firstName && (
              <div className="error">{formik.errors.firstName}</div>
            )} */}
          </div>
          <div className="wrapper_container">
            <div className="input_wrapper">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                className="last_name_input"
                placeholder="Doe"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                style={
                  formik.errors.lastName && formik.touched.lastName
                    ? { border: "1px solid red" }
                    : { border: "1px solid #ced4da" }
                }
              />
            </div>
            {/* {formik.errors.lastName && formik.touched.lastName && (
              <div className="error">{formik.errors.lastName}</div>
            )} */}
          </div>
        </div>

        <div className="wrapper_container">
          <div className="input_wrapper">
            <label htmlFor="designation">You are joining as?</label>
            <input
              type="text"
              name="designation"
              id="designation"
              className="designation"
              placeholder="Software Engineer"
              value={formik.values.designation}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              style={
                formik.errors.designation && formik.touched.designation
                  ? { border: "1px solid red" }
                  : { border: "1px solid #ced4da" }
              }
            />
          </div>
          {/* {formik.errors.designation && formik.touched.designation && (
              <div className="error">{formik.errors.designation}</div>
            )} */}
        </div>

        <div className="wrapper_container">
          <div className="input_wrapper">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              name="email"
              id="email"
              className="email_input"
              placeholder="Johndoe@gmail.com"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              style={
                formik.errors.email && formik.touched.email
                  ? { border: "1px solid red" }
                  : { border: "1px solid #ced4da" }
              }
            />
          </div>
          {/* {formik.errors.email && formik.touched.email && (
            <div className="error">{formik.errors.email}</div>
          )} */}
        </div>

        <div className="wrapper_container">
          <div className="input_wrapper">
            <label htmlFor="password">Password</label>
            <div
              className="input"
              style={
                formik.errors.email && formik.touched.email
                  ? { border: "1px solid red" }
                  : { border: "1px solid #ced4da" }
              }
            >
              <input
                type="password"
                name="password"
                id="password"
                placeholder="**********"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
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
          {/* {formik.errors.password && formik.touched.password && (
            <div className="error">{formik.errors.password}</div>
          )} */}
        </div>

        <div className="wrapper_container">
          <div className="input_wrapper">
            <label htmlFor="confirmPassword">Confirm password</label>
            <div
              className="input"
              style={
                formik.errors.email && formik.touched.email
                  ? { border: "1px solid red" }
                  : { border: "1px solid #ced4da" }
              }
            >
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                placeholder="**********"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {confirmPasswordVisibility ? (
                <VisibilityOutlinedIcon
                  className="visibility_icon"
                  onClick={handleConfirmPasswordVisibility}
                />
              ) : (
                <VisibilityOffOutlinedIcon
                  className="visibility_icon"
                  onClick={handleConfirmPasswordVisibility}
                />
              )}
            </div>
          </div>
          {/* {formik.errors.confirmPassword && formik.touched.confirmPassword && (
            <div className="error">{formik.errors.confirmPassword}</div>
          )} */}
        </div>

        {formik.isSubmitting ? (
          <ButtonLoader />
        ) : (
          <button type="submit">Create account</button>
        )}

        <div className="or_sign_with">
          <div className="google" onClick={handleGoogleSignIn}>
            <span>
              <GoogleIcon />
              <div>Sign up with google</div>
            </span>
          </div>
        </div>
      </form>
    </>
  );
};
