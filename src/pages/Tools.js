import { dbService } from "fbase";
import React, { useEffect, useState } from "react";

import { NavLink } from "react-router-dom";

// https://fontawesome.com/icons
// import { faThumbsUp, faThumbsDown } from "@fortawesome/free-light-svg-icons";

import styled from "styled-components";

import "animate.css/animate.min.css";
import groceries from "assets/img/groceries.png";
import beverages from "../assets/img/beverages.png";
import exercise from "../assets/img/exercise-run.png";

import "./Tools.css";

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

const Tools = ({ userObj }) => {
  const [userEmail, setUserEmail] = useState(userObj.email);
  const [defaultUserToolsConfig, setDefaultUserToolsConfig] = useState([
    { id: 1, name: "Calculator", support: true },
    { id: 2, name: "Alarm Clock", support: false },
    { id: 3, name: "Rock Games", support: false },
  ]);

  const [newUserToolsConfig, setNewUserToolsConfig] = useState([]);
  console.log("newUserToolsConfig: " + newUserToolsConfig);
  console.log(newUserToolsConfig);

  const [supportList, setSupportList] = useState([true, true, true]);

  const [toast, setToast] = useState(false);

  // users information
  const setDefaultToolsConfig = async (event) => {
    console.log("setDefaultToolsConfig: " + defaultUserToolsConfig);

    let settingDocNameStart = "setting_";
    const SettingDocName = settingDocNameStart.concat(userEmail);
    console.log("setDefaultToolsConfig: docName: " + SettingDocName);

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

  useEffect(() => {
    console.log("[newUserToolsConfig] : newUserToolsConfig");
    console.log(newUserToolsConfig);
    const newSupportList = newUserToolsConfig.map((element) => {
      return element.support;
    });

    console.log("[newUserToolsConfig] : newSupportList");
    console.log(newSupportList);
    setSupportList(newSupportList);
  }, [newUserToolsConfig]);

  return (
    <div className="tools-container">
      <div className="cards animate__animated animate__zoomIn animate__slow">
        {supportList[0] && (
          <div>
            <NavLink to="calculator" className="tools-list">
              Calculator
            </NavLink>
            <NavLink to="calculator" className="card">
              <img
                src={groceries}
                alt="Groceries"
                className="card-img animate__animated  animate__swing  animate__slower"
              />
              <div className="card-info">
                <h2>Calculator</h2>
                <p>Buy groceries from the nearest store</p>
              </div>
            </NavLink>
          </div>
        )}
        {supportList[1] && (
          <div>
            <NavLink to="alarmclock" className="tools-list">
              Alarm Clock
            </NavLink>
            <NavLink to="alarmclock" className="card">
              <img
                src={beverages}
                alt="Beverages"
                className="card-img animate__animated  animate__swing  animate__slower"
              />
              <div className="card-info">
                <h2>Alarm &amp; Clock</h2>
                <p> Order your favorite beverages from our store</p>
              </div>
            </NavLink>
          </div>
        )}
        {supportList[2] && (
          <div>
            <NavLink to="scissors" className="tools-list">
              Scissors Game
            </NavLink>
            <NavLink to="scissors" className="card">
              <img
                src={exercise}
                alt="Exercise"
                className="card-img animate__animated  animate__shakeX  animate__slow"
              />
              <div className="card-info">
                <h2>Scissors Game</h2>
                <p>Join a morning or evening road run and jogs</p>
              </div>
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tools;
