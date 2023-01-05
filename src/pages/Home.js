import React from "react";
import { useEffect, useState, useCallback, useRef } from "react";
import { dbService, storageService } from "fbase";
import { v4 as uuidv4 } from "uuid";
import {Link, NavLink, useNavigate} from "react-router-dom";
// https://fontawesome.com/icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHouse,
    faUser,
    faUsersRectangle,
    faPlus,
    faArrowUp,
    faArrowUpLong,
    faArrowsUpToLine,
    faTimes,
    faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import styled, { css } from 'styled-components';
import './Home.css';
import NTweet from "components/NTweet";
import NTweetFactory from "components/NTweetFactory";

const FloatingBtnPlus = styled.div`
  position: fixed; //포인트!
  line-height: 63px;
  bottom: 60px; //위치
  right: 20px;  //위치
  width: 40px;  
  height: 40px;
  border-radius: 50%;
  background-color: rgba(26, 136, 240, 0.8);
  color: white;
  font-size: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const FloatingBtnUp = styled.div`
  position: fixed; //포인트!
  line-height: 63px;
  bottom: 20px; //위치
  right: 20px;  //위치
  width: 40px;  
  height: 40px;
  border-radius: 50%;
  ${'' /* background-color: white; */}
  background-color: rgba(26, 136, 240, 0.8);
  color: white;
  font-size: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const Home = ({ userObj }) => {
    console.log(userObj);
    const [nTweets, setNTweets] = useState([]);
    // users information
    const [nTweetUsersInfo, setNTweetUsersInfo] = useState([]);

    const [scrollTopBtnIsVisible, setScrollTopBtnIsVisible] = useState(false);

    const scrollToTop = useCallback(() => {
        console.log('scrollToTop');
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    useEffect(() => {
        const showTopBtnOnBottom = () => {
            if (window.pageYOffset > 100) {
            setScrollTopBtnIsVisible(true);
            } else {
            setScrollTopBtnIsVisible(false);
            }
        };
        window.addEventListener("scroll", showTopBtnOnBottom);
        return () => {
            window.removeEventListener("scroll", showTopBtnOnBottom);
        };
    }, []);
    /*const getNeweets = async() => {
        //get은 QuarySnapshot을 return
        const dbNTweets = await dbService.collection("nTweetCollections").get();
        //내 state에 있는 각각의 document.data()를 console.log
        dbNTweets.forEach((document) => //console.log(document.data())); 
        { const nweetObject = {
            ...document.data(),
            id: document.id,
        };
            //모든 이전 nweets에 대해 배열을 리턴, 그 배열은 새로 작성한 트윗과 그 이전 것들
            //값 대신에 함수를 전달할 수 있음, 함수를 전달하면 리액트는 이전 값에 접근할 수 있게 해줌
            setNTweets(prev => [nweetObject, ...prev]);
        });
    };*/

    useEffect(() => {
        console.log('[Once] : ');
        // users information
        dbService.collection("nTweetUsersInfo").onSnapshot(snapshot => {
            const nTweetUsersInfoArray = snapshot.docs.map(doc => ({
                id:doc.id,
            ...doc.data(),
            }));

            // To take care of exception of no data
            const copyNTweetUsersInfoArray = [...nTweetUsersInfoArray];
            console.log("copyNTweetUsersInfoArray " + copyNTweetUsersInfoArray);
            console.log(copyNTweetUsersInfoArray);
            setNTweetUsersInfo(copyNTweetUsersInfoArray);
        });

        //getNeweets();
        //위 방식과 이것 중 하나 선택해서 쓰면 됨
        //이 방식은 더 적게 re-render 하기 때문에 더 빠르게 실행되도록 만들어줌
        //무언가를 지우거나 업데이트 하든, 뭘 하든 실행이 됨
        dbService.collection("nTweetCollections").orderBy("createdAt", "desc").onSnapshot(snapshot => {
            const nTweetArray = snapshot.docs.map(doc => ({
                id:doc.id,
            ...doc.data(),
            }));

            // To take care of exception of no data
            const copyNTweetArray = [...nTweetArray];
            console.log("copynTweetArray " + copyNTweetArray);
            console.log(copyNTweetArray);
            const copyNTweetArray2 = copyNTweetArray.map((element) => {
                console.log("element " + element);
                console.log(element);
                let copyElement = {...element};
                if (element.dislikesArray === undefined) {
                    console.log("element.dislikesArray " + element.dislikesArray);
                    copyElement = {...copyElement, dislikesArray: []};
                }
                if (element.likesArray === undefined) {
                    console.log("element.likesArray " +  element.likesArray);
                    copyElement = {...copyElement, likesArray: []};
                }
                // uid: element.creatorId,
                if (element.uid === undefined) {
                    console.log("element.uid " +  element.uid);
                    copyElement = {...copyElement, uid: element.creatorId};
                }
                // email: "",
                if (element.email === undefined) {
                    console.log("element.email " +  element.email);
                    copyElement = {...copyElement, email: ""};
                }
                console.log("copyElement " + copyElement);
                console.log(copyElement);
                return copyElement;
            });
            console.log("copyNTweetArray2 " + copyNTweetArray2);
            console.log(copyNTweetArray2);
            setNTweets(copyNTweetArray2);
        });
    }, []);

    const nTweetDisplayObj =  (nTweetElement) => {
        const copyNTweetUsersInfoObj =  [...nTweetUsersInfo];
        console.log('nTweetDisplayObj copyNTweetUsersInfoObj: ' + copyNTweetUsersInfoObj);
        console.log(copyNTweetUsersInfoObj);
        console.log('nTweetDisplayObj nTweetElement.creatorId: ' + nTweetElement.creatorId);
        console.log('nTweetDisplayObj nTweetElement.uid: ' + nTweetElement.uid);
        console.log('nTweetDisplayObj nTweetElement.email: ' + nTweetElement.email);
        const copyNTweetUsersInfoObj2 = copyNTweetUsersInfoObj.filter((element) => element.uid === nTweetElement.creatorId);
        // const copyNTweetUsersInfoObj2 = copyNTweetUsersInfoObj.filter((element) => element.uid === nTweetElement.uid);
        // const copyNTweetUsersInfoObj2 = copyNTweetUsersInfoObj.filter((element) => element.email === nTweetElement.email);
        console.log('nTweetDisplayObj copyNTweetUsersInfoObj2.length: ' + copyNTweetUsersInfoObj2.length);
        console.log(copyNTweetUsersInfoObj2);
        if (copyNTweetUsersInfoObj2.length > 0) {
            console.log('nTweetDisplayObj setIsUserInfoFound: TRUE');
            return ({
                    displayName: copyNTweetUsersInfoObj2[0].displayName,
                    email: copyNTweetUsersInfoObj2[0].email,
                    uid: copyNTweetUsersInfoObj2[0].uid,
                    photoURL: copyNTweetUsersInfoObj2[0].photoURL,
            });
        } else {
            console.log('[nTweetUsersInfoObj] setIsUserInfoFound: FALSE');
            return ({
                displayName: nTweetElement.name,
                email: nTweetElement.email,
                uid: nTweetElement.creatorId,
                photoURL: null,
        });
        }
    };

    return(
        <div className="home-container">
            {/* <NTweetFactory userObj={userObj} /> */}
            <div style={{ marginTop: 5}}>
                {nTweets.map((nTweetElement) => (
                <NTweet
                    userObj={userObj}
                    key={nTweetElement.id}
                    nTweetObj={nTweetElement}
                    isOwner={nTweetElement.creatorId === userObj.uid}
                    nTweetUsersInfoObj={nTweetUsersInfo}
                    displayObj={nTweetDisplayObj(nTweetElement)}
                />
                ))}
            </div>
            <Link to="/edit">
                <FloatingBtnPlus>
                    <FontAwesomeIcon
                        icon={faPlus}
                        style={{ margin: 5 }}
                    />
                </FloatingBtnPlus>
            </Link>
            {scrollTopBtnIsVisible && (
                <div onClick={scrollToTop}>
                <FloatingBtnUp>
                    <FontAwesomeIcon
                        icon={faArrowUpLong}
                        style={{ margin: 5 }}
                    />
                </FloatingBtnUp>
                </div>
            )}
        </div>
    )
};
export default Home;