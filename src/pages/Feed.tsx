import { Helmet } from "react-helmet-async";
import { SideNav } from "../components/SideNav";
import { TopNav } from "../components/TopNav";
import "../styles/scss/feed.scss";
// import { AuthContext } from "../context/AuthenticationContext";
// import { useContext } from "react";

export const Feed = () => {
  
  return (
    <>
      <Helmet>
        <title>Feed</title>
        <meta name="description" content="Register to get access to the app" />
        <link rel="canonical" href="/signup" />
      </Helmet>
      <section className="feed">
        <SideNav />
        <div className="feed_container">
          <TopNav />

          <div className="feed_posts_container">
            <div className="feed_heading">
              <div className="feed_tir">
                {/* <h2></h2> */}
                <p></p>
              </div>
              <div className="new_post_btn"></div>
            </div>

            <div className="feed_categories">
              {/* <Link to={#ggk}></Link> */}
            </div>
            <div className="feed_posts"></div>
          </div>
        </div>
      </section>
    </>
  );
};
