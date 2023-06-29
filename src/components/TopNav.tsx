import "../styles/scss/top-nav.scss";
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import SearchIcon from "../icons/SearchIcon";

export const TopNav = () => {
  return (
    <nav className="top_nav">
      <div className="search_wrapper">
        <div className="search_input">
          <SearchIcon className="search_icon" />
          <input type="search" name="search" id="search" className="search" placeholder="search chatter" />
        </div>
      </div>
      <div className="top_nav_right">
        <div className="notifications">
          <NotificationsOutlinedIcon className="notifications_icon" />
          <span className="notifications_count">15</span>
        </div>
        <div className="profile_pic">
          <img
            src={require("../images/profile-picture.png")}
            alt="profile pic"
          />
        </div>
      </div>
    </nav>
  );
};
