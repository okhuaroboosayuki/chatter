import "../styles/scss/top-nav.scss";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SearchIcon from "../icons/SearchIcon";
import { AuthContext } from "../context/AuthenticationContext";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CustomLink } from "./CustomLink";
import FeedIcon from "../icons/FeedIcon";
import BookmarkIcon from "../icons/BookmarkIcon";
import TeamIcon from "../icons/TeamIcon";
import DraftIcon from "../icons/DraftIcon";
import TrendingIcon from "../icons/TrendingIcon";
import { Link } from "react-router-dom";
import NotificationIcon from "../icons/NotificationIcon";
import PersonIcon from "../icons/PersonIcon";
import PostAnalyticsIcon from "../icons/PostAnalyticsIcon";
import { collectionGroup, getDocs, query } from "firebase/firestore";
import { db } from "../lib/Firebase";

export const TopNav = () => {
  const { currentUser, logout, setBodyClicked, searchParams, setSearchParams } = useContext(AuthContext);
  const navigate = useNavigate();

  const loggedinUser = currentUser?.uid;

  const userImage = currentUser?.photoURL;

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/signup/login");
    } catch (error) {
      console.log(error);
    }
  };

  const [burgerBarClass, setBurgerBarClass] = useState("burger_bar unclicked");
  const [menuToggle, setMenuToggle] = useState(false);

  const showMenu = () => {
    if (!menuToggle) {
      setBurgerBarClass("burger_bar clicked");
      setMenuToggle(true);
    } else {
      setBurgerBarClass("burger_bar unclicked");
      setMenuToggle(false);
    }
    setMenuToggle(!menuToggle);
  };

  //check if window width is greater than 1022px
  const checkWindowWidth = () => {
    if (window.innerWidth > 300) {
      setMenuToggle(false);
      setBurgerBarClass("burger_bar unclicked");
    }
  };
  window.addEventListener("resize", checkWindowWidth);

  //useEffect to search for blog posts in firebase
  
  const [searchResults, setSearchResults] = useState(([] as any) || "");

  const handleSearchChange = (e: any) => {
    e.preventDefault();
    setSearchParams(e.target.value);
  };

  useEffect(() => {
    const fetchSearchData = async () => {
      const searchGroup = query(collectionGroup(db, "posts"));
      const querySnapshot = await getDocs(searchGroup);

      const queryResults = querySnapshot.docs.map((doc: any) => ({
        id: doc.id,
        ...doc.data(),
      }));

      if (searchParams === "") {
        setSearchResults([]);
      } else {
        const searchResultsArray = queryResults.filter((result: any) => {
          return result.title
            .toLowerCase()
            .includes(searchParams.toLowerCase());
        });

        if (searchResultsArray.length === 0) {
          setSearchResults("no results found");
        } else {
          setSearchResults(
            searchResultsArray.map((data: any) => {
              return (
                <li className="search_results_item" key={data.id}>
                  <Link
                    to={`/feed/${currentUser?.uid}/post/${data.id}`}
                    className="search_item_link"
                  >
                    {data.title}
                  </Link>
                </li>
              );
            })
          );
        }
      }
    };

    fetchSearchData();
  }, [currentUser?.uid, searchParams, searchResults]);


  return (
    <nav className="top_nav">
      <div className="responsive_menu_icon"  onClick={() => {setBodyClicked(true); showMenu()}}>
        <div className={burgerBarClass}></div>
        <div className={burgerBarClass}></div>
        <div className={burgerBarClass}></div>
      </div>

      {menuToggle && (
        <nav className="top_nav_mobile_menu">
          <ul className="mobile_menu_side_nav_list">
            <li className="mobile_menu_overview">
              <h4 className="mobile_menu_overview_heading">Overview</h4>
              <div className="mobile_menu_overview_links">
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
                  <PostAnalyticsIcon className="icon" />
                  <span>Analytics</span>
                </CustomLink>
              </div>
            </li>

            <li className="mobile_menu_trending_tags">
              <h4 className="mobile_menu_trending_tags_heading">
                Trending Tags
                <span className="mobile_menu_trending_icon">
                  <TrendingIcon className="icon" />
                </span>
              </h4>
              <div className="mobile_menu_trending_tags_links">
                <CustomLink to={"/programming"}>Programming</CustomLink>
                <CustomLink to={"/data-science"}>Data science</CustomLink>
                <CustomLink to={"/technology"}>Technology</CustomLink>
                <CustomLink to={"/machine-learning"}>
                  Machine learning
                </CustomLink>
                <CustomLink to={"/politics"}>Politics</CustomLink>
                <Link to={"trending-tags"} className="see_all_link">
                  See all
                </Link>
              </div>
            </li>

            <li className="mobile_menu_personal">
              <h4 className="mobile_menu_personal_heading">Personal</h4>
              <div className="mobile_menu_rofile_links">
                <CustomLink to={"/profile"}>
                  <PersonIcon className="icon" />
                  <span>Account</span>
                </CustomLink>
                <CustomLink to={"/notifications"}>
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
      )}

      <div className="search_and_profile_container">
        <div className="search_wrapper">
          <div className="search_input">
            <SearchIcon className="search_icon" />
            <input
              type="search"
              name="search"
              id="search"
              className="search"
              value={searchParams}
              placeholder="search chatter"
              onChange={handleSearchChange}
            />

            {searchResults.length > 0 && (
              <div className="search_results">
                <ul className="search_results_list">{searchResults}</ul>
              </div>
            )}
          </div>
        </div>
        <div className="notification_and_profile" onClick={() => setBodyClicked(true)}>
          <div className="notifications">
            <NotificationsOutlinedIcon className="notifications_icon" />
            <span className="notifications_count">15</span>
          </div>
          <div className="profile_pic">
            <img
              src={
                userImage ? userImage : require("../images/no-profile-pic.webp")
              }
              alt={currentUser?.displayName}
            />
          </div>
        </div>
      </div>
    </nav>
  );
};
