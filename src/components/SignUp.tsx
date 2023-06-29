import "../styles/scss/sign-in.scss";
import GoogleIcon from "../icons/GoogleIcon";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { Helmet } from "react-helmet-async";
import { useContext } from "react";
import { AuthContext } from "../context/AuthenticationContext";
import { auth, db, provider } from "../lib/Firebase";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { addDoc, collection } from "firebase/firestore";

export const SignUp = () => {
  const navigate = useNavigate();
  const { signup, googleSignIn } = useContext(AuthContext);

  // use formik to handle form state and validation
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      options: "",
    },
    onSubmit: async (values) => {
      try {
        const email = values.email;
        const password = values.password;

        // create a new user in firebase auth
        await signup({auth, email, password});

        // add user to firestore with the user id from auth and the rest of the form data
        const loggedInUserId = auth.currentUser?.uid;
        const databaseCollection = collection(db, "users");
        await addDoc(databaseCollection, {
          id: loggedInUserId,
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          options: values.options,
          pictute: "",
        });

        // navigate to the feed page
        navigate("/signup/login");
      } catch (error) {
        console.log(error);
      }
    },
    // use yup to validate the form
    validationSchema: Yup.object({
      firstName: Yup.string().required("First Name is required"),
      lastName: Yup.string().required("Last Name is required"),
      options: Yup.string().required("Select an option"),
      email: Yup.string().email("Invalid email address").required("An email address is required"),
      password: Yup.string().required("Password is required"),
      //check if password and confirm password match
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords do not match")
        .required("Confirm Password is required"),
    }),
  });

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn({ auth, provider });

      const loggedInUserId = auth.currentUser?.uid;

      console.log(auth);

      const databaseCollection = collection(db, "users");

        await addDoc(databaseCollection, {
          id: loggedInUserId,
          firstName: auth.currentUser?.displayName?.split(" ")[0],
          lastName: auth.currentUser?.displayName?.split(" ")[1],
          email: auth.currentUser?.email,
          options: "",
          picture: auth.currentUser?.photoURL,
        });

      navigate(`/${loggedInUserId}/feed`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Helmet>
        <title>Register</title>
        <meta name="description" content="Register to get access to the app" />
        <link rel="canonical" href="/signup" />
      </Helmet>
      <h2>Register as a Writer/Reader</h2>

      <form onSubmit={formik.handleSubmit}>
        <div className="names">
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
            />
            {formik.errors.firstName && formik.touched.firstName && (
              <div className="error">{formik.errors.firstName}</div>
            )}
          </div>
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
            />
            {formik.errors.lastName && formik.touched.lastName && (
              <div className="error">{formik.errors.lastName}</div>
            )}
          </div>
        </div>

        <div className="profile_details_options input_wrapper">
          <label htmlFor="options">You are joining as?</label>
          <select
            name="options"
            id="options"
            className="options"
            value={formik.values.options}
            onChange={formik.handleChange}
          >
            <option value="Select">Select</option>
            <option value="Writer">Writer</option>
            <option value="Reader">Reader</option>
            <option value="Writer & Reader">Writer & Reader</option>
          </select>
          {formik.errors.options && formik.touched.options && (
            <div className="error">{formik.errors.options}</div>
          )}
        </div>

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
          />
          {formik.errors.email && formik.touched.email && (
            <div className="error">{formik.errors.email}</div>
          )}
        </div>

        <div className="input_wrapper">
          <label htmlFor="password">Password</label>
          <div className="input">
            <input
              type="password"
              name="password"
              id="password"
              placeholder="**********"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <VisibilityOffOutlinedIcon className="visibility_icon" />
          </div>
          {formik.errors.password && formik.touched.password && (
            <div className="error">{formik.errors.password}</div>
          )}
        </div>

        <div className="input_wrapper">
          <label htmlFor="confirmPassword">Confirm password</label>
          <div className="input">
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              placeholder="**********"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <VisibilityOffOutlinedIcon className="visibility_icon" />
          </div>
          {formik.errors.confirmPassword && formik.touched.confirmPassword && (
            <div className="error">{formik.errors.confirmPassword}</div>
          )}
        </div>

        <button type="submit" disabled={formik.isSubmitting}>
          Create account
        </button>

        <div className="or_sign_with">
          <div className="google">
            <span onClick={handleGoogleSignIn}>
              <GoogleIcon />
              <div>Sign up with google</div>
            </span>
          </div>
        </div>
      </form>
    </>
  );
};
