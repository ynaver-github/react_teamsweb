import React from "react";
import { useEffect, useState, useCallback, useRef } from "react";
import { dbService, storageService } from "fbase";
import { v4 as uuidv4 } from "uuid";
import {Link, NavLink, useNavigate} from "react-router-dom";
// https://fontawesome.com/icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUser,
    faUsersRectangle,
    faPlus,
    faArrowUp,
    faArrowsUpToLine,
    faTimes,
    faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import styled, { css } from 'styled-components';
import './NotFound.css';
import NTweetSearched from "components/NTweetSearched";
import NTweetSearch from "components/NTweetSearch";

const NotFound = () => {

    return(
        <div className="notfound-container">
            <div className="notfound-message" >
                <h1>404 not found</h1>
                {/* <a href='https://heytech.tistory.com/436'>https://heytech.tistory.com/436</a> */}
            </div>
        </div>
    )
};
export default NotFound;