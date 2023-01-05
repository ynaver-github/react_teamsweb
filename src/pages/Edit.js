import { dbService, storageService } from "fbase";
import React, { useEffect, useState, useCallback } from "react";
import NTweet from "components/NTweet";
import { v4 as uuidv4 } from "uuid";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUser,
    faUsersRectangle,
    faPlus,
    faArrowUp,
} from "@fortawesome/free-solid-svg-icons";

import styled, { css } from 'styled-components';
import './Edit.css';

import NTweetFactory from "components/NTweetFactory";
import EditForm from "components/EditForm";

const Edit = ({ userObj }) => {
    console.log(userObj);

    const [scrollTopBtnIsVisible, setScrollTopBtnIsVisible] = useState(false);

    const scrollToTop = useCallback(() => {
        console.log('scrollToTop');
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    useEffect(() => {
        const showTopBtnOnBottom = () => {
            if (window.pageYOffset > 100) {
            setScrollTopBtnIsVisible(true);
            } else {
            setScrollTopBtnIsVisible(false);
            }
        };
        window.addEventListener("scroll", showTopBtnOnBottom);
        return () => {
            window.removeEventListener("scroll", showTopBtnOnBottom);
        };
    }, []); 

    return(
        <div className="edit-container">
            <EditForm userObj={userObj} />
        </div>
    )
};

export default Edit;