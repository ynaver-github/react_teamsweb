import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { NavLink } from 'react-router-dom'

import '../module_puzzle/index.css';
import GameScreen from "../module_puzzle/screens/GameScreen";
import FoundationLayout from "../module_puzzle/components/layout/FoundationLayout";
// the game context contains the entire state of the game
import {GameContextProvider} from "../module_puzzle/store/GameContext";

const PuzzlePage = () => {
  return (
    <div>
      <br></br>
      <NavLink to='/tools' className='tools-list-back'>
      &lt;-
      </NavLink>  
      <br></br>
      <br></br>
      <GameContextProvider>
      <FoundationLayout>
        <GameScreen />
      </FoundationLayout>
      </GameContextProvider>
      <br></br><br></br>
    </div>
  );
};

export default PuzzlePage;
