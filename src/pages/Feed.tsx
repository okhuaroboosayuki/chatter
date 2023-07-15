import { Helmet } from "react-helmet-async";
import { SideNav } from "../components/SideNav";
import { TopNav } from "../components/TopNav";
import "../styles/scss/feed.scss";
import {
  AuthContext,
  AuthContextProvider,
} from "../context/AuthenticationContext";
import PenIcon from "../icons/PenIcon";
import { useContext, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { CustomLinkTwo } from "../components/CustomLink";
import { Loader } from "../components/Loader";

export const Feed = () => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/feed/${currentUser?.uid}/new-post`);
  };

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }, []);

  return (
    <>
      <Helmet>
        <title>Feed</title>
        <meta
          name="description"
          content="Explore different content you’d love"
        />
        <link rel="canonical" href={`/feed/${currentUser?.uid}`} />
      </Helmet>
      {loading ? (
        <Loader />
      ) : (
        <AuthContextProvider>
          <section className="feed">
            <SideNav />
            <div className="feed_container">
              <TopNav />

              <div className="feed_posts_container">
                <div className="feed_heading">
                  <div className="feed_title">
                    <h2>FEED</h2>
                    <p>Explore different content you’d love </p>
                  </div>
                  <div className="new_post_btn" onClick={handleClick}>
                    <PenIcon className="new_post_icon" />
                    <p>Post new content</p>
                  </div>
                </div>

                <section className="blogs">
                  <div className="blogs_container">
                    <div className="blogs_heading_links">
                      <h3>
                        <CustomLinkTwo to={`/feed/${currentUser?.uid}`}>
                          For you
                        </CustomLinkTwo>
                      </h3>
                      <h3>
                        <CustomLinkTwo to="/">Featured</CustomLinkTwo>
                      </h3>
                      <h3>
                        <CustomLinkTwo to="/">Recent</CustomLinkTwo>
                      </h3>
                    </div>
                  </div>
                  <Outlet />
                </section>
              </div>
            </div>
          </section>
        </AuthContextProvider>
      )}
    </>
  );
};
