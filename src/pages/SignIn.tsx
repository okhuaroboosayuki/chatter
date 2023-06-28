// import { useEffect, useRef } from "react";
import "../styles/scss/sign-in.scss";
import { SignInHeader } from "../components/SignInHeader";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import BackIcon from "../icons/BackIcon";

export const SignIn = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // const blurredImageDivRef = useRef<HTMLDivElement>(null);
  // const imgRef = useRef<HTMLImageElement>(null);

  // const loaded = () => {
  //   if (blurredImageDivRef.current) {
  //     blurredImageDivRef.current.classList.add("loaded");
  //   }
  // };

  // useEffect(() => {
  //   if (imgRef.current && imgRef.current.complete) {
  //     loaded();
  //   } else if (imgRef.current) {
  //     imgRef.current.addEventListener("load", loaded);
  //   }
  // }, []);

  return (
      <section className="register">
        <div className="register_container">
          <div
            className="left"
            // ref={blurredImageDivRef}
          >
            <img
              // ref={imgRef}
              src={require("../images/lady-writing-on-a-book.png")}
              alt="writer"
              loading="lazy"
            />
            <div className="left_content-container">
              <div className="left_content">
                <h2>chatter</h2>
                <p>
                  Unleash the Power of Words, Connect with Like-minded Readers
                  and Writers
                </p>
              </div>
            </div>
          </div>

          <div className="right">
            {location.pathname === "/signup/confirm" ? (
              <div className="back_icon">
                <BackIcon className="icon" onClick={() => navigate(-1)} />
                <span>Back</span>
              </div>
            ) : (
              ""
            )}
            <div className="right_container">
              {location.pathname === "/signup/confirm" ? (
                ""
              ) : (
                <div className="links">
                  <SignInHeader to={"/signup"} className="link_one">
                    Register
                  </SignInHeader>
                  <SignInHeader to={"login"} className="link_two">
                    Log In
                  </SignInHeader>
                </div>
              )}
              <Outlet />
            </div>
          </div>
        </div>
      </section>
  );
};
