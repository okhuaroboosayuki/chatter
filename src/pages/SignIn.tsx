// import { useEffect, useRef } from "react";
import "../styles/scss/sign-in.scss";
import { SignUp } from "../components/SignUp";
// import { Login } from "../components/Login";
import { SignInHeader } from "../components/SignInHeader";

export const SignIn = () => {
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
                Unleash the Power of Words, Connect with Like-minded Readers and
                Writers
              </p>
            </div>
          </div>
        </div>

        <div className="right">
          <div className="right_container">
            <div className="links">
              <SignInHeader to={"register/signup"} className="link_one">
                Register
              </SignInHeader>
              <SignInHeader to={"register/login"} className="link_two">
                Log In
              </SignInHeader>
            </div>
            <SignUp />
            {/* <Login /> */}
          </div>
        </div>
      </div>
    </section>
  );
};
