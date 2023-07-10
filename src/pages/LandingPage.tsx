import AnalyticsIcon from "../icons/AnalyticsIcon";
import BookIcon from "../icons/BookIcon";
import PeopleIcon from "../icons/PeopleIcon";
import CopyrightIcon from "@mui/icons-material/Copyright";
import "../styles/scss/landing-page.scss";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthenticationContext";

export const LandingPage = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/signup/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="landing_page">
      <header>
        <h1 className="logo">
          <Link to={"/"}>Chatter</Link>
        </h1>

        <nav>
          <ul>
            <li>
              <Link to={"/"}>Home</Link>
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

          {currentUser ? (
            <div className="links">
              <Link to={`/feed/${currentUser?.uid}`} className="btn">
                Feed
              </Link>
              <button className="logout" onClick={handleLogout}>
                Logout
              </button>
            </div>
          ) : (
            <div className="links">
              <Link to={"/signup/login"} className="log_in">
                Log in
              </Link>
              <Link to={"/signup"} className="sign_up">
                Sign up
              </Link>
            </div>
          )}
        </nav>
      </header>

      <div className="hero">
        <div className="hero_container">
          <h2>Welcome to Chatter: A Haven for Text-Based Content</h2>
          <p>
            Unleash the Power of Words, Connect with Like-minded Readers and
            Writers
          </p>
          {!currentUser && (
            <Link to={"/signup"} className="hero_btn btn">
              Get started
            </Link>
          )}
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
            <div className="analytics">
              <div className="icon">
                <AnalyticsIcon />
              </div>
              <article>
                <h3>Analytics</h3>
                <p>
                  Analytics to track the number of views, likes and comment and
                  also analyze the performance of your articles over a period of
                  time
                </p>
              </article>
            </div>
            <div className="social_interactions">
              <div className="icon">
                <PeopleIcon />
              </div>
              <article>
                <h3>Social interactions</h3>
                <p>
                  Users on the platform can interact with posts they like,
                  comment and engage in discussions
                </p>
              </article>
            </div>
            <div className="content_creation">
              <div className="icon">
                <BookIcon />
              </div>
              <article>
                <h3>Content creation</h3>
                <p>
                  Write nice and appealing with our in-built markdown, a rich
                  text editor
                </p>
              </article>
            </div>
          </div>
        </div>
      </div>

      <div className="testimonial">
        <div className="left">
          <div className="avatar"></div>
        </div>
        <div className="right">
          <p>
            "Chatter has become an integral part of my online experience. As a
            user of this incredible blogging platform, I have discovered a
            vibrant community of individuals who are passionate about sharing
            their ideas and engaging in thoughtful discussions.”
          </p>
          <div className="avatar_name">
            <p>
              <span>Osayuki Okhuarobo, </span>Software developer at AltSchool
            </p>
          </div>
          {!currentUser && (
            <Link to={"/signup"} className="btn">
              Join chatter
            </Link>
          )}
        </div>
      </div>

      <div className="c_t_a">
        <div className="c_t_a-container">
          <div className="left">
            <div className="c_t_a-images">
              <div className="image1"></div>
              <div className="image2"></div>
              <div className="image3"></div>
            </div>
          </div>
          <div className="right">
            <article>
              <h3>Write, read and connect with great minds on chatter</h3>
              <p>
                Share people your great ideas, and also read write-ups based on
                your interests. connect with people of same interests and goals
              </p>
              {!currentUser && (
                <Link to={"/signup"} className="btn">
                  Get started
                </Link>
              )}
            </article>
          </div>
        </div>
      </div>

      <footer>
        <div className="footer_container">
          <div className="left">
            <h1 className="logo">
              <Link to={"/"}>Chatter</Link>
            </h1>
          </div>

          <div className="right">
            <div className="explore">
              <h2 className="footer_heading">Explore</h2>
              <ul className="footer_links">
                <li>
                  <a href="http://">community</a>
                </li>
                <li>
                  <a href="http://">Trending blogs</a>
                </li>
                <li>
                  <a href="http://">Chatter for teams</a>
                </li>
              </ul>
            </div>

            <div className="support">
              <h2 className="footer_heading">Support</h2>
              <ul className="footer_links">
                <li>
                  <a href="http://">Support docs</a>
                </li>
                <li>
                  <a href="http://">Join slack</a>
                </li>
                <li>
                  <a href="http://">Contact</a>
                </li>
              </ul>
            </div>

            <div className="official_blog">
              <h2 className="footer_heading">Official blog</h2>
              <ul className="footer_links">
                <li>
                  <a href="http://">Official blog</a>
                </li>
                <li>
                  <a href="http://">Engineering blog</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer_bottom">
          <CopyrightIcon />
          <p>{new Date().getFullYear()} Chatter. All rights reserved</p>
        </div>
      </footer>
    </section>
  );
};
