import React from "react";
import { useState, useCallback, useEffect } from "react";
import {Link, NavLink, useNavigate} from "react-router-dom";
// https://fontawesome.com/icons
import {
  faHouse,
  faMagnifyingGlass,
  faUser,
  faUsersRectangle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Container, Image, Menu } from "semantic-ui-react";
import "./NaviBar.css";

const NaviBar = ({ userObj }) => {
  const [home, setHome] = useState("");

  // postMessage (RN -> Web)
  useEffect(() => {
        // RN App and Web Data Communication 
    // in chromium webview (android)
    document.addEventListener("message", (e) => {
      // alert(e.data);
      let parsedData = JSON.parse(e.data);
      // alert(parsedData.home);
      setHome(parsedData.home);
      if (parsedData.alert === true) {
        alert(e.data);
      }
    });
    // in safari webview (iOS)
    //   window.addEventListener("message", (e) => {
    //     alert(e.data);
    //   })
  }, []);

  // postMessage (Web -> RN)
  useEffect(() => {
    sendToRN();
  }, [userObj]);

  // for App and Web Data Communication 
  const sendToRN = () => {
    if (window.ReactNativeWebView) {
      // RN App and Web Communication To Send Web data to RN App
      // JSON.stringify 
      // const obj = {
      //     data: "hello"
      //   };
      // const obj = {
      // name: "홍길동",
      // age: 25,
      // married: false,
      // family: {
      //     father: "아버지",
      //     mother: "어머니,
      // },
      // hobbies: ["게임", "수영장"],
      // jobs: null,
      // };
      const obj = {
        name: userObj.displayName,
        email: userObj.email,
        uid: userObj.uid,
      };
      const jsonData = JSON.stringify(obj);
      // const jsonData = JSON.stringify( {
      //     data: "webmessage",
      //     name: userObj.displayName} );
      window.ReactNativeWebView.postMessage(jsonData);
    } else {
      console.log("sendToRN: ");
    }
  };

  const onHomeClick = () => {
    // editInputFocus.current.focus();
    console.log("onHomeClick: " + home);
    sendToRN();
  };

  const onUserClick = () => {
    console.log("onUserClick: ");
  };

  return (
    <nav>
      <div className="nav-content-area">
        <div className="nav-content-start" onClick={onHomeClick}>
          <ul className="navulcontent">
            <li className='nav-home-container'>
              {home === "Home" && (
                <Link to="/" className="nav-icon-container">
                  <FontAwesomeIcon icon={faHouse} />
                </Link>
              )}
              {home === "ASCamera" && (
                <Link to="/afacamera" className="nav-icon-container">
                  <FontAwesomeIcon icon={faHouse} />
                </Link>
              )}
              {home === "Tools" && (
                <Link to="/tools" className="nav-icon-container">
                  <FontAwesomeIcon icon={faHouse} />
                </Link>
              )}
              {home === "Setting" && (
                <Link to="/setting" className="nav-icon-container">
                  <FontAwesomeIcon icon={faHouse} />
                </Link>
              )}
              {home === "" && (
                <Link to="/" className="nav-icon-container">
                  <FontAwesomeIcon icon={faHouse} />
                </Link>
              )}
              <span className="nav-home-icon-text">
                {home}
              </span>
            </li>
          </ul>
        </div>
        <div className="nav-content-end">
          <ul className="navulcontent">
            <li className="nav-search-container">
              <Link to="/search" className="nav-icon-container">
                {/* <FontAwesomeIcon icon={faMagnifyingGlass} color={"#04AAFF"} size="2x" /> */}
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </Link>
            </li>
            <li className="nav-home-container">
              <Link to="/" className="nav-icon-container">
                {/* <FontAwesomeIcon icon={faUsersRectangle} color={"#04AAFF"} size="2x" /> */}
                <FontAwesomeIcon icon={faUsersRectangle} />
              </Link>
            </li>
            <li className="nav-profile-container" onClick={onUserClick}>
              <Link to="/profile" className="nav-profile-icon-container">
                {userObj.photoURL === "" || userObj.photoURL === null ? (
                    <div>
                    <FontAwesomeIcon icon={faUser} color={"#04AAFF"} size="2x" />
                  </div>
                ) : (
                  <div>
                    <img className="nav-profile-icon-container-img" 
                        src={userObj.photoURL}
                        style={{
                            backgroundImage: userObj.photoURL,
                        }}
                    />
                  </div>
                )}
                <span className="nav-profile-icon-text">
                  {userObj.displayName ? `${userObj.displayName}` : "Profile"}
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
export default NaviBar;