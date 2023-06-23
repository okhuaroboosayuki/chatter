import "../styles/scss/sign-in.scss";
import GoogleIcon from "../icons/GoogleIcon";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { Helmet } from "react-helmet-async";

export const SignUp = () => {
  return (
    <>
      <Helmet>
        <title>Register</title>
        <meta name="description" content="Register to get access to the app" />
        <link rel="canonical" href="/signup" />
      </Helmet>
      <h2>Register as a Writer/Reader</h2>

      <form>
        <div className="names">
          <div className="input_wrapper">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              className="first_name_input"
              placeholder="John"
            />
          </div>
          <div className="input_wrapper">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              className="last_name_input"
              placeholder="Doe"
            />
          </div>
        </div>

        <div className="profile_details_options input_wrapper">
          <label htmlFor="options">You are joining as?</label>
          <select name="options" id="options" className="options">
            <option value="writer">Writer</option>
            <option value="reader">Reader</option>
            <option value="reader">Writer & Reader</option>
          </select>
        </div>

        <div className="input_wrapper">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            name="email"
            id="email"
            className="email_input"
            placeholder="Johndoe@gmail.com"
          />
        </div>

        <div className="input_wrapper">
          <label htmlFor="password">Password</label>
          <div className="input">
            <input
              type="password"
              name="password"
              id="password"
              placeholder="**********"
            />
            <VisibilityOutlinedIcon className="visibility_icon" />
          </div>
        </div>

        <div className="input_wrapper">
          <label htmlFor="confirmPassword">Confirm password</label>
          <div className="input">
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              placeholder="**********"
            />
            <VisibilityOutlinedIcon className="visibility_icon" />
          </div>
        </div>

        <button type="submit">Create account</button>

        <div className="or_sign_with">
          <div className="google">
            <span>
              <GoogleIcon />
              <div>Sign up with google</div>
            </span>
          </div>
          <div className="linkedIn">
            <span>
              <img
                src={require("../images/linkedIn-icon.png")}
                alt="LinkedIn Icon"
              />
              <div>Sign up with Linkedin</div>
            </span>
          </div>
        </div>
      </form>
    </>
  );
};
