import React from "react";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { storageService, dbService } from "fbase";
import {Link, NavLink, useNavigate} from "react-router-dom";
// https://fontawesome.com/icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes, faArrowRight } from "@fortawesome/free-solid-svg-icons";

import styled, { css } from 'styled-components';
import './EditForm.css';

import Toast from "components/Toast";

import 'semantic-ui-css/semantic.min.css';
import { Button } from 'semantic-ui-react';
const EditForm = ({ userObj }) => {
    console.log(userObj);
    const navigate = useNavigate();
    const [nTitle, setNTitle] = useState("");
    const [nContext, setNContext] = useState("");
    const [nAttachment, setNAttachment] = useState("");
    const [nLikeCount, setNLikeCount] = useState(0);
    const [nDisLikeCount, setNDisLikeCount] = useState(0);
    const [nCommentList, setNCommentList] = useState([]);
    console.log("nTitle: " + nTitle);
    console.log("nContext: " + nContext);

    const [toast, setToast] = useState(false);

    
    useEffect(() => {
      console.log('[Once] Mount ');

      return () => {
        console.log('[Once] UnMount');

      };
    }, []);

    useEffect(() => {
      console.log('[Every] Mount ');
      return () => {
          console.log('[Every] UnMount');
      };
    },);

    // To prevent Sequential Clicks
    let isOnEditSubmitted = false;
    const onEditSubmit = async (event) => {
      if(isOnEditSubmitted) return;
      isOnEditSubmitted = true;
      event.preventDefault();
      console.log('onEditSubmit: ' + nContext);
      if (nContext === "") {
          return;
      }
      setToast(true);
      const nContextArray = nContext.split(' ');
      console.log('onEditSubmit: ' + nContextArray);
      const nContextArrayLowCase = nContextArray.map((str) => str.toLowerCase());
      console.log('onEditSubmit: ' + nContextArrayLowCase);
      event.preventDefault();
      let attachmentUrl = "";
      if (nAttachment !== "") {
        const attachmentRef = storageService
          .ref()
          .child(`${userObj.uid}/${uuidv4()}`);
        const response = await attachmentRef.putString(nAttachment, "data_url");
        attachmentUrl = await response.ref.getDownloadURL();
      }
      const nContextObj = {
        uid: userObj.uid,
        email: userObj.email,
        name: userObj.displayName,
        title: nTitle,
        text: nContext,
        // textArray: nContextArray,
        textArray: nContextArrayLowCase,
        createdAt: Date.now(),
        creatorId: userObj.uid,
        attachmentUrl: attachmentUrl,
        totalLikes: nLikeCount,
        likesArray: [],
        isLikes: false,
        dislikesArray: [],
        isdisLikes: false,
        disLikeCount: nDisLikeCount,
        commentList : nCommentList,
      };
      await dbService.collection("nTweetCollections").add(nContextObj);
      setNContext("");
      setNAttachment("");
      navigate('/');
      isOnEditSubmitted = false;
    };

    const onTitleChange = (event) => {
      const {
        target: { value },
      } = event;
      setNTitle(value);
    };

    const onContextChange = (event) => {
      const {
        target: { value },
      } = event;
      console.log(event.target.value);
      setNContext(value);
    };

    const onCancelClick = () => {
        navigate("/");
    }

    const onFileChange = (event) => {
      const {
        target: { files },
      } = event;
      const theFile = files[0];
      const reader = new FileReader();
      reader.onloadend = (finishedEvent) => {
        const {
          currentTarget: { result },
        } = finishedEvent;
        setNAttachment(result);
      };
      reader.readAsDataURL(theFile);
    };

    const onClearAttachment = () => setNAttachment("");

    // 파일 첨부 버튼
    const onImageChange = (event) => {
      const {
        target: { files },
      } = event;
      const uploadFile = files[0];
      const uploadFileName = uploadFile?.name;
      const fileReader = new FileReader();

      // if (fileReader && uploadFile !== undefined && uploadFile !== null) {
      //   fileReader.onload = (event) => {
      //     const {
      //       target: { result },
      //     } = event;

      //     setFileDataUrl(result);
      //   };

        // fileReader.readAsDataURL(uploadFile);
        // setFileName(`${uploadFileName}_${Date.now()}`);
      // }
    };

    return (
        <>
        <div>
            {toast &&
              <div  className="editform-toast-msg">
                <Toast setToast={setToast}  duration={2000} text="Uploading......." />
              </div>
            }
            <form onSubmit={onEditSubmit} className="editForm">
                <div className="edit-input-container">
                    <input
                        className="edit-inpput-title"
                        value={nTitle}
                        onChange={onTitleChange}
                        type="text"
                        placeholder="Title"
                        maxLength={60}
                        autoFocus
                    />
        <div className="edit-inpput-title-icon" onClick={onEditSubmit}>
            <span>
            <FontAwesomeIcon icon={faArrowRight} />
            </span>
        </div>  
                    <textarea
                        className="edit-input-context"
                        rows='10'
                        cols='80'
                        value={nContext}
                        onChange={onContextChange}
                        placeholder="What's on your mind?"
                    />
                </div>
                {nAttachment === "" || nAttachment === null ? (
                    <div className="edit-photoForm__container">
                      <label for="add-attach-file" className="editInput__label">
                          <span>Add Photo</span>
                          <FontAwesomeIcon icon={faPlus} />
                      </label>
                      <input
                        id="add-attach-file"
                        type="file"
                        accept="image/*"
                        onChange={onFileChange}
                        style={{
                          opacity: 0,
                        }}
                      />
                    </div>
                ) : (
                    <div className="edit-photoForm__container">
                        <label for="change-attach-file" className="editInput__label">
                              <span>Change Photo</span>
                              <FontAwesomeIcon icon={faPlus} />
                        </label>
                        <input
                            id="change-attach-file"
                            type="file"
                            accept="image/*"
                            onChange={onFileChange}
                            style={{
                            opacity: 0,
                            }}
                        />
                        <div className="editForm__attachment">
                            <img
                              src={nAttachment}
                              style={{
                                backgroundImage: nAttachment,
                              }}/>
                            <div className="editForm__clear" onClick={onClearAttachment}>
                              <span>Remove</span>
                              <FontAwesomeIcon icon={faTimes} />
                            </div>
                        </div>
                    </div>
                )}
            </form>
        </div>
        </>
    );
};

export default EditForm;