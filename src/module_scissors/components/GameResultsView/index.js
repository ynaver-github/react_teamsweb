import {
  GameViewContainer,
  GameButton,
  GameImage,
  ResultImageContainer,
  ResultTextContainer,
  ResultName,
  ResultNameYou,
  ResultNameOpponent,
  ResultText,
  ResultWinText,
  ResultLoseText,  
  ResultDrawText,
} from './styledComponents'

import './index.css'

import 'animate.css/animate.min.css';

const GameResultsView = props => {
  const {choicesList, isShow, checkResult, newArray, text, restartGame} = props
  const showGame = () => (
    <GameViewContainer>
      {isShow && (
        <>
        <div className='animate__animated animate__zoomIn animate__fast'> 
          <GameButton
            type="button"
            data-testid="rockButton"
            onClick={() => checkResult(choicesList[0].id)}
          >
            <GameImage
              src={choicesList[0].imageUrl}
              alt={choicesList[0].id}
              key={choicesList[0].id}
            />
          </GameButton>
          </div>
          <div className='animate__animated animate__zoomIn animate__fast'> 
          <GameButton
            type="button"
            data-testid="scissorsButton"
            onClick={() => checkResult(choicesList[1].id)}
          >
            <GameImage
              src={choicesList[1].imageUrl}
              alt={choicesList[1].id}
              key={choicesList[1].id}
            />
          </GameButton>
          </div>
          <div className='animate__animated animate__zoomIn animate__fast'> 
          <GameButton
            type="button"
            data-testid="paperButton"
            onClick={() => checkResult(choicesList[2].id)}
          >
            <GameImage
              src={choicesList[2].imageUrl}
              alt={choicesList[2].id}
              key={choicesList[2].id}
            />
          </GameButton>
          </div>
        </>
      )}
      {!isShow && (
        <>
          <ResultImageContainer>
            <ResultNameYou>YOU</ResultNameYou>
            <div className='animate__animated animate__zoomIn animate__slow'>
            <GameImage src={newArray[0].imageUrl} alt="your choice" />
            </div>
          </ResultImageContainer>
          <ResultImageContainer>
            <ResultNameOpponent>OPPONENT</ResultNameOpponent>
            <div className='animate__animated animate__zoomIn animate__slow'>
            <GameImage src={newArray[1].imageUrl} alt="opponent choice" />
            </div>
          </ResultImageContainer>
          <ResultTextContainer>
            <div className='animate__animated animate__zoomIn animate__slow'>
            {/* <ResultText>{text}</ResultText> */}
            {(text === 'YOU WON') &&
              <ResultWinText>{text}</ResultWinText>
            }
            {(text === 'YOU LOSE') && 
              <ResultLoseText>{text}</ResultLoseText>
            }
            {(text === 'IT IS DRAW') && 
              <ResultDrawText>{text}</ResultDrawText>
            }
            </div>
            <button
              className="result-button"
              type="button"
              onClick={restartGame}
            >
              PLAY AGAIN
            </button>
          </ResultTextContainer>
        </>
      )}
    </GameViewContainer>
  )
  return showGame()
}

export default GameResultsView
