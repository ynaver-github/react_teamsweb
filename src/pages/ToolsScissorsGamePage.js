import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { NavLink } from 'react-router-dom'

import 'animate.css/animate.min.css';
// https://fontawesome.com/icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, 
  faPencilAlt,
  faArrowLeft,
  faArrowLeftLong,
} from "@fortawesome/free-solid-svg-icons";
// import { faThumbsUp, faThumbsDown } from "@fortawesome/free-light-svg-icons";
import { 
  faThumbsUp, 
  faThumbsDown, 

} from "@fortawesome/free-regular-svg-icons";

import '../App.css';
import '../module_scissors/App.css';
import RpsPage from '../module_scissors/components/RpsPage'

import './ToolsScissorsGamePage.css';

const ToolsScissorsGamePage = () => {
  return (
    <div className='tools-scissors-game-container'>
      <div className='tools-list-back animate__animated animate__zoomIn animate__slow'>
        <NavLink to='/tools'>
          <span ><FontAwesomeIcon icon={faArrowLeftLong} size="1x"/></span>
        </NavLink>
      </div>

      <div className='animate__animated animate__zoomIn animate__slow'>
        <div className='rpspage'>
          <RpsPage />
        </div>
      </div>
    </div>
  );
};

export default ToolsScissorsGamePage;
