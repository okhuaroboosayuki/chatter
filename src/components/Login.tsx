import { Helmet } from "react-helmet-async";
import "../styles/scss/sign-in.scss";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthenticationContext";
import { useContext, useRef } from "react";
import { auth } from '../lib/Firebase';

export const Login = () => {
  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const emailRef = useRef<HTMLInputElement>(null!);
  const passwordRef = useRef<HTMLInputElement>(null!);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const email = emailRef.current?.value;
      const password = passwordRef.current?.value;

      await login({
        auth,
        email,
        password,
      });

      console.log(auth.currentUser?.uid);
      const loggedInUserId = auth.currentUser?.uid;
      
      navigate(`/${loggedInUserId}/feed`);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Helmet>
        <title>Log In</title>
        <meta name="description" content="Log in to get access to the app" />
        <link rel="canonical" href="/signup/login" />
      </Helmet>
      <div className="login_container">
        <h2 className="login_header">Welcome Back</h2>

        <form onSubmit={handleSubmit}>
          <div className="input_wrapper">
            <label htmlFor="email">Email Address</label>
            <input
            ref={emailRef}
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
              ref={passwordRef}
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
