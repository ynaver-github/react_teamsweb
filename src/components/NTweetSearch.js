import React from "react";
import { useState, useRef } from "react";
import { dbService, storageService } from "fbase";
import { v4 as uuidv4 } from "uuid";
import {Link, NavLink, useNavigate} from "react-router-dom";
// https://fontawesome.com/icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

import styled, { css } from 'styled-components';
import './NTweetSearch.css';

const NTweetSearch = ({ userObj }) => {
  console.log(userObj);
  const [nSearchContext, setNSearchContext] = useState("");

  const onSearchSubmit = async (event) => {
    console.log('onSubmit: ' + nSearchContext);
    if (nSearchContext === "") {
        return;
    }
    event.preventDefault();
    setNSearchContext("");
  };

  const onSearchContextChange = (event) => {
    const {
      target: { value },
    } = event;
    console.log(event.target.value);
    setNSearchContext(value);
  };

  return (
    <form onSubmit={onSearchSubmit} className="search-factory-form">
      <div className="search-factoryInput__container">
        <input
          className="search-factoryInput__input"
          value={nSearchContext}
          onChange={onSearchContextChange}
          type="text"
          placeholder="What are you searching for?"
          maxLength={120}
        />
        <input type="submit" value="&rarr;" className="search-factoryInput__arrow" />
      </div>
    </form>
  );
};
export default NTweetSearch;