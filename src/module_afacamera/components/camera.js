import { motion } from "framer-motion";
import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { setSolutionSlice } from "../../redux/slices/solutionSlice";
import useWindowSize from "../use-window-size";
import "./css/camera.css";

const AIResult = styled.div`
  color: black;
  text-align: center;
  line-height: 5vh;
`;
const VideoView = styled(motion.video)`
  width: 100%;
  border-radius: 15px;
`;

const Camera = forwardRef((props, ref) => {
  const dispatch = useDispatch();
  let videoData;
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const [aiResult, setAIResult] = useState("AFA You Camera");
  let afterResult = "AFA YOU Camera";

  useEffect(() => {
    const backendURL = "https://mug9dnj3x0.execute-api.ap-northeast-2.amazonaws.com/crawling";
    const request = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ information: aiResult }),
    };
    fetch(backendURL, request).then(async (response) => {
      if (response.status == "200") {
        response.json().then((result) => {
          let solution = result.crawling_result;
          dispatch(setSolutionSlice(solution));
        });
      }
    });
  }, [aiResult]);

  const [isStart, setIsStart] = useState(false);
  const canvas = document.createElement("CANVAS");
  const ctx = canvas.getContext("2d");
  const mediaRecorderRef = useRef();
  let srcWidth = 300;
  let srcHeight = srcWidth / (16 / 9);
  const intervalId = useRef(null);
  const [firstFrameAnimation, setFirstFrameAnimation] = useState();
  const firstFrameAnimationVariant = {
    visible: { opacity: 1, transition: { ease: "linear", duration: 0.5 } },
    hidden: { opacity: 0, transition: { ease: "linear", duration: 0.5 } },
  };

  //const backendURL = "https://reactcloudcamera.com/ai";
  const backendURL = "https://mug9dnj3x0.execute-api.ap-northeast-2.amazonaws.com/ai"

  useImperativeHandle(ref, () => ({
    navigateToASForm: stopRecording
  }));

  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia({
        video: {
          width: { min: 720, max: 1440, ideal: 1440 },
          aspectRatio: 1.33,
          facingMode: "environment",
        },
        audio: true,
      })
      .then((stream) => {
        let video = videoRef.current;

        video.srcObject = stream;
        mediaRecorderRef.current = new MediaRecorder(stream);

        video.play().then(() => {
          setFirstFrameAnimation("visible");
          srcWidth = video.videoWidth;
          srcHeight = video.videoHeight;
          canvas.width = srcWidth / 2;
          canvas.height = srcHeight / 2;
        });
        intervalId.current = setInterval(sendImage, 1500);
        startRecording();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const startRecording = async () => {
    if (isStart === true) {
      return;
    } else {
      mediaRecorderRef.current.onstart = () => {
        setIsStart(true);
        console.log("비디오 시작합니다");
      };
      mediaRecorderRef.current.ondataavailable = (event) => {
        console.log("[ondataavailable] mediaRecorder ondataavailable -s");
        videoData = new Blob([event.data], { type: "video/mp4" });
        const videoURL = window.URL.createObjectURL(videoData);
        //dispatch(setVideoSlice(videoURL));
        console.log("[ondataavailable] mediaRecorder ondataavailable -e");
      };
      mediaRecorderRef.current.onstop = (event) => {
        console.log("[onstop] mediaRecorder onstop - s, aiResult : " + aiResult);
        navigate("/asform", { state: { videoData: videoData, aiResult: aiResult } });
        console.log("[onstop] mediaRecorder onstop - e");
      };
      mediaRecorderRef.current.start();
    }
  };

  const stopRecording = async () => {
    if (isStart === true) {
      setIsStart(false);
      mediaRecorderRef.current.stop();
    }
  }

  useEffect(() => {
    getVideo();
    return () => {
      console.log("clear");
      clearInterval(intervalId.current);
    };
  }, [videoRef]);

  const sendImage = async () => {
    let video = videoRef.current;
    console.log(video.videoWidth, video.videoHeight);
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageData = canvas.toDataURL("image/jpeg", 1.0);

    const request = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ image: imageData }),
    };
    fetch(backendURL, request).then(async (response) => {
      if (response.status == "200") {
        response.json().then((result) => {
          let error_result;
          switch (result.error_case) {
            case 'DrumWashingmachine_door':
              error_result = "드럼세탁기 도어";
              break;
            case 'DrumWashingmachine_pannel':
              error_result = "드럼 세탁기 패널";
              if (result.error_code != "None") error_result = error_result + ", " + result.error_code;
              break;
            case 'RoundWashingmachine_pannel':
              error_result = "통돌이 세탁기 패널";
              if (result.error_code != "None") error_result = error_result + ", " + result.error_code;
              break;
            default:
              error_result = "아픈 가전을 보여주세요!";
              break;
          }
          console.log(error_result);
          setAIResult(error_result);
        });
      }
    });
  };

  return (
    <div className="App">
      <motion.div
        initial="hidden"
        animate={firstFrameAnimation}
        variants={firstFrameAnimationVariant}
      >
        {/* <Container>
          <div class="field">
            <Label pointing='below'>{aiResult}</Label>
          </div>
        </Container> */}
        <AIResult>{aiResult}</AIResult>
      </motion.div>
      <VideoView
        initial="hidden"
        animate={firstFrameAnimation}
        variants={firstFrameAnimationVariant}
        autoPlay
        playsInline
        ref={videoRef}
        muted
      />
    </div>
  );
});

export default Camera;

const StyledNav = styled.nav`
  touch-action: none;
  overflow-y: auto;
  height: ${(props) => props.height}px;
  width: calc(100vw - 1.5rem);
  padding-left: 1.0rem;
  font-family: "Source Sans Pro";

  div {
    font-size: 0.8rem;
    padding-left: 0.2rem;
    padding-right: 0.7rem;
  }
  h3 {
    font-weight: bold;
    font-size: 1.0rem;
    padding-bottom: 0.4rem;
  }
  h4 {
    font-weight: bold;
    font-size: 1.0rem;
    padding-top: 0.4rem;
  }
  h5 {
    font-weight: bold;
    font-size: 0.8rem;
    padding-left: 0.3rem;
  }
  p {
    font-size: 0.8rem;
    padding-left: 0.7rem
    padding-top: 0.2rem;
  }
  strong {
    font-weight: bold;
    font-size: 0.8rem;
    padding : 0.5rem;
  }
  span {
    font-size: 0.8rem;
    padding-left: 0.7rem
  }
  li {
    font-size: 0.8rem;
    padding-top: 0.2rem
    padding-left: 0.7rem
  }
  img {
    font-size: 0;
  }
`;

export function Crawler() {
  const solution = useSelector((state) => state.solution.value);
  const { width, height } = useWindowSize();
  const bodyHeight = 0.5 * height;
  const CrawlerRef = useRef(null);

  return (
    <StyledNav height={bodyHeight} ref={CrawlerRef}>
      <motion.div
        drag="y"
        dragConstraints={CrawlerRef}
        onTouchMove={(event) => {
          event.stopPropagation();
          }
        }
        dangerouslySetInnerHTML={{ __html: solution }}
        >
      </motion.div>
    </StyledNav>
  );
}
