import "../styles/scss/top-nav.scss";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SearchIcon from "../icons/SearchIcon";
import { AuthContext } from "../context/AuthenticationContext";
import { useContext } from "react";

export const TopNav = () => {
  const { currentUser } = useContext(AuthContext);

  const userImage = currentUser?.photoURL;

  return (
    <nav className="top_nav">
      <div className="search_wrapper">
        <div className="search_input">
          <SearchIcon className="search_icon" />
          <input
            type="search"
            name="search"
            id="search"
            className="search"
            placeholder="search chatter"
          />
        </div>
      </div>
      <div className="top_nav_right">
        <div className="notifications">
          <NotificationsOutlinedIcon className="notifications_icon" />
          <span className="notifications_count">15</span>
        </div>
        <div className="profile_pic">
         <img src={userImage ? userImage : require("../images/no-profile-pic.webp")} alt="user" />
        </div>
      </div>
    </nav>
  );
};