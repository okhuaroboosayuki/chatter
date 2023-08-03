import { Link, useNavigate } from "react-router-dom";
import { CustomLink } from "./CustomLink";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthenticationContext";
import "../styles/scss/header.scss";

export const Header = () => {
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

  //handles responsive menu
  const [burgerBarClass, setBurgerBarClass] = useState("burger_bar unclicked");
  const [menuToggle, setMenuToggle] = useState(false);

  const showMenu = () => {
    if (!menuToggle) {
      setBurgerBarClass("burger_bar clicked");
      setMenuToggle(true);
    } else {
      setBurgerBarClass("burger_bar unclicked");
      setMenuToggle(false);
    }
    setMenuToggle(!menuToggle);
  };

  //check if window width is greater than 1022px
  useEffect(() => {
    const checkWindowWidth = () => {
      if (window.innerWidth > 1022) {
        setMenuToggle(false);
        setBurgerBarClass("burger_bar unclicked");
      }
    };
    window.addEventListener("resize", checkWindowWidth);
    return () => {
      window.removeEventListener("resize", checkWindowWidth);
    };
  }, []);

  return (
    <header>
      <h1 className="logo">
        <Link to={"/"}>Chatter</Link>
      </h1>

      <nav className="large_screen_nav">
        <ul>
          <li>
            <CustomLink to={"/"}>Home</CustomLink>
          </li>
          <li>
            <a href="#about">About us</a>
          </li>
          <li>
            <CustomLink to={"/contact-us"}>Contact</CustomLink>
          </li>
          <li>
            <CustomLink to={"/blogs"}>Blogs</CustomLink>
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

      <div className="responsive_menu_icon" onClick={showMenu}>
        <div className={burgerBarClass}></div>
        <div className={burgerBarClass}></div>
        <div className={burgerBarClass}></div>
      </div>

      {menuToggle && (
        <nav className="mobile_menu">
          <ul>
            <li>
              <CustomLink to={"/"}>Home</CustomLink>
            </li>
            <li>
              <a href={window.location.pathname === "/" ? "#about" : "/#about"}>
                About us
              </a>
            </li>
            <li>
              <CustomLink to={"/contact-us"}>Contact</CustomLink>
            </li>
            <li>
              <CustomLink to={"/blogs"}>Blogs</CustomLink>
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
      )}
    </header>
  );
};
