import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { animated } from "react-spring";
import { useDrag } from "react-use-gesture";
import useVelocityTrackedSpring from "../use-velocity-tracked-spring";
import useWindowSize from "../use-window-size";
import {
  findNearestNumberInArray,
  projection, rubberBandIfOutOfBounds
} from "../utilities";
import Camera, { Crawler } from "./camera";
import {
  Backdrop,
  ClosedControlsContainer,
  Container,
  Flex,
  Handle,
  MainPage,
  OpenControlsContainer,
  SolutionPage,
  StyledClosedTitle,
  TabBar,
  TabBarItem,
  Title
} from "./styled-components";

import { ReactComponent as RadioIcon } from "../assets/radio.svg";
import { ReactComponent as SearchIcon } from "../assets/search.svg";

const tabIcons = [SearchIcon, RadioIcon];

const nowPlayingImageDimensions = 70;
const drawerPadding = 16;

export async function loader() {
  console.log("MainActivity loader - s");
  console.log("MainActivity loader - e");
}

function MainActivity() {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto' // cleanup or run on page unmount
    }
  }, []);

  const { width, height } = useWindowSize();
  const DrawerRef = useRef(null);

  const stops = [0, -(height * 0.5)];
  const drawerHeight = height * 0.5;

  const spring = {
    tension: 247,
    friction: 27,
  };

  const dampedSpring = {
    tension: 247,
    friction: 33,
  };

  const [{ y }, set] = useVelocityTrackedSpring(() => ({
    y: 0,
    config: spring,
  }));

  const setDrawerOpen = () => {
    set({
      y: stops[1],
      config: dampedSpring,
      immediate: false,
    });
  };

  const threshold = 10;

  const bind = useDrag(
    ({
      vxvy: [, velocityY],
      movement: [movementX, movementY],
      last,
      memo,
      event,
    }) => {
      event.preventDefault();

      const drawerIsOpen = y.value === stops[1];

      const isClick =
        last && Math.abs(movementX) + Math.abs(movementY) <= 3 && !drawerIsOpen;

      if (isClick) return setDrawerOpen();

      if (!memo) {
        const isIntentionalGesture =
          Math.abs(movementY) > threshold &&
          Math.abs(movementY) > Math.abs(movementX);

        if (!isIntentionalGesture) return;
        disableBodyScroll(DrawerRef.current);
        memo = y.value - movementY;
      }

      if (last) {
        enableBodyScroll(DrawerRef.current);

        const projectedEndpoint = y.value + projection(velocityY);
        const point = findNearestNumberInArray(projectedEndpoint, stops);

        return set({
          y: point,
          immediate: false,
          config: spring,
        });
      }

      const newY = rubberBandIfOutOfBounds(
        stops[stops.length - 1],
        stops[0],
        movementY + memo,
        0.08
      );

      set({
        y: newY,
        immediate: true,
      });
      return memo;
    },
    {
      domTarget: DrawerRef,
      event: { passive: false },
    }
  );

  React.useEffect(bind, [bind]);

  // const getImageTransform = () => {
  //   const newWidth = (2 * width) / 3
  //   const scale = newWidth / nowPlayingImageDimensions / 3
  //   const paddingLeft = (width - newWidth) / 2
  //   const translateX = paddingLeft - drawerPadding
  //   return { scale, translateX }
  // }

  const [titleText, setTitle] = useState(
    "결과를 찾지 못했어요, 1:1 문의나 영상 문의를 빠르게 이용하실 수 있습니다."
  );
  console.log("titleText " + titleText);
  const solution = useSelector((state) => state.solution.value);

  useEffect(() => {
    console.log("length " + solution.length)
    setTitle(
      solution.length > 18
        ? "간단한 해결방법을 알려드릴게요."
        : "결과를 찾지 못했어요, 1:1 문의나 영상 문의를 빠르게 이용하실 수 있습니다."
    );
  }, [solution]);

  const childRef = useRef(null);
  const natigateToASForm = () =>{
    console.log("natigateToASForm " );
    childRef.current.navigateToASForm();
  }
  return (
    <div>
    <Container>
      <MainPage>
        <Camera ref={childRef} />
      </MainPage>
      <Backdrop
        as={animated.div}
        style={{
          opacity: y.interpolate(stops, [0, 1]),
        }}
      />
      <SolutionPage
        ref={DrawerRef}
        height={drawerHeight}
        padding={drawerPadding}
        windowHeight={height}
        as={animated.div}
        style={{
          transform: y.interpolate((y) => `translate3D(0, ${y}px, 0)`),
        }}
      >
        <Handle
          as={animated.div}
          style={{
            opacity: y.interpolate(stops, [0.5, 1]),
          }}
        />
        <Flex>
          {/* <NowPlayingImage
            src={snapJudgement}
            dimensions={nowPlayingImageDimensions}
            as={animated.img}
            style={{
              transform: y.interpolate(y => {
                const endTransform = getImageTransform()
                const translateX = rangeMap(
                  stops,
                  [0, endTransform.translateX],
                  y
                )

                const translateY = rangeMap(stops, [0, 30], y)
                const scale = rangeMap(stops, [0.333, endTransform.scale], y)

                const scaleX = Math.max(
                  0.333,
                  Math.min(scale, endTransform.scale)
                )
                return `translate3D(${translateX}px, ${translateY}px, 0) scaleX(${scaleX}) scaleY(${scale})`
              })
            }}
          /> */}

          <StyledClosedTitle
            as={animated.div}
            style={{
              opacity: y.interpolate(stops, [1, 0]),
            }}
          >
            <Title as={animated.h3}>{titleText}</Title>
          </StyledClosedTitle>

          <ClosedControlsContainer
            padding={drawerPadding}
            as={animated.div}
            style={{
              opacity: y.interpolate([0, stops.slice(-1)[0] / 2], [1, 0]),
            }}
          >
            {/* <PlayIcon />
            <FastForwardIcon /> */}
          </ClosedControlsContainer>
        </Flex>
        <OpenControlsContainer
          as={animated.div}
          style={{
            opacity: y.interpolate([stops[1] / 2, stops[1]], [0, 1]),
          }}
        >
          <Title>{titleText}</Title>
          <Crawler />
        </OpenControlsContainer>
      </SolutionPage>
      <TabBar>
        {tabIcons.map((Icon, idx) => (
          <TabBarItem>
            <Icon onClick={ idx == 0 ? natigateToASForm : (()=>{}) } />
          </TabBarItem>
        ))}
      </TabBar>
    </Container>
    </div>
  );
}

export default MainActivity;
