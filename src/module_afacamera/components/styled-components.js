import styled from "styled-components";

const borderColor = `hsla(0, 0%, 0%, 0.1)`;

export const Title = styled.h3`
  left: 0px;
  right: 0px;
  width: calc(100vw - 1.5rem);
  word-break: keep-all;
  font-weight: bold;
  user-select: none;
  font-size: 1.5rem;
  font-family: "Source Sans Pro";
  padding-left: 1rem;
`;

export const Subtitle = styled.h4`
  user-select: none;
  font-family: "Source Sans Pro";
`;

export const Container = styled.div`
  background: hsla(0, 0%, 0%, 1);
  height: 100vh;
  position: relative;
  overflow: hidden;
`;

const drawerMixin = ({ padding }) => `
  width: 100%;
  background-color: white;
`;

export const MainPage = styled.div`
  ${drawerMixin};
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  min-height: calc(100vh + 2rem);
  padding-top: 2rem;
  position: relative;
  top: -2rem;
  will-change: transform;
  overflow: hidden;
`;

export const Handle = styled.div`
  width: 4rem;
  height: 0.4rem;
  background-color: hsla(0, 0%, 0%, 0.1);
  border-radius: 9px;
  position: absolute;
  top: 1rem;
  left: 50%;
  transform: translateX(-50%);
  margin-left: -8px;
`;

export const SolutionPage = styled.div`
  touch-action: auto;
  left: 0px;
  right: 0px;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  will-change: transform;
  position: fixed;
  height: ${(props) => props.height}px;
  border-top: 1px solid ${borderColor};
  top: calc(${(props) => props.windowHeight}px - 10rem);
  min-height: calc(100vh + 500px);
  ${drawerMixin};
  box-shadow: 0 -3px 10px hsla(0, 0%, 0%, 0.07);

  h1 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
`;

export const ClosedControlsContainer = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 1.7rem;

  svg {
    width: 2.25rem;
    height: auto;
    opacity: 0.6;
  }
`;

export const Flex = styled.div`
  display: flex;
`;

export const OpenControlsContainer = styled.div`
  position: absolute;
  left: 0;
  right: 0;

  top: calc(0vw + 1.5rem);

  width: 100vw;

  > div {
    display: flex;
    justify-content: center;
  }

  > ${Title} {
    padding-top: 0.5rem;
    text-align: left;
    position: relative;
    font-size: 1.5rem;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
  }

  > ${Subtitle} {
    text-align: center;
    font-size: 1.1rem;
    margin-bottom: 1rem;
  }
`;

// export const NowPlayingImage = styled.img.attrs({
//   draggable: false
// })`
//   width: ${props => props.dimensions * 3}px;
//   height: ${props => props.dimensions * 3}px;
//   border-radius: 3px;
//   background-color: black;
//   box-shadow: 0 3px 20px hsla(0, 0%, 0%, 0.3);
//   transform-origin: 0 0;
//   display: block;
//   margin-right: 1rem;
//   position: relative;
//   z-index: 1;
//   transform: scale(0.3333);
//   position: absolute;
//   will-change: transform;
//   user-select: none;
// `

export const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: hsla(0, 0%, 0%, 0.4);
  pointer-events: none;
`;

export const TabBar = styled.div`
  border-top: 1px solid ${borderColor};
  position: fixed;
  left: 0px;
  right: 0px;
  padding-top: 1rem;
  padding-bottom: 1rem;

  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: white;
`;

export const TabBarItem = styled.div`
  opacity: 0.5;
`;

export const StyledClosedTitle = styled.div`
  position: relative;
  bottom: 0.5rem;
  top: 0.5rem;

  > ${Title} {
    padding-top: 1.6rem;
    white-space: nowrap
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
