import React from "react";
// import {HashRouter as Router, Route, Switch} from "react-router-dom";
import NaviBar from "components/NaviBar";
import Auth from "pages/Auth";
import Edit from "pages/Edit";
import Home from "pages/Home";
import NotFound from "pages/NotFound";
import Profile from "pages/Profile";
import Search from "pages/Search";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import "./AppRouter.css";

import ASForm from "module_afacamera/components/asform";
import MainActivity from "module_afacamera/components/main-activity";
import About from "pages/About";
import AfaCameraPage from "pages/AfaCameraPage";
import News from "pages/News";
import Tools from "pages/Tools";

import PuzzlePage from "pages/PuzzlePage";
import Setting from "pages/Setting";
import ToolsAlarmClock from "pages/ToolsAlarmClock";
import ToolsCalculatorPage from "pages/ToolsCalculatorPage";
import ToolsScissorsGamePage from "pages/ToolsScissorsGamePage";
import WebCameraPage from "pages/WebCameraPage";

const LoggedInDiv = styled.div`
  max-width: 890px;
  width: 100%;
  margin: 0px auto;
  margin-top: 80px;
  display: flex;
  justify-content: "center";
`;

const AppRouter = ({ refreshUser, isLoggedIn, userObj }) => {
  return (
    <Router>
      {isLoggedIn && <NaviBar userObj={userObj} />}
      <section className="section-content">
        {isLoggedIn ? (
          <Routes>
            <Route 
                path ="/"
                className="home"
                element={<Home userObj={userObj}/>}>
            </Route>
            <Route 
                path ="/search"
                className="search"
                element={<Search userObj={userObj}/>}>
            </Route>
            <Route 
                path ="/profile"
                className="profile"
                element={<Profile userObj={userObj} refreshUser={refreshUser}/>}>
            </Route>
            <Route 
                path ="/edit"
                className="edit"
                element={<Edit userObj={userObj} refreshUser={refreshUser}/>}>
            </Route>
            <Route path="/" element={<Home />} />

            <Route path="/about" element={<About />} />
            <Route path="/news" element={<News />} />
            <Route path="/tools" element={<Tools userObj={userObj}/>} />
            <Route path="/afacamera" element={<AfaCameraPage />} />
            {/* <Route path="/afacamera/main-activity" element={<AfaCameraPage />} /> */}
            <Route path="/main-activity" element={<MainActivity />} />
            <Route path="/asform" element={<ASForm />} />
            <Route path="/webcamera" element={<WebCameraPage />} />

            <Route path="/tools/calculator" element={<ToolsCalculatorPage />} />
            <Route path="/tools/alarmclock" element={<ToolsAlarmClock />} />
            <Route path="/tools/scissors" element={<ToolsScissorsGamePage />} />
            <Route path="/tools/puzzle" element={<PuzzlePage />} />
            <Route path="/tetris-page" element={<Home />} />
            <Route path="/minesweeper-page" element={<Home />} />
            <Route path="/groceries" element={<Home />} />
            <Route path="/beverages" element={<Home />} />
            {/* <Route 
                path ="*"
                className="home"
                element={<Home userObj={userObj}/>}>
            </Route> */}
            <Route path="/setting" element={<Setting userObj={userObj}/>} />
            <Route path="*" element={<NotFound />} />
          </Routes> 
          ) : ( 
          <Routes>
            <Route path="/" element={<Auth />}></Route>
            <Route path="/tools" element={<Auth />} />
            <Route path="/setting" element={<Auth />} />
            <Route path="*" element={<Auth />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        )}
      </section>
    </Router>
  );
};

export default AppRouter;