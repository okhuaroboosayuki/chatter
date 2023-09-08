import { Helmet } from "react-helmet-async";
import {
  AuthContext,
  AuthContextProvider,
} from "../context/AuthenticationContext";
import { SideNav } from "../components/SideNav";
import { TopNav } from "../components/TopNav";
import { useContext, useLayoutEffect, useState } from "react";
import "../styles/scss/single-blog.scss";
import OpenBookIcon from "../icons/OpenBookIcon";
import CommentsIcon from "../icons/CommentsIcon";
import SmallChartIcon from "../icons/SmallChartIcon";
import {
  DocumentData,
  arrayRemove,
  arrayUnion,
  collectionGroup,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { useParams } from "react-router-dom";
import { db } from "../lib/Firebase";
import ReactHtmlParser from "react-html-parser";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";

export const SingleBlog = () => {
  const { currentUser } = useContext(AuthContext);

  const [singleBlog, setSingleBlog] = useState<DocumentData>([]);
  const [postLikes, setPostLikes] = useState([] as any);
  const [postRef, setPostRef] = useState({} as any);
  const [likeBtnStyle, setLikeBtnStyle] = useState({});
  const [liked, setLiked] = useState(false);
  const [numOfLikes, setNumOfLikes] = useState(singleBlog.likes?.length);

  const params = useParams();

  useLayoutEffect(() => {
    const fetchSinglePost = async () => {
      // get a single post from collectionGroup
      const post = collectionGroup(db, "posts");

      await getDocs(post).then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          if (doc.id === params.blogId) {
            setSingleBlog({ id: doc.id, ...doc.data() });
            setPostLikes(
              Array.isArray(doc.data().likes) ? doc.data().likes : []
            );
            setPostRef(doc.ref);
            setNumOfLikes(singleBlog.likes?.length)
          }
        });
      });
    };
    fetchSinglePost();
  }, [params.blogId, singleBlog.likes?.length]);

  const handleLikeEvent = async (e: any) => {
    e.preventDefault();

    if (postLikes.includes(currentUser?.uid)) {
      setLiked(true);
      await updateDoc(postRef, { likes: arrayRemove(currentUser?.uid) });
      setLikeBtnStyle({ color: "none" });
      setLiked(false);
      setNumOfLikes(numOfLikes - 1);
      console.log("unliked");
    } else {
      setLiked(false);
      await updateDoc(postRef, { likes: arrayUnion(currentUser?.uid) });
      setLikeBtnStyle({ color: "red" }); 
      setLiked(true);
      setNumOfLikes(numOfLikes + 1);
      console.log("liked");
    }
  };

  return (
    <>
      <Helmet>
        <title>{singleBlog.title}</title>
        <meta name="description" content={singleBlog.description} />
        <link rel="canonical" href={`/feed/${currentUser?.uid}/post/`} />
      </Helmet>
      <AuthContextProvider>
        <section className="feed_single_blog_post">
          <SideNav />
          <div className="single_blog_post_body">
            <TopNav />

            <section className="single_blog_post_container">
              <div className="single_blog_post_wrapper">
                <div className="single_blog_post">
                  <div className="author_details">
                    <div className="left">
                      <img
                        src={
                          singleBlog.authorImage
                            ? singleBlog.authorImage
                            : require("../images/no-profile-pic.webp")
                        }
                        alt={singleBlog.author}
                        className="author_image"
                      />
                    </div>

                    <div className="right">
                      <div className="author_name">{singleBlog.author}</div>
                      <div className="author_title">
                        <span className="title">
                          {singleBlog.authorDesignation}
                        </span>
                        <span className="date_publish_at">
                          {singleBlog.createdAt}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="blog_post_reading_time">
                    <div className="blog_post_analytics">
                      <div className="comments">
                        <CommentsIcon className="comments_icon" />
                        <span className="number_of_comments">
                          {singleBlog.comments}
                        </span>
                      </div>
                      <div className="likes">
                        <FavoriteOutlinedIcon
                          className="likes_icon"
                          style={likeBtnStyle}
                        />
                        <span className="number_of_likes">
                          {numOfLikes}
                        </span>
                      </div>
                      <div className="views">
                        <SmallChartIcon className="views_icon" />
                        <span className="number_of_views">
                          {singleBlog.views}
                        </span>
                      </div>
                    </div>
                    <p className="reading_time">
                      <OpenBookIcon className="open_book_icon" />
                      <span>{singleBlog.timeToRead}</span>
                    </p>
                  </div>

                  <div className="blog_title">
                    <h3 className="blog_title_heading">{singleBlog.title}</h3>
                  </div>

                  <div className="single_blog_post_content">
                    <article>{ReactHtmlParser(singleBlog.content)}</article>
                  </div>

                  <div className="like_btn">
                    {liked ? (
                      <button onClick={handleLikeEvent}>unlike</button>
                    ) : (
                      <button onClick={handleLikeEvent}>like</button>
                    )}
                  </div>
                </div>
              </div>
            </section>
          </div>
        </section>
      </AuthContextProvider>
    </>
  );
};
