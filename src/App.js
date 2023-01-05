import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from "react";
import AppRouter from "pages/AppRouter";
import {authService, dbService, storageService } from "fbase";

function App() {
  const [init, setInit] = useState(false);
  //const auth = fbase.auth();
  //const [isLoggedIn, setIsLoggedIn] = useState(false); //userObj를 이용해 isLoggedIn 판별 (render를 하나 줄여줌)
  const [userObj, setUserObj] = useState(null);

  // users information
  const [defaultUserToolsConfig, setDefaultUserToolsConfig] = useState([
    { id: 1, name: "Calculator", support: true },
    { id: 2, name: "Alarm Clock", support: false },
    { id: 3, name: "Rock Games", support: false },
  ]);

  // users information
  const setUserInfoConfig = async (user) => {
    console.log("setUserInfoConfig: " + user);
    console.log(user);

    let settingDocNameStart = "setting_";
    const SettingDocName = settingDocNameStart.concat(user.email);
    console.log("setUserInfoConfig: docName: " + SettingDocName);

    const userInfoConfigObj = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      uid: user.uid,
      email: user.email,
      toolsConfig: defaultUserToolsConfig,
    };
    await dbService
      .collection("nTweetUsersInfo")
      .doc(SettingDocName)
      .set(userInfoConfigObj);
  };

  useEffect(() => { //component가 mount 될 때 실행
    //실제로 로그인이 되었는지 안되었는지 알 수 있음
    authService.onAuthStateChanged((user) => { //로그인, 로그아웃, 어플리케이션이 초기화 될 때 발생
      // console.log("displayName: " + user.displayName);
      //  console.log("email: " + user.email);
      // console.log("photoURL: " + user.photoURL);      
      if(user) {
        //setIsLoggedIn(true); 
        
        /*방법 2
        setUserObj(user); //로그인한 user를 저장*/
        
        //방법1
        setUserObj({
          displayName: user.displayName,
          photoURL: user.photoURL,
          uid: user.uid,
          email: user.email,
          updateProfile: (args) => user.updateProfile(args),
        });

      } else {
        setUserObj(null);
      }
      setInit(true);
    // users information      
      if(user) {
        let settingDocNameStart = "setting_";
        const settingDocName = settingDocNameStart.concat(user.email);
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
              // setNewUserToolsConfig(data.toolsConfig);
            } else {
              setUserInfoConfig(user);
            }
          });
      }
    });
  }, []);

  const refreshUser = () => {
    const user = authService.currentUser;
    //방법1
    setUserObj({
      displayName: user.displayName,
      photoURL: user.photoURL,
      uid: user.uid,
      email: user.email,
      updateProfile: (args) => user.updateProfile(args),
    });

    console.log("displayName: " + userObj.displayName);
    console.log("photoURL: " + userObj.photoURL);
    
    /*방법2
    setUserObj(Object.assign({}, user));*/
  };

  /*firebase가 초기화되고 모든 걸 로드할 때까지 기다려줄 시간이 없음
  console.log(authService.currentUser);
  setInterval(() => {
    console.log(authService.currentUser);
  }, 2000);*/
  
  return (
  <>
  {init ? (
    <AppRouter
    refreshUser={refreshUser} 
    isLoggedIn={Boolean(userObj)} 
    userObj={userObj} 
    />
    ) : (
    <div className='app-init-load-wrapper'>
      <div className='app-init-load'>
      "Loading ....."
      </div>
    </div>
    )
   }
  </>
  );
}

export default App;
