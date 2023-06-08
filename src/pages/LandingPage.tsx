import "../styles/scss/landing-page.scss";

export const LandingPage = () => {
  return (
    <section className="landing_page">
      <header>
        <h1 className="logo">
          <a href="/">Chatter</a>
        </h1>

        <nav>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="http://">About us</a>
            </li>
            <li>
              <a href="http://">Contact</a>
            </li>
            <li>
              <a href="http://">Blogs</a>
            </li>
          </ul>

          <div className="links">
            <a href="http://" className="log_in">
              Log in
            </a>
            <a href="http://" className="sign_up">
              Sign up
            </a>
          </div>
        </nav>
      </header>

      <div className="hero">
        <div className="hero_container">
          <h2>Welcome to Chatter: A Haven for Text-Based Content</h2>
          <p>
            Unleash the Power of Words, Connect with Like-minded Readers and
            Writers
          </p>
          <a href="http://" className="hero_btn">
            Get started
          </a>
        </div>
      </div>

      <div className="about">
        <div className="about_container">
          <div className="left">
            <h2>About Chatter</h2>
            <p>
              Chatter is a multi-functional platform where authors and readers
              can have access to their own content. It aims to be a traditional
              bookworm’s heaven and a blog to get access to more text based
              content. Our vision is to foster an inclusive and vibrant
              community where diversity is celebrated. We encourage
              open-mindedness and respect for all individuals, regardless of
              their backgrounds or beliefs. By promoting dialogue and
              understanding, we strive to build a community that is tolerant and
              respectful of differences.
            </p>
          </div>
          <div className="right"></div>
        </div>
      </div>

      <div className="why_join_chatter">
        <div className="why_join_chatter-container">
          <div className="top">
            <h2>Why you should join chatter</h2>
            <p>
              Our goal is to make writers and readers see our platform as their
              next heaven for blogging, ensuring ease in interactions,
              connecting with like-minded peers, have access to favorite content
              based on interests and able to communicate your great ideas with
              people
            </p>
          </div>
          <div className="bottom">
            <div className="analytics"></div>
            <div className="social_interactions"></div>
            <div className="content_creation"></div>
          </div>
        </div>
      </div>
    </section>
  );
};
