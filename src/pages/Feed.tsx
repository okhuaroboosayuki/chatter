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

export const Feed = () => {
  const { currentUser } = useContext(AuthContext);

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

            <div className="feed_posts_container">
              <div className="feed_heading">
                <div className="feed_title">
                  <h2>FEED</h2>
                  <p>Explore different content you’d love </p>
                </div>
                <div className="new_post_btn">
                  <PenIcon className="new_post_icon" />
                  <p>Post new content</p>
                </div>
              </div>

              <div className="feed_categories">
                {/* <Link to={#ggk}></Link> */}
              </div>
              <div className="feed_posts"></div>
            </div>
          </div>
        </section>
      </AuthContextProvider>
    </>
  );
};
