import React from "react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { storageService, dbService } from "fbase";
import { authService } from "fbase";
import {Link, NavLink, useNavigate} from "react-router-dom";
// https://fontawesome.com/icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

import styled, { css } from 'styled-components';
import './Profile.css';

import Toast from "components/Toast";

const Profile = ({ refreshUser, userObj }) => {
    console.log(userObj);
    const navigate = useNavigate();
    const [userEmail, setUserEmail] = useState(userObj.email);
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
    const [newPhotoURL, setNewPhotoURL] = useState(userObj.photoURL);
    const [isNewPhotoURL, setIsNewPhotoURL] = useState(false);
    console.log(userEmail);
    console.log(newDisplayName);

    const [toast, setToast] = useState(false);

    // const [attachment, setAttachment] = useState("");
    const onLogOutClick = () => {
      setIsNewPhotoURL(false);
      authService.signOut();
      // navigate.push("/");
      navigate("/");
    };
    
    const onCancelClick = () => {
      setIsNewPhotoURL(false);
      navigate("/");
    }

    const onUserNameChange = (event) => {
      const {
        target: { value },
      } = event;
      setNewDisplayName(value);
    };

    //postMessage  
    // 웹뷰에서 RN으로 데이터를 보낼때 사용합니다.
    const sendToRN = () => {
      if (window.ReactNativeWebView) {
          // RN에서 데이터는 반드시 문자열로 받을 수 있기 때문에 
          // JSON.stringify를 사용합니다.
          // const obj = {
          //     data: "hello"
          //   };
          // const obj = {
          // name: "홍길동",
          // age: 25,
          // married: false,
          // family: {
          //     father: "홍판서",
          //     mother: "춘섬",
          // },
          // hobbies: ["독서", "도술"],
          // jobs: null,
          // };
          const obj = {
              name: userObj.displayName,
              email: userObj.email,
              uid: userObj.uid,
              };
          const jsonData = JSON.stringify( obj );
          // const jsonData = JSON.stringify( {
          //     data: "webmessage",
          //     name: userObj.displayName} );
          window.ReactNativeWebView.postMessage(jsonData);
      } else {
          console.log('sendToRN: ');
      }
    };


    // To prevent Sequential Clicks
    let isOnProfileSubmitted = false;
    const onProfileSubmit = async (event) => {
        console.log("onProfileSubmit isNewPhotoURL: " + isNewPhotoURL);
        if (isOnProfileSubmitted) {
          return;
        }
        isOnProfileSubmitted = true;
      //postMessage  
        sendToRN();
        setToast(true);
        event.preventDefault();

        let attachmentUrl = null;
        if ((userObj.displayName !== newDisplayName) || (userObj.photoURL !== newPhotoURL)) {
            console.log("isNewPhotoURL: " + isNewPhotoURL);
            if (isNewPhotoURL) {
                if ((newPhotoURL !== null) && (newPhotoURL !== "")) {
                    console.log("newPhotoURL: " + newPhotoURL);
                    const attachmentRef = storageService
                      .ref()
                      .child(`${userObj.uid}/${uuidv4()}`);
                    const response = await attachmentRef.putString(newPhotoURL, "data_url");
                    attachmentUrl = await response.ref.getDownloadURL();
                } else {
                    console.log("Not newPhotoURL: " + newPhotoURL);
                    attachmentUrl = "";
                }
                console.log("attachmentUrl: " + attachmentUrl);
                await userObj.updateProfile({
                  displayName: newDisplayName,
                  photoURL: attachmentUrl,
                });

                // users information
                let settingDocNameStart = "setting_";
                const SettingDocName = settingDocNameStart.concat(userEmail);
                console.log("updateToolsConfig: docName: " + SettingDocName);
                await dbService.doc(`nTweetUsersInfo/${SettingDocName}`).update({
                    displayName: newDisplayName,
                    photoURL: attachmentUrl,
                });
            } else {
                await userObj.updateProfile({
                  displayName: newDisplayName,
                });

                // users information
                let settingDocNameStart = "setting_";
                const SettingDocName = settingDocNameStart.concat(userEmail);
                console.log("updateToolsConfig: docName: " + SettingDocName);
                await dbService.doc(`nTweetUsersInfo/${SettingDocName}`).update({
                    displayName: newDisplayName,
                });
            }
            refreshUser();
        }
        setIsNewPhotoURL(false);
        isOnProfileSubmitted = false;
    };

    const onProfilePhotoChange = (event) => {
        const {
          target: { files },
        } = event;
        const theFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
            const {
                currentTarget: { result },
            } = finishedEvent;
        setNewPhotoURL(result);
        setIsNewPhotoURL(true);
            console.log("result: " + result);
        };
        reader.readAsDataURL(theFile);
      };

    const onClearProfilePhotoAttachment = () => {
      setNewPhotoURL(null);
      setIsNewPhotoURL(true);
    }

    return (
      <>
        <div className="profile-container">
          <span className="profile-btn-form profile-btn-form-email animate__animated animate__zoomIn animate__slow">
            {userEmail}
          </span>
          <form onSubmit={onProfileSubmit} className="profile-form">
            <input
              onChange={onUserNameChange}
              type="text"
              autoFocus
              placeholder="Display name"
              value={newDisplayName}
              className="profileformInput animate__animated animate__zoomIn animate__slow"
            />
            {newPhotoURL === "" || newPhotoURL === null ? (
              <div className="photoURLForm__container">
                <div className="photoURLForm__attachment">
                  <label for="add-attach-file" className="photoInput__label">
                    <span>Add profile photo</span>
                    <FontAwesomeIcon icon={faPlus} />
                  </label>
                  <input
                    id="add-attach-file"
                    type="file"
                    accept="image/*"
                    onChange={onProfilePhotoChange}
                    style={{
                      opacity: 0,
                    }}
                  />
                </div>
              </div>
            ) : (
              <div className="photoURLForm__container">
                <div className="photoURLForm__attachment">
                  <label for="change-attach-file" className="photoInput__label">
                    <span>Change profile photo +</span>
                  <FontAwesomeIcon icon={faPlus} />
                  </label>
                  <input
                    id="change-attach-file"
                    type="file"
                    accept="image/*"
                    onChange={onProfilePhotoChange}
                    style={{
                      opacity: 0,
                    }}
                  />
                  <img
                    src={newPhotoURL}
                    style={{
                      backgroundImage: newPhotoURL,
                    }}
                  />
                  <div
                    className="photoForm-clear "
                    onClick={onClearProfilePhotoAttachment}
                  >
                    <span>Remove</span>
                    <FontAwesomeIcon icon={faTimes} />
                  </div>
                </div>
              </div>
            )}
            <input
              type="submit"
              value="Update Profile"
              className="profile-btn-form profile-btn-form-update animate__animated animate__zoomIn animate__slow"
              style={{
                marginTop: 10,
              }}
            />
          <span
            className="profile-btn-form profile-btn-form-logout profile-btn-form-logout-position animate__animated animate__zoomIn animate__slow"
            onClick={onLogOutClick}
          >
            Log Out
          </span>
          </form>
        </div>
        {toast && (
          <div className="profile-toast_msg">
            <Toast
              setToast={setToast}
              duration={2000}
              text="Profile Update ....."
            />
          </div>
        )}
      </>
    );
};

export default Profile;