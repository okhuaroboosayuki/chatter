import { useNavigate } from "react-router-dom";
import SpaceMan from "../components/SpaceMan";
import "../styles/scss/error-page.scss";
import { AuthContext } from "../context/AuthenticationContext";
import { useContext } from "react";
import { Helmet } from "react-helmet-async";

export const ErrorPage = () => {
  const navigate = useNavigate();

  const { currentUser } = useContext(AuthContext);

  const handleNavigate = () => {
    if (currentUser) {
      navigate(`/feed/${currentUser.uid}`);
    } else {
      navigate("/");
    }
  };

  return (
    <>
      <Helmet>
        <title>404</title>
        <meta
          name="description"
          content="The page you are looking for does not exist. How you got here is a mystery"
        />
        <link rel="canonical" href="*" />
      </Helmet>
      <div className="error_page_container">
        <div className="row">
          <div className="space_man_container">
            <SpaceMan className="space_man_icon" />
          </div>
          <div className="error_content">
            <h1>404</h1>
            <h2>UH OH! You're lost.</h2>
            <p>
              The page you are looking for does not exist. How you got here is a
              mystery. But you can click the button below to go back to the
              homepage.
            </p>
            <button className="btn" onClick={handleNavigate}>
              {currentUser ? "Go back" : "home"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
