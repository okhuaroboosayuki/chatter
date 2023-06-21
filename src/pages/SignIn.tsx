import "../styles/scss/sign-in.scss";
import GoogleIcon from "../icons/GoogleIcon";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

export const SignIn = () => {
  return (
    <section className="register">
      <div className="register_container">
        <div className="left">
          <img
            src={require("../images/lady-writing-on-a-book.png")}
            alt="writer"
            loading="lazy"
          />
          <div className="left_content">
            <div className="left_content-container">
              <h2>chatter</h2>
              <p>
                Unleash the Power of Words, Connect with Like-minded Readers and
                Writers
              </p>
            </div>
          </div>
        </div>

        <div className="right">
          <div className="right_container">
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
                  <label htmlFor="lastName">First Name</label>
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
                    <img src={require("../images/linkedIn-icon.png")} alt="LinkedIn Icon" />
                    <div>Sign up with Linkedin</div>
                  </span>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};