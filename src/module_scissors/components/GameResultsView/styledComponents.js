import styled from 'styled-components'

/* ui-tunning point */
export const GameViewContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 320px;
  flex-wrap: wrap;
  margin-top: 30px;
  @media screen and (max-width: 576px) {
    width: 250px;
    height: 250px;
    margin-left: 15px;
  }
`
export const GameButton = styled.button`
  width: 150px;
  height: 150px;
  background-color: transparent;
  border-style: none;
  outline: none;
  @media screen and (max-width: 576px) {
    width: 100px;
    height: 100px;
    margin-top: 0px;
    margin-right: 20px;
  }
`
// ui-tunning point 
export const GameImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50px;
  border: 1px solid blue;
  @media screen and (max-width: 576px) {
    width: 100px;
    height: 100px;
  }
`
export const ResultImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 40px;
  @media screen and (max-width: 576px) {
    width: 30%;
  }
`
export const ResultTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 40px;
  @media screen and (max-width: 576px) {
    width: 50%;
  }
`

export const ResultName = styled.p`
  color: white;
  font-size: 20px;
  @media screen and (max-width: 576px) {
    font-size: 14px;
  }
`
export const ResultNameYou = styled.p`
  color: #04aaff;
  font-size: 20px;
  @media screen and (max-width: 576px) {
    font-size: 14px;
  }
`
export const ResultNameOpponent = styled.p`
  color: red;
  font-size: 20px;
  @media screen and (max-width: 576px) {
    font-size: 14px;
  }
`

export const ResultText = styled.p`
  color: white;
  font-size: 25px;
  font-fontWeight: 800;
  @media screen and (max-width: 576px) {
    font-size: 16px;
  }
`

export const ResultWinText = styled.p`
  ${'' /* color: #04aaff;  light blue*/}
  color: #04aaff;
  font-size: 25px;
  font-weight: 800;
  @media screen and (max-width: 576px) {
    font-size: 16px;
  }
`
export const ResultLoseText = styled.p`
  color: red;
  font-size: 25px;
  font-weight: 800;
  @media screen and (max-width: 576px) {
    font-size: 16px;
  }
`
export const ResultDrawText = styled.p`
  color: yellow;
  font-size: 25px;
  font-weight: 800;
  @media screen and (max-width: 576px) {
    font-size: 16px;
  }
`

export const ResultButton = styled.button`
  width: 100px;
  height: 28px;
  padding: 10px;
  color: #223a5f;
  font-size: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  border-style: none;
  outline: none;
`
