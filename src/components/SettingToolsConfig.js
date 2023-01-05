import React from "react";
import { useState, useEffect, useRef } from "react";
import { dbService, storageService } from "fbase";

// https://fontawesome.com/icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
// import { faThumbsUp, faThumbsDown } from "@fortawesome/free-light-svg-icons";
import { 
  faThumbsUp, faThumbsDown, faCommentDots,
  faCircle, faCircleCheck,
} from "@fortawesome/free-regular-svg-icons";

import styled, { css } from 'styled-components';
import './SettingToolsConfig.css';

const ToolsConfig = ( {userObj, curConfigObj, updateToolsConfig} ) => {
    // console.log("EachComment key: " + key);
    console.log('ToolsConfig userObj: ');
    // console.log(userObj);
    console.log('ToolsConfig curConfigObj: ');
    console.log(curConfigObj);

    const [userEmail, setUserEmail] = useState(userObj.email);
    const [name, setName] = useState(curConfigObj.name);

    const [curId, setCurId] = useState(curConfigObj.id);
    const [newSupport, setNewSupport] = useState(curConfigObj.support);
  
    useEffect(() => {
        console.log('[Once] : ');
    }, []);

    useEffect(() => {
        console.log('[curConfigObj] : ');
        if ( newSupport !== curConfigObj.support) {
            setNewSupport(curConfigObj.support);
        }
    }, [curConfigObj]);

    const onDeleteClick = async () => {
        // console.log('onDeleteClick createdAt : ' + curCommentObj.createdAt);
        const ok = window.confirm("Are you sure you want to delete this nweet?");
        console.log('onDeleteClick ok : ' + ok);
        if(ok){
            //delete
            // onCommentDelete(curCommentObj.createdAt);
        }
    };

      // To prevent Sequential Clicks
  let isToolsClick = false;
  const onToolsSupportClick = async (event) => {
     
    if(isToolsClick) return;
    isToolsClick = true;

    let updateSupport = false;
    if(newSupport) {
        updateSupport = false;
    } else {
        updateSupport = true;
    }
    setNewSupport(updateSupport);
    console.log('onToolsSupportClick updateSupport : ' + updateSupport);
    updateToolsConfig(curId, updateSupport);

    isToolsClick = false;
  };

    return (
        <div>
            <div className="toolsconfig-items-container">
            <span
                className="toolsconfig-items-box animate__animated animate__zoomIn animate__slow"
                onClick={onToolsSupportClick}
            >{name}</span>
            <div className="toolsconfig-items-check animate__animated animate__zoomIn animate__slow" onClick={onToolsSupportClick}>
                <span>
                { newSupport ? (
                    <FontAwesomeIcon icon={faCircleCheck} />
                    ) : (
                    <FontAwesomeIcon icon={faCircle} />
                    )
                }
                </span>
            </div>
            </div>
        </div> 
    );
};
export default ToolsConfig;