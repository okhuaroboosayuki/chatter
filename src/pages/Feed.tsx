import { SideNav } from "../components/SideNav";
import { TopNav } from "../components/TopNav";
import "../styles/scss/feed.scss";

export const Feed = () => {
  return (
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

          <div className="feed_categories">{/* <Link to={#ggk}></Link> */}</div>
          <div className="feed_posts"></div>
        </div>
      </div>
    </section>
  );
};
