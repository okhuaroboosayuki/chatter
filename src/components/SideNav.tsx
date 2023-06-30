import { Link, useNavigate } from "react-router-dom";
import "../styles/scss/side-nav.scss";
import { CustomLink } from "./CustomLink";
import FeedIcon from "../icons/FeedIcon";
import BookmarkIcon from "../icons/BookmarkIcon";
import TeamIcon from "../icons/TeamIcon";
import DraftIcon from "../icons/DraftIcon";
import TrendingIcon from "../icons/TrendingIcon";
import PersonIcon from "../icons/PersonIcon";
import NotificationIcon from "../icons/NotificationIcon";
import { AuthContext } from "../context/AuthenticationContext";
import { useContext } from "react";

export const SideNav = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const loggedinUser = currentUser?.uid;
  
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/signup/login");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <nav className="side_nav">
      <h1 className="logo">
        <Link to={`/feed/${loggedinUser}`} className="logo_link">
          Chatter
        </Link>
      </h1>
      <ul className="side_nav_list">
        <li className="overview">
          <h4 className="overview_heading">Overview</h4>
          <div className="overview_links">
            <CustomLink to={`/feed/${loggedinUser}`}>
              <FeedIcon className="icon" />
              <span>Feed</span>
            </CustomLink>
            <CustomLink to={"/bookmarks"}>
              <BookmarkIcon className="icon" />
              <span>Bookmarks</span>
            </CustomLink>
            <CustomLink to={"/team-blogs"}>
              <TeamIcon className="icon" />
              <span>Team Blogs</span>
            </CustomLink>
            <CustomLink to={"/drafts"}>
              <DraftIcon className="icon" />
              <span>Drafts</span>
            </CustomLink>
            <CustomLink to={"/analytics"}>
              <BookmarkIcon className="icon" />
              <span>Analytics</span>
            </CustomLink>
          </div>
        </li>

        <li className="trending_tags">
          <h4 className="trending_tags_heading">
            Trending Tags
            <span className="trending_icon">
              <TrendingIcon className="icon" />
            </span>
          </h4>
          <div className="trending_tags_links">
            <CustomLink to={"programming"}>Programming</CustomLink>
            <CustomLink to={"data-science"}>Data science</CustomLink>
            <CustomLink to={"technology"}>Technology</CustomLink>
            <CustomLink to={"machine-learning"}>Machine learning</CustomLink>
            <CustomLink to={"politics"}>Politics</CustomLink>
            <Link to={"trending-tags"} className="see_all_link">
              See all
            </Link>
          </div>
        </li>

        <li className="personal">
          <h4 className="personal_heading">Personal</h4>
          <div className="profile_links">
            <CustomLink to={"profile"}>
              <PersonIcon className="icon" />
              <span>Account</span>
            </CustomLink>
            <CustomLink to={"notifications"}>
              <NotificationIcon className="icon" />
              <span>Notifications</span>
            </CustomLink>
          </div>
        </li>
        <li className="log_out">
          <button onClick={handleLogout} className="log_out_btn">
            Log out
          </button>
        </li>
      </ul>
    </nav>
  );
};
