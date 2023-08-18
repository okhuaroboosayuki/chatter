import { Helmet } from "react-helmet-async";
import { SideNav } from "../components/SideNav";
import { TopNav } from "../components/TopNav";
import "../styles/scss/feed.scss";
import {
  AuthContext,
  AuthContextProvider,
} from "../context/AuthenticationContext";
import PenIcon from "../icons/PenIcon";
import { useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { CustomLinkTwo } from "../components/CustomLink";

export const Feed = () => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/feed/${currentUser?.uid}/new-post`);
  };

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

      <AuthContextProvider>
        <section className="feed">
          <SideNav />
          <div className="feed_container">
            <TopNav />

            <div className="feed_posts_container_wrapper">
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
                        <CustomLinkTwo to={"/feed/featured"}>
                          Featured
                        </CustomLinkTwo>
                      </h3>
                      <h3>
                        <CustomLinkTwo to={"/feed/recent"}>
                          Recent
                        </CustomLinkTwo>
                      </h3>
                    </div>
                  </div>
                  <Outlet />
                </section>
              </div>
            </div>
          </div>
        </section>
      </AuthContextProvider>
    </>
  );
};
