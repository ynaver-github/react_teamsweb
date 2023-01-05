import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { storageService, dbService } from "fbase";
import {Link, NavLink, useNavigate} from "react-router-dom";
// https://fontawesome.com/icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

import styled, { css } from 'styled-components';
import './NTweetFactory.css';

const NTweetFactory = ({ userObj }) => {
  console.log(userObj);
  const navigate = useNavigate();
  const [nTitle, setNTitle] = useState("");
  const [nContext, setNContext] = useState("");
  const [nAttachment, setNAttachment] = useState("");

  const onSubmit = async (event) => {
    console.log('onSubmit: ' + nContext);
    if (nContext === "") {
        return;
    }
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
      name: userObj.displayName,
      title: nTitle,
      text: nContext,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl,
    };
    await dbService.collection("nTweetCollections").add(nContextObj);
    setNContext("");
    setNAttachment("");
  };

  const onContextChange = (event) => {
    const {
      target: { value },
    } = event;
    console.log(event.target.value);
    setNContext(value);
  };

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
    <form onSubmit={onSubmit} className="factoryForm">
      <div className="factoryInput__container">
        <input
          className="factoryInput__input"
          value={nContext}
          onChange={onContextChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input type="submit" value="&rarr;" className="factoryInput__arrow" />
      </div>
      <label for="attach-file" className="factoryInput__label">
        <span>Add photos </span>
        <FontAwesomeIcon icon={faPlus} />
      </label>
      <input
        id="attach-file"
        type="file"
        accept="image/*"
        onChange={onFileChange}
        style={{
          opacity: 0,
        }}
      />
      {nAttachment && (
        <div className="factoryForm__attachment">
        <img
          src={nAttachment}
          style={{
            backgroundImage: nAttachment,
          }}
        />
        <div className="factoryForm__clear" onClick={onClearAttachment}>
          <span>Remove</span>
          <FontAwesomeIcon icon={faTimes} />
        </div>
        </div>
      )}
    </form>
  );
};
export default NTweetFactory;