import { Helmet } from "react-helmet-async";
import "../styles/scss/sign-in.scss";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

export const Login = () => {
  return (
    <>
      <Helmet>
        <title>Log In</title>
        <meta name="description" content="Log in to get access to the app" />
        <link rel="canonical" href="/signup/login" />
      </Helmet>
      <div className="login_container">
        <h2 className="login_header">Welcome Back</h2>

        <form>
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
                className="password_input"
              />
              <VisibilityOutlinedIcon className="visibility_icon" />
            </div>
          </div>

          <button type="submit">Log in</button>
        </form>
      </div>
    </>
  );
};
