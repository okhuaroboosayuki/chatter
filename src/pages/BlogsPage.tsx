import { Helmet } from "react-helmet-async";
import { Header } from "../components/Header";
import { useContext } from "react";
import "../styles/scss/blogs-page.scss";
import "../styles/scss/all-blogs.scss";
import { AuthContext } from "../context/AuthenticationContext";
import { useBlogData } from "../hooks/useBlogData";
import { Link } from "react-router-dom";
import OpenBookIcon from "../icons/OpenBookIcon";
import CommentsIcon from "../icons/CommentsIcon";
import HeartIcon from "../icons/HeartIcon";
import SmallChartIcon from "../icons/SmallChartIcon";

export const BlogsPage = () => {
  const { currentUser } = useContext(AuthContext);
  const { blogContent } = useBlogData();

  return (
    <>
      <Helmet>
        <title>Blogs | See Blog Posts Of Some Of Our Users</title>
        <meta
          name="description"
          content="The page you are looking for does not exist. How you got here is a mystery"
        />
        <link rel="canonical" href="/blogs" />
      </Helmet>

      <section className="blogs_page_wrapper">
        <Header />

        <section className="blogs_page_container">
          <section className="all_blogs">
            {blogContent.map((blog: any) => (
              <article className="single_blog" key={blog.id}>
                <div className="author_details" key={blog.author}>
                  <div className="left">
                    <img
                      src={
                        blog.authorImage
                          ? blog.authorImage
                          : require("../images/no-profile-pic.webp")
                      }
                      alt={blog.author}
                      className="author_image"
                    />
                  </div>

                  <div className="right">
                    <div className="author_name">{blog.author}</div>
                    <div className="author_title">
                      <span className="title">
                        {blog.authorDesignation
                          ? blog.authorDesignation
                          : "Writer"}
                        .
                      </span>
                      <span className="date_publish_at">{blog.createdAt}</span>
                    </div>
                  </div>
                </div>
                <div className="blog_title" key={blog.title}>
                  <h3 className="blog_title_heading">
                    <Link to={`/feed/${currentUser?.uid}/post/${blog.id}`}>
                      {blog.title}
                    </Link>
                  </h3>
                  <p className="blog_post_reading_time">
                    <OpenBookIcon className="open_book_icon" />
                    <span>{blog.timeToRead}</span>
                  </p>
                </div>
                <div className="blog_content" key={blog.description}>
                  <p className="blog_content_text">
                    {blog.description}......
                    <Link
                      to={`/feed/${currentUser?.uid}/post/${blog.id}`}
                      className="read_more"
                    >
                      read more
                    </Link>
                  </p>
                  <div className="blog_content_image">
                    <Link to={`/feed/${currentUser?.uid}/post/${blog.id}`}>
                      <img src={blog.image} alt="post pic" />
                    </Link>
                  </div>

                  <div className="blog_post_analytics">
                    <div className="comments">
                      <CommentsIcon className="comments_icon" />
                      <span className="number_of_comments">
                        {blog.comments > 0 ? blog.comments + "k" : "0"}
                      </span>
                    </div>
                    <div className="likes">
                      <HeartIcon className="likes_icon" />
                      <span className="number_of_likes">
                        {blog.likes?.length > 0 ? blog.likes.length : 0}
                      </span>
                    </div>
                    <div className="views">
                      <SmallChartIcon className="views_icon" />
                      <span className="number_of_views">
                        {blog.views > 0 ? blog.views + "k views" : "0"}
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </section>
        </section>
      </section>
    </>
  );
};
