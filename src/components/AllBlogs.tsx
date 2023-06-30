import OpenBookIcon from "../icons/OpenBookIcon";
import "../styles/scss/all-blogs.scss";

export const AllBlogs = () => {
  return (
    <section className="all_blogs">
      <article className="single_blog">
        <div className="author_details">
          <div className="left">
            <img
              src={require("../images/profile-pic-2.png")}
              alt="Author"
              className="author_image"
            />
          </div>

          <div className="right">
            <div className="author_name">Grace Ikpang</div>
            <div className="author_title">
              <span className="title">Product designer.</span>
              <span className="date_publish_at">
                {new Date().toLocaleString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>
        </div>
        <div className="blog_title">
          <h3 className="blog_title_heading">Starting out as a Frontend Engineer</h3>
          <p className="blog_post_reading_time">
            <OpenBookIcon className="open_book_icon" />
            <span>10 mins read</span>
          </p>
        </div>
        <div className="blog_content">
          <p className="blog_content_text">
            Embarking on a journey as a Frontend Engineer can be an exhilarating
            and fulfilling experience. As a profession that bridges the realms
            of art, technology, and problem-solving, product design offers an
            opportunity to shape the way people interact with the world around
            them.
          </p>
          <div className="blog_content_image">
            <img src={require("../images/blog-post-pic.png")} alt="post pic" />
          </div>
        </div>
        <div className="blog_post_analytics"></div>
      </article>
    </section>
  );
};
