
// import logo from '../logo.svg';
// import '../App.css';

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
import { faThumbsUp, faThumbsDown, faCommentDots } from "@fortawesome/free-regular-svg-icons";

import AnalogClock from '../module_alarm/components/AnalogClock';
import Alarm from '../module_alarm/context/Alarm';
import AlarmOption from '../module_alarm/components/AlarmOption';
import DigitalClock from '../module_alarm/components/DigitalClock';

import '../module_alarm/App.css';
import ProximitySensor, { onMouseMove } from '../module_alarm/components/ProximitySensor';
import RickyMonty from '../module_alarm/assets/rickymonty.png';
import Eye from '../module_alarm/assets/eye.png';


import './ToolsAlarmClock.css';


const ToolsAlarmClock = () => {
  return (
    <div className='tools-alarmclock-container'>
    <div>
      <div  className='tools-list-back animate__animated animate__zoomIn animate__slow'>
        <NavLink to='/tools'>
        <span ><FontAwesomeIcon icon={faArrowLeftLong} size="1x"/></span>
        </NavLink>  
      </div>

      <div className='animate__animated animate__zoomIn animate__slow'>
      <section className="clock-container" onMouseMove={onMouseMove}>
            {/* <ProximitySensor /> */}
        <div className="clock-container grid">
          <div className="clock-content grid">
            <Alarm>
              <AnalogClock />
              <DigitalClock />
              <AlarmOption />
            </Alarm>
          </div>
        </div>
        <div>
        {/* <ProximitySensor /> */}
        {/* <img src={RickyMonty} alt="Ricky and Monty" id="anchor" /> */}
        </div>
      </section>
      </div>
      </div>
    </div>
  );
};

export default ToolsAlarmClock;
