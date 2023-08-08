import "../styles/scss/sign-in.scss";
import { SignInHeader } from "../components/SignInHeader";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import BackIcon from "../icons/BackIcon";

export const SignIn = () => {
  const navigate = useNavigate();

  //handles blur load of image
  useEffect(() => {
    const blurImage = document.querySelector(
      ".lady_writer_img_blur"
    ) as HTMLElement;

    const heroImage = document.querySelector(
      ".lady_writer_img"
    ) as HTMLImageElement;

    const loaded = () => {
      blurImage.classList.add("loaded");
    };

    if (heroImage?.complete) {
      loaded();
    } else {
      heroImage?.addEventListener("load", loaded);
    }
  }, []);

  return (
    <section className="register">
      <div className="register_container">
        <div className="left lady_writer_img_blur">
          <img
            src={require("../images/lady-writing-on-a-book.webp")}
            alt="writer"
            loading="lazy"
            className="lady_writer_img"
          />
          <div className="left_content-container">
            <div className="left_content">
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
            <header className="auth_header">
              <div className="back_icon">
                <BackIcon className="icon" onClick={() => navigate("/")} />
                <span>Back</span>
              </div>
              <div className="links">
                <SignInHeader to={"/signup"} className="link_one">
                  Register
                </SignInHeader>
                <SignInHeader to={"login"} className="link_two">
                  Log In
                </SignInHeader>
              </div>
            </header>
            <Outlet />
          </div>
        </div>
      </div>
    </section>
  );
};
