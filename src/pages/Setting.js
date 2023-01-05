import { dbService } from "fbase";
import React, { useEffect, useState } from "react";

// https://fontawesome.com/icons
// import { faThumbsUp, faThumbsDown } from "@fortawesome/free-light-svg-icons";

import styled from "styled-components";

import "animate.css/animate.min.css";

import ToolsConfig from "components/SettingToolsConfig";
import Toast from "components/Toast";

import "./Setting.css";

const HeaderBlock = styled.div`
  font-size: 3rem;
  color: blue;
  ${"" /* position: fixed; */}
  width: 100%;
  background: white;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08);
`;

const Title = styled.div`
  font-size: 3rem;
  outline: none;
  padding-bottom: 0.5rem;
  border: none;
  border-bottom: 2px solid #22b8cf;
  margin-bottom: 2rem;
  width: 100%;
  background: blue;
`;

const Setting = ({ userObj }) => {
  const [userEmail, setUserEmail] = useState(userObj.email);
  const [defaultUserToolsConfig, setDefaultUserToolsConfig] = useState([
    { id: 1, name: "Calculator", support: true },
    { id: 2, name: "Alarm Clock", support: false },
    { id: 3, name: "Rock Games", support: false },
  ]);

  const [newUserToolsConfig, setNewUserToolsConfig] = useState([]);
  console.log("newUserToolsConfig: " + newUserToolsConfig);
  console.log(newUserToolsConfig);

  const [toast, setToast] = useState(false);

  // users information
  const setDefaultToolsConfig = async (event) => {
    console.log("setDefaultToolsConfig: " + defaultUserToolsConfig);

    let settingDocNameStart = "setting_";
    const SettingDocName = settingDocNameStart.concat(userEmail);
    console.log("setDefaultToolsConfig: docName: " + SettingDocName);

    setNewUserToolsConfig(defaultUserToolsConfig);

    const userInfoConfigObj = {
      displayName: userObj.displayName,
      photoURL: userObj.photoURL,
      uid: userObj.uid,
      email: userObj.email,
      toolsConfig: defaultUserToolsConfig,
    };
    await dbService
      .collection("nTweetUsersInfo")
      .doc(SettingDocName)
      .set(userInfoConfigObj);
  };

  useEffect(() => {
    console.log("[Once] : ");
    //getNeweets();
    //위 방식과 이것 중 하나 선택해서 쓰면 됨
    //이 방식은 더 적게 re-render 하기 때문에 더 빠르게 실행되도록 만들어줌
    //무언가를 지우거나 업데이트 하든, 뭘 하든 실행이 됨
    if (!userEmail) {
      return;
    }
    console.log("[Once] userEmail: " + userEmail);
    let settingDocNameStart = "setting_";
    const settingDocName = settingDocNameStart.concat(userEmail);
    console.log("[Once] settingDocName: " + settingDocName);
    dbService
      .collection("nTweetUsersInfo")
      .doc(settingDocName)
      .get()
      .then((doc) => {
        if (doc.exists) {
          console.log("id: " + doc.id);
          console.log("data: doc.data(): " + doc.data());
          console.log(doc.data());
          const data = { ...doc.data() };
          console.log(data);
          setNewUserToolsConfig(data.toolsConfig);
        } else {
          setDefaultToolsConfig();
        }
      });
  }, []);

  // users information
  // To prevent Sequential Clicks
  let isOnEditSubmitted = false;
  const onToolsResetClick = async (event) => {
    if (isOnEditSubmitted) return;
    isOnEditSubmitted = true;
    event.preventDefault();
    setToast(true);
    console.log("onToolsResetClick: " + defaultUserToolsConfig);

    let settingDocNameStart = "setting_";
    const SettingDocName = settingDocNameStart.concat(userEmail);
    console.log("onToolsResetClick: docName: " + SettingDocName);

    setNewUserToolsConfig(defaultUserToolsConfig);
    const toolsConfigObj = {
      toolsConfig: defaultUserToolsConfig,
    };

    const userInfoConfigObj = {
      displayName: userObj.displayName,
      photoURL: userObj.photoURL,
      uid: userObj.uid,
      email: userObj.email,
      toolsConfig: defaultUserToolsConfig,
    };

    await dbService
      .collection("nTweetUsersInfo")
      .doc(SettingDocName)
      .set(userInfoConfigObj);

    isOnEditSubmitted = false;
  };

  // users information
  // To prevent Sequential Clicks
  let isUpdateToolsConfig = false;
  const updateToolsConfig = async (curId, newIsSupport) => {
    setToast(true);
    console.log("updateToolsConfig: curId: " + curId);
    console.log("updateToolsConfig: newIsSupport: " + newIsSupport);

    const findIndex = newUserToolsConfig.findIndex(
      (element) => element.id === curId
    );
    const copyUserToolsConfig = [...newUserToolsConfig];
    console.log(
      "updateToolsConfig copyUserToolsConfig : " + copyUserToolsConfig
    );
    if (findIndex != -1) {
      copyUserToolsConfig[findIndex] = {
        ...copyUserToolsConfig[findIndex],
        support: newIsSupport,
      };
    }
    console.log(
      "updateToolsConfig copyUserToolsConfig: " + copyUserToolsConfig
    );
    console.log(copyUserToolsConfig);
    setNewUserToolsConfig(copyUserToolsConfig);

    let settingDocNameStart = "setting_";
    const SettingDocName = settingDocNameStart.concat(userEmail);
    console.log("updateToolsConfig: docName: " + SettingDocName);
    await dbService.doc(`nTweetUsersInfo/${SettingDocName}`).update({
      toolsConfig: copyUserToolsConfig,
    });

    isOnEditSubmitted = false;
  };

  return (
    <div className="setting-container">
      {toast && (
        <div className="setting-toast-msg">
          <Toast setToast={setToast} duration={2000} text="Update ......" />
        </div>
      )}
      <div className="setting-title animate__animated animate__zoomIn animate__slow">
        {userEmail}
      </div>
      <div className="setting-context animate__animated animate__zoomIn animate__slow">
        <div className="setting-items-display">
          {newUserToolsConfig.map((configElement) => (
            <ToolsConfig
              // key={element.id}
              userObj={userObj}
              curConfigObj={configElement}
              // isSupport={configElement.support === true}
              updateToolsConfig={updateToolsConfig}
              // onCommentLike={onCommentLike}
              // onCommentUnLike={onCommentUnLike}
            />
          ))}
        </div>
        <div className="setting-items-container">
          <div
            className="setting-items-box animate__animated animate__zoomIn animate__slow"
            onClick={onToolsResetClick}
          >
            Reset
          </div>
        </div>
      </div>
    </div>
  );
};

export default Setting;
