import React from "react";
import "./TopBar.scss";
import { MdNotificationsNone, MdLanguage, MdSettings } from "react-icons/md";

function TopBar() {
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">NQT</span>
        </div>
        <div className="topRight">
          <img
            src="https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
            alt=""
            className="topAvatar"
          />
        </div>
      </div>
    </div>
  );
}

export default TopBar;
