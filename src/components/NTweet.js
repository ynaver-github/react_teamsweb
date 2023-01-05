import React from "react";
import { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { dbService, storageService } from "fbase";
// https://fontawesome.com/icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt, faUser, faTimes, faPlus} from "@fortawesome/free-solid-svg-icons";
// import { faThumbsUp, faThumbsDown } from "@fortawesome/free-light-svg-icons";
import { faThumbsUp, faThumbsDown, faCommentDots, faSquarePlus } from "@fortawesome/free-regular-svg-icons";

import styled, { css } from 'styled-components';
import './NTweet.css';
import EachComment from "./EachComment";
import 'semantic-ui-css/semantic.min.css';
import { Button } from 'semantic-ui-react';

const NTweet = ( {userObj, nTweetObj, isOwner, nTweetUsersInfoObj, displayObj} ) => {
    console.log("userObj.displayName: " + userObj.displayName);
    console.log(userObj);
    console.log("nTweetObj.name: " + nTweetObj.name);
    console.log("nTweetObj.email: " + nTweetObj.email);
    console.log("nTweetObj.uid: " + nTweetObj.uid);
    console.log("nTweetObj.creatorId: " + nTweetObj.creatorId);
    console.log(nTweetObj);
    console.log(nTweetUsersInfoObj);
    console.log("displayObj.displayName: " + displayObj.displayName);
    console.log(displayObj);

    const [editing, setEditing] = useState(false); //editing mode인지 아닌지를 알려줌
    const [newTitle, setNewTitle] = useState(nTweetObj.title);
    const [newNContext, SetNewNContext] = useState(nTweetObj.text); //input에 입력된 text를 업데이트 해줌
    const [newAttachment, setNewAttachment] = useState(nTweetObj.attachmentUrl);
    const [isNewAttachment, setIsNewAttachment] = useState(false);
    const [newLikeCount, setNewLikeCount] = useState(nTweetObj.likesArray.length / 2);
    const [newDisLikeCount, setNewDisLikeCount] = useState(nTweetObj.dislikesArray.length / 2); //input에 입력된 text를 업데이트 해줌
    const [newLikeArray, setNewLikeArray] = useState(nTweetObj.likesArray);
    const [newDisLikeArray, setNewDisLikeArray] = useState(nTweetObj.dislikesArray); //input에 입력된 text를 업데이트 해줌

    //게시를 Like, dislike
    const [isLike, setIsLike] = useState(false); // 좋아요를 눌렀는지 체크(Local)
    const [isHeart, setIsHeart] = useState(nTweetObj.likesArray.includes(userObj?.email)); // 좋아요를 눌렀는지 체크(DB)
    const [isDisLike, setIsDisLike] = useState(false); // 좋아요를 눌렀는지 체크(Local)
    const [isDisHeart, setIsDisHeart] = useState(nTweetObj.likesArray.includes(userObj?.email)); // 좋아요를 눌렀는지 체크(DB)

    //comment dislike
    const [isDisLikeComm, setIsDisLikeComm] = useState(false); // comment 싫어요를 눌렀는지 체크(Local)
    const [isDisHeartComm, setIsDisHeartComm] = useState(false); // comment 싫어요를 눌렀는지 체크(DB)
    const [isLikeComm, setIsLikeComm] = useState(false); // comment 좋아요를 눌렀는지 체크(Local)
    const [isHeartComm, setIsHeartComm] = useState(false); // comment 좋아요를 눌렀는지 체크(DB)

    console.log("email: " + userObj.email);

    const editInputFocus = useRef(null);
    const commentEditInputFocus = useRef(null);

    // const [newCommentList, setNewCommentList] = useState([
    //     {id:1, name: "A", context: "AAAAA"},
    //     {id:2, name: "B", context: "BBBBB"},
    //     {id:3, name: "C", context: "CCCCC"},
    // ])

    const [newCommentList, setNewCommentList] = useState(nTweetObj.commentList);
    console.log("NTweet newCommentList: " + newCommentList);
    console.log(newCommentList);

    const size = newCommentList.length;
    console.log("NTweet size: " + size);
    const [newCommentListLength, setNewCommentListLength] = useState(size);

    const [newComment, setNewComment] = useState("");
    // const [newCommentLikeCount, setNewCommentLikeCount] = useState(0);
    // const [newCommentDisLikeCount, setNewCommentDisLikeCount] = useState(0); 

    const [isShowComment, setIsShowComment] = useState(false);
    console.log("isShowComment: " + isShowComment);

    const onDeleteClick = async () => {
        const ok = window.confirm("Are you sure you want to delete this nweet?");
        console.log("onDeleteClick: " + ok);
        if(ok){
            //delete
            console.log('nTweetObj.id: ' + nTweetObj.id);
            await dbService.doc(`nTweetCollections/${nTweetObj.id}`).delete();
            await storageService.refFromURL(newAttachment).delete();
        }
    };

    const toggleEditing =  () => {
        setEditing(prev => !prev)
    };

    const onEditClick =  () => {
        setEditing(true);
        // editInputFocus.current.focus();
    };


    const onEditCancelSubmit =  () => {
        // editInputFocus.current.focus();
        setIsNewAttachment(false);
        setEditing(false)
    };

    // To prevent Sequential Clicks
    let isOnEditUpdate = false;
    const onEditUpdate = async (event) => {
        console.log('onEditUpdate: ' + newTitle);
        console.log("onEditUpdate isNewAttachment: " + isNewAttachment);
        if (isOnEditUpdate) {
        return;
        }
        isOnEditUpdate = true;
        // if ( newTitle === '') {
        //     return;
        // }
        console.log('onEditUpdate: ' + newNContext);
        // if ( newNContext === '') {
        //     return;
        // }
        const newNContextArray = newNContext.split(' ');
        console.log('onEditUpdate: ' + newNContextArray);
        const newNContextArrayLowCase = newNContextArray.map((str) => str.toLowerCase());
        console.log('onEditUpdate: ' + newNContextArrayLowCase);
        event.preventDefault();
        //console.log(nTweetObj, newNContext);
        let attachmentUrl = "";
        if ((nTweetObj.title !== newTitle) || (nTweetObj.text !== newNContext) || (nTweetObj.attachmentUrl !== newAttachment)) {
            console.log("isNewAttachment: " + isNewAttachment);
            if (isNewAttachment) {
                if ((newAttachment !== null) && (newAttachment !== "")) {
                    console.log("newAttachment: " + newAttachment);
                    const attachmentRef = storageService
                      .ref()
                      .child(`${userObj.uid}/${uuidv4()}`);
                    const response = await attachmentRef.putString(newAttachment, "data_url");
                    attachmentUrl = await response.ref.getDownloadURL();
                } else {
                    console.log("Not newAttachment: " + newAttachment);
                    attachmentUrl = "";
                }
                console.log("attachmentUrl: " + attachmentUrl);
                await dbService.doc(`nTweetCollections/${nTweetObj.id}`).update({
                    title: newTitle,
                    text: newNContext,
                    // textArray: nContextArray,
                    textArray: newNContextArrayLowCase,
                    attachmentUrl: attachmentUrl,
                });
            } else {
                await dbService.doc(`nTweetCollections/${nTweetObj.id}`).update({
                    title: newTitle,
                    text: newNContext,
                    // textArray: nContextArray,
                    textArray: newNContextArrayLowCase,
                });
            }
        }
        setEditing(false);
        setIsNewAttachment(false);
        isOnEditUpdate = false;
    };

    const onTitleChange = (event) => {
        const {
          target: { value },
        } = event;
        setNewTitle(value);
      };

    const onContextChange = (event) => {
        const {
            target: {value},
        } = event;
        SetNewNContext(value);
    };

    const onFileChange = (event) => {
        const {
          target: { files },
        } = event;
        const theFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
            const {
                currentTarget: { result },
            } = finishedEvent;
            setNewAttachment(result);
            setIsNewAttachment(true);
            console.log("result: " + result);
        };
        reader.readAsDataURL(theFile);
    };

    const onClearAttachment = () => setNewAttachment("");

    // 좋아요 버튼
    const onLikeClick = async () => {
        //console.log("here", userObj.email)
        // console.log("onLikeClick: like array", nTweetObj.likesArray)
        // const totalLikesArray = [userObj.email, ...nTweetObj.likesArray];
        // const checkTotalLikesArray = nTweetObj.likesArray.includes(userObj.email);
        console.log("onLikeClick: newLikeArray", newLikeArray)
        const totalLikesArray = [userObj.email, ...newLikeArray];
        const checkTotalLikesArray = newLikeArray.includes(userObj.email);
     
        if (checkTotalLikesArray) {
            const filteredLikesArray = totalLikesArray.filter((value, index) => {
                return value !== userObj.email;
            });
            const copyLikesArray = [...filteredLikesArray]
            console.log("onLikeClick: copyLikesArray " + copyLikesArray);
            setNewLikeArray(copyLikesArray);
            console.log("onLikeClick: newLikeCount " + newLikeCount);
            console.log("onLikeClick: newLikeArray.length " + copyLikesArray.length);
            setNewLikeCount(copyLikesArray.length / 2);
            await dbService.doc(`nTweetCollections/${nTweetObj.id}`).update({
                likesArray: filteredLikesArray, 
                //clickLikes: false,
            });
            setIsLike(false);
            setIsHeart(false);
            return;
        }
  
        if (isLike === false) { //좋아요 안 누르는 상태
            const copyLikesArray = [...totalLikesArray, userObj.email];
            console.log("onLikeClick: copyLikesArray " + copyLikesArray);
            setNewLikeArray(copyLikesArray);
            console.log("onLikeClick: newLikeCount " + newLikeCount);
            console.log("onLikeClick: newLikeArray.length " + copyLikesArray.length);
            setNewLikeCount(copyLikesArray.length / 2);
            await dbService.doc(`nTweetCollections/${nTweetObj.id}`).update({
                //likesArray: [{...new Set(totalLikesArray)}],
                isLikes: true,
                likesArray: [...totalLikesArray, userObj.email],
                totalLikes : nTweetObj.totalLikes + 1,
            })
            console.log("Like array" , nTweetObj.likesArray)
            setIsHeart(true);
        } else if (isLike === true) { //좋아요 눌러진 상태
            const filteredLikesArray = totalLikesArray.filter((value, index) => {
                return value !== userObj.email;
            });
            const copyLikesArray = [...filteredLikesArray];
            console.log("onLikeClick: copyLikesArray " + copyLikesArray);
            setNewLikeArray(copyLikesArray);
            console.log("onLikeClick: newLikeCount " + newLikeCount);
            console.log("onLikeClick: copyLikesArray.length " + copyLikesArray.length);
            setNewLikeCount(copyLikesArray.length / 2);
            await dbService.doc(`nTweetCollections/${nTweetObj.id}`).update({
                //likesArray: filteredLikesArray,
                isLikes: false,
                likesArray: filteredLikesArray,
                totalLikes : nTweetObj.totalLikes - 1,
            });
            console.log("Like array", nTweetObj.likesArray)
            setIsHeart(false);
            //setlikeCount(likeCount -1)
        }
        setIsLike(!isLike);
    };

    //Dislike버튼
    const onDisLikeClick = async () => {
        // console.log("like array", nTweetObj.dislikesArray)
        // const totalDisLikesArray = [userObj.email, ...nTweetObj.dislikesArray];
        // const checkTotalDisLikesArray = nTweetObj.dislikesArray.includes(userObj.email);
        console.log("onDisLikeClick: newDisLikeArray ", newDisLikeArray);
        const totalDisLikesArray = [userObj.email, ...newDisLikeArray];
        const checkTotalDisLikesArray = newDisLikeArray.includes(userObj.email);

        if (checkTotalDisLikesArray) {
            const filteredDisLikesArray = totalDisLikesArray.filter((value, index) => {
                return value !== userObj.email;
            });
            const copyDisLikesArray = [...filteredDisLikesArray]
            console.log("onDisLikeClick: copyDisLikesArray " + copyDisLikesArray);
            setNewDisLikeArray(copyDisLikesArray);
            console.log("onDisLikeClick: newDisLikeCount " + newDisLikeCount);
            console.log("onDisLikeClick: copyDisLikesArray.length " + copyDisLikesArray.length);
            setNewDisLikeCount(copyDisLikesArray.length / 2);
            await dbService.doc(`nTweetCollections/${nTweetObj.id}`).update({
                dislikesArray: filteredDisLikesArray, 
                //clickLikes: false,
            });
            setIsDisLike(false);
            setIsDisHeart(false);
            return;
        }
  
        if (isDisLike === false) { //좋아요 안 누르는 상태
            const copyDisLikesArray = [...totalDisLikesArray, userObj.email]
            console.log("onDisLikeClick: copyDisLikesArray " + copyDisLikesArray);
            setNewDisLikeArray(copyDisLikesArray);
            console.log("onDisLikeClick: newDisLikeCount " + newDisLikeCount);
            console.log("onDisLikeClick: copyDisLikesArray.length " + copyDisLikesArray.length);
            setNewDisLikeCount(copyDisLikesArray.length / 2);
            await dbService.doc(`nTweetCollections/${nTweetObj.id}`).update({
                //likesArray: [{...new Set(totalLikesArray)}],
                dislikesArray: [...totalDisLikesArray, userObj.email],
                isdisLike: true,
                //totalLikes : nTweetObj.totalLikes + 1,
                
            })
            console.log("Like array" , nTweetObj.dislikesArray)
            setIsDisHeart(true);
        } else if (isDisLike === true) { //좋아요 눌러진 상태
            const filteredDisLikesArray = totalDisLikesArray.filter((value, index) => {
                return value !== userObj.email;
            });
            const copyDisLikesArray = [...filteredDisLikesArray]
            console.log("onDisLikeClick: copyDisLikesArray " + copyDisLikesArray);
            setNewDisLikeArray(copyDisLikesArray);
            console.log("onDisLikeClick: newDisLikeCount " + newDisLikeCount);
            console.log("onDisLikeClick: copyDisLikesArray.length " + copyDisLikesArray.length);
            setNewDisLikeCount(copyDisLikesArray.length / 2);
            await dbService.doc(`nTweetCollections/${nTweetObj.id}`).update({
                //likesArray: filteredDisLikesArray,
                isdisLike: false,
                //totalLikes : nTweetObj.totalLikes - 1,
                dislikesArray: filteredDisLikesArray,
            });
            console.log("Like array", nTweetObj.dislikesArray)
            setIsDisHeart(false);
            //setlikeCount(likeCount -1)
        }
        setIsDisLike(!isDisLike);
    }

    const onCommentClick = async () => {
        console.log('onCommentClick: ' + isShowComment);

        // To take care of exception of no data
        const copyNewCommentList = [...newCommentList];
        console.log("copyNewCommentList " + copyNewCommentList);
        console.log(copyNewCommentList);
        const copyNewCommentList2 = copyNewCommentList.map((element) => {
            console.log("element " + element);
            console.log(element);
            let copyElement = {...element};
            if (element.comdislikeArray === undefined) {
                console.log("element.comdislikeArray " +  element.comdislikeArray);
                copyElement = {...copyElement, comdislikeArray: []};
            }
            if (element.comlikeArray === undefined) {
                console.log("element.comlikeArray " + element.comlikeArray);
                copyElement = {...copyElement, comlikeArray: []};
            }
            // uid: element.creatorId,
            if (element.uid === undefined) {
                console.log("element.uid " +  element.uid);
                copyElement = {...copyElement, uid: element.creatorId};
            }
            // email: userObj.email,
            if (element.email === undefined) {
                console.log("element.email " +  element.email);
                copyElement = {...copyElement, email: ""};
            }
            console.log("copyElement " + copyElement);
            console.log(copyElement);
            return copyElement;
        });
        console.log("copyNewCommentList2 " + copyNewCommentList2);
        console.log(copyNewCommentList2);
        setNewCommentList(copyNewCommentList2);

        setIsShowComment(prev => !prev);
        // const ok = window.confirm("Are you sure you want to delete this nweet?");
        //console.log(ok);
        // if(ok){
        //     //delete
        //     await dbService.doc(`nTweetCollections/${nTweetObj.id}`).delete();
        //     await storageService.refFromURL(nTweetObj.attachmentUrl).delete();
        // }
    };

    const onCommentChange = async (event) => {
        const {
            target: { value },
          } = event;
          setNewComment(value);
    };

    const onCommentAdd = async (event) => {
        if (newComment === "") {
            return;
        }
        console.log('onCommentAdd newComment: ' + newComment);
        console.log(newComment);
        event.preventDefault();
        console.log('onCommentAdd nTweetObj.name: ' + nTweetObj.name);

        commentEditInputFocus.current.focus();

        const newCommentObj = [
            {
                // id: size + 1, 
                name: userObj.displayName, 
                context: newComment,
                createdAt: Date.now(),
                creatorId: userObj.uid,
                likeCount: 0,
                disLikeCount: 0,
                comlikeArray: [],
                comdislikeArray: [],
                isLikesComm: false,
                isdisLikeComm: false,
            }
        ];
        console.log('onCommentAdd newCommentObj: ' + newCommentObj);
        console.log(newCommentObj);

        console.log('onCommentAdd newCommentList: ' + newCommentList);
        console.log(newCommentList);
        const copyCommentList = [...newCommentList];
        console.log('onCommentAdd copyCommentList: ' + copyCommentList);
        console.log(copyCommentList);
        const copyCommentList2 = newCommentObj.concat(copyCommentList);
        console.log('onCommentAdd copyCommentList2: ' + copyCommentList2);
        console.log(copyCommentList2);

        setNewComment("");
        const orderByCreatedAt = (a, b) => b.createdAt - a.createdAt;
        const copyCommentList3 = copyCommentList2.sort(orderByCreatedAt);
        console.log('onCommentAdd copyCommentList3: ' + copyCommentList3);
        console.log(copyCommentList3);
        setNewCommentList(copyCommentList3);
        const size = copyCommentList3.length;
        console.log('onCommentAdd size: ' + size);
        setNewCommentListLength(size);
        await dbService.doc(`nTweetCollections/${nTweetObj.id}`).update({
            commentList: copyCommentList3,
        });

        // event.target.value = '';
    };

    const onCommentDelete = async (createdAt) => {
        console.log('onCommentDelete: ' + createdAt);
        setNewComment("");
        const copyCommentList =  [...newCommentList];

        const copyCommentList2 = copyCommentList.filter((element) => element.createdAt !== createdAt);
        console.log('onCommentDelete copyCommentList2 : ' + copyCommentList2);
        console.log(copyCommentList2);

        const orderByCreatedAt = (a, b) => b.createdAt - a.createdAt;        
        const copyCommentList3 =  copyCommentList2.sort(orderByCreatedAt);
        setNewCommentList(copyCommentList3);
        const size = copyCommentList3.length;
        console.log('onCommentDelete size: ' + size);
        setNewCommentListLength(size);
        await dbService.doc(`nTweetCollections/${nTweetObj.id}`).update({
            commentList: copyCommentList3,
        });
    };

    const onCommentLike = async (createdAt, commentLikeCount, curCommentObj) => {
        const totalLikesArray = [userObj.email, ...curCommentObj.comlikeArray];
        const checkTotalLikesArray = curCommentObj.comlikeArray.includes(userObj.email);
       
        if (checkTotalLikesArray) {
            const filteredLikesArray = totalLikesArray.filter((value, index) => {
                 return value !== userObj.email;
            });
            const findIndex = newCommentList.findIndex((element) => element.createdAt === createdAt);

            const copyCommentList =  [...newCommentList];
            if(findIndex != -1) {
                copyCommentList[findIndex] = {
                    ...copyCommentList[findIndex], 
                    comlikeArray:filteredLikesArray,
                    isLikeComm: false,
                };
            }
  
            setNewCommentList(copyCommentList);
            await dbService.doc(`nTweetCollections/${nTweetObj.id}`).update({
                commentList: copyCommentList,
            });

            setIsLikeComm(false);
            setIsHeartComm(false);
            return;
        }

        if (isLikeComm === false) { //싫어요 안 누르는 상태
            const findIndex = newCommentList.findIndex((element) => element.createdAt === createdAt);
        
            const copyCommentList =  [...newCommentList];
            console.log('onCommentLike copyCommentList : ' + copyCommentList);
            if(findIndex != -1) {
                copyCommentList[findIndex] = {
                    ...copyCommentList[findIndex], 
                    comlikeArray: [...totalLikesArray, userObj.email],
                    isLikeComm: true,
                };
            }
            console.log('onCommentLike copyCommentList: ' + copyCommentList);
            setNewCommentList(copyCommentList);
            await dbService.doc(`nTweetCollections/${nTweetObj.id}`).update({
                commentList: copyCommentList,
            });
            //setIsLikeComm(true);
        
            setIsHeartComm(true);
        } else if (isLikeComm === true) { //싫어요 눌러진 상태
            //console.log("click like - cancel ")
            //console.log("Like array", nTweetObj.commentList.isLikesComm)
            const filteredLikesArray = totalLikesArray.filter((value, index) => {
                return value !== userObj.email;
            });
            
            const findIndex = newCommentList.findIndex((element) => element.createdAt === createdAt);
            const copyCommentList =  [...newCommentList];
            if(findIndex != -1) {
                copyCommentList[findIndex] = {
                    ...copyCommentList[findIndex], 
                    comlikeArray:filteredLikesArray,
                    isLikeComm: false,
                };
            }
            //console.log('onCommentLike copyCommentList: ' + copyCommentList);
            setNewCommentList(copyCommentList);
            await dbService.doc(`nTweetCollections/${nTweetObj.id}`).update({
                commentList: copyCommentList,
            });
            //setIsLikeComm(false);
            setIsHeartComm(false);   
        }
        setIsLikeComm(!isLikeComm);
    } 

    const onCommentDisLike = async (createdAt, commentdisLikeCount, curCommentObj) => {
        const totalDisLikesArray = [userObj.email, ...curCommentObj.comdislikeArray];
        const checkTotalDisLikesArray = curCommentObj.comdislikeArray.includes(userObj.email);
        
        if (checkTotalDisLikesArray) {
            const filteredDisLikesArray = totalDisLikesArray.filter((value, index) => {
                 return value !== userObj.email;
            });
            const findIndex = newCommentList.findIndex((element) => element.createdAt === createdAt);

            const copyCommentList =  [...newCommentList];
            if(findIndex != -1) {
                copyCommentList[findIndex] = {
                    ...copyCommentList[findIndex], 
                    comdislikeArray:filteredDisLikesArray,
                    isdisLikeComm: false,
                };
            }
  
            setNewCommentList(copyCommentList);
            await dbService.doc(`nTweetCollections/${nTweetObj.id}`).update({
                commentList: copyCommentList,
            });

            setIsDisLikeComm(false);
            setIsDisHeartComm(false);
            return;
        }

        if (isDisLikeComm === false) { //싫어요 안 누르는 상태
            console.log("click unlick ")
            const findIndex = newCommentList.findIndex((element) => element.createdAt === createdAt);
        
            const copyCommentList =  [...newCommentList];
            console.log('onCommentdisLike copyCommentList : ' + copyCommentList);
            if(findIndex != -1) {
                copyCommentList[findIndex] = {
                    ...copyCommentList[findIndex], 
                    comdislikeArray: [...totalDisLikesArray, userObj.email],
                    isdisLikeComm: true,
                };
            }
            console.log('onCommentDisLike copyCommentList: ' + copyCommentList);
            setNewCommentList(copyCommentList);
            await dbService.doc(`nTweetCollections/${nTweetObj.id}`).update({
                commentList: copyCommentList,
            });
            //setIsDisLikeComm(true);
        
            setIsDisHeartComm(true);
        } else if (isDisLikeComm === true) { //싫어요 눌러진 상태
            //console.log("click Dislike - cancel ")
            //console.log("Like array", nTweetObj.commentList.isdisLikesComm)
            const filteredDisLikesArray = totalDisLikesArray.filter((value, index) => {
                return value !== userObj.email;
            });
            
            const findIndex = newCommentList.findIndex((element) => element.createdAt === createdAt);
            const copyCommentList =  [...newCommentList];
            if(findIndex != -1) {
                copyCommentList[findIndex] = {
                    ...copyCommentList[findIndex], 
                    comdislikeArray:filteredDisLikesArray,
                    isdisLikeComm: false,
                };
            }
            //console.log('onCommentDisLike copyCommentList: ' + copyCommentList);
            setNewCommentList(copyCommentList);
            await dbService.doc(`nTweetCollections/${nTweetObj.id}`).update({
                commentList: copyCommentList,
            });
            //setIsDisLikeComm(false);
            setIsDisHeartComm(false);
            //console.log("length : ",nTweetObj.commentList.comdislikeArray.length )            
            //setlikeCount(likeCount -1)
        }
        setIsDisLikeComm(!isDisLikeComm);
    }
    
    const commentDisplayObj =  (commentElement) => {
        const copyNTweetUsersInfoObj =  [...nTweetUsersInfoObj];
        console.log('commentDisplayObj copyNTweetUsersInfoObj: ' + copyNTweetUsersInfoObj);
        console.log(copyNTweetUsersInfoObj);
        console.log('commentDisplayObj commentElement.creatorId: ' + commentElement.creatorId);
        console.log('commentDisplayObj commentElement.uid: ' + commentElement.uid);
        console.log('commentDisplayObj commentElement.email: ' + commentElement.email);
        const copyNTweetUsersInfoObj2 = copyNTweetUsersInfoObj.filter((element) => element.uid === commentElement.creatorId);
        // const copyNTweetUsersInfoObj2 = copyNTweetUsersInfoObj.filter((element) => element.uid === nTweetElement.uid);
        // const copyNTweetUsersInfoObj2 = copyNTweetUsersInfoObj.filter((element) => element.email === nTweetElement.email);
        console.log('commentDisplayObj copyNTweetUsersInfoObj2.length: ' + copyNTweetUsersInfoObj2.length);
        console.log(copyNTweetUsersInfoObj2);
        if (copyNTweetUsersInfoObj2.length > 0) {
            console.log('commentDisplayObj Found: TRUE');
            return ({
                    displayName: copyNTweetUsersInfoObj2[0].displayName,
                    email: copyNTweetUsersInfoObj2[0].email,
                    uid: copyNTweetUsersInfoObj2[0].uid,
                    photoURL: copyNTweetUsersInfoObj2[0].photoURL,
            });
        } else {
            console.log('commentDisplayObj Found: FALSE');
            return ({
                displayName: commentElement.name,
                email: commentElement.email,
                uid: commentElement.creatorId,
                photoURL: null,
        });
        }
    };

    return (
        <div>
            <div className="nweet">
                {editing ? (
                    <>
                    <div className="nweet-edit">
                        <form onSubmit={onEditUpdate} className="nweet-edit-form">
                            <input
                                className="edit-input-title"
                                type="text"
                                placeholder="Title"
                                value={newTitle}
                                onChange={onTitleChange}
                                maxLength={60}
                                autoFocus
                                // ref={editInputFocus}
                            />
                            <textarea
                                className="edit-input-context"
                                rows='10'
                                cols='80'
                                value={newNContext}
                                onChange={onContextChange}
                                placeholder="Edit your Context"
                                // autoFocus
                            />
                            {newAttachment === "" || newAttachment === null ? (
                                <div className="nweet-editForm__container">
                                    <div className="nweet-editForm__attachment">
                                        <label for="add-attach-file" className="nweet-editForm__label">
                                            <span>Add Photo</span>
                                            <FontAwesomeIcon icon={faPlus} />
                                        </label>
                                        <input
                                            id="add-attach-file"
                                            type="file"
                                            accept="image/*"
                                            onChange={onFileChange}
                                            style={{
                                            opacity: 0,
                                            }}
                                        />
                                    </div>
                                </div>
                            ) : (
                                <div className="nweet-editForm__container">
                                    <div className="nweet-editForm__attachment">
                                        <label for="change-attach-file" className="nweet-editForm__label">
                                            <span>Change Photo</span>
                                            <FontAwesomeIcon icon={faPlus} />
                                        </label>
                                        <input
                                            id="change-attach-file"
                                            type="file"
                                            accept="image/*"
                                            onChange={onFileChange}
                                            style={{
                                            opacity: 0,
                                            }}
                                        />
                                        <img
                                            src={newAttachment}
                                            style={{
                                            backgroundImage: newAttachment,
                                            }}
                                        />
                                        <div className="nweet-editForm-clear" onClick={onClearAttachment}>
                                            <span>Remove</span>
                                            <FontAwesomeIcon icon={faTimes} />
                                        </div>
                                    </div>
                                </div>
                            )}
                            <input type="submit" value="Update Context" className="nweet-edit-form-update" />
                        </form>
                        <div onClick={onEditCancelSubmit} 
                            className="nweet-edit-form-cancelBtn">
                            Cancel
                        </div>
                    </div>
                    </>
                ) : (
                    <>
                    <div className="nweet-noedit">
                        <div className="nweet-user-img">
                            {isOwner && (userObj.photoURL !== '') && (userObj.photoURL !== null) ? ( 
                                    <span>
                                        <img className="nav-profile-icon-container-img" 
                                            src={userObj.photoURL}
                                            style={{
                                                backgroundImage: userObj.photoURL,
                                            }}
                                        />
                                    </span>                                 
                                ) : (
                                    (displayObj.photoURL !== '') && (displayObj.photoURL !== null) ? ( 
                                        <span>
                                        <img className="nav-profile-icon-container-img" 
                                            src={displayObj.photoURL}
                                            style={{
                                                backgroundImage: displayObj.photoURL,
                                            }}
                                        />
                                        </span>   
                                    ) : (
                                        <span>
                                        <FontAwesomeIcon icon={faUser}  size="1x" />
                                        </span> 
                                    )
                                )
                            }
                        </div>
                        <div className="nweet-user-name">
                            {isOwner ? (
                                    <span style={{ color: 'rgb(73, 9, 194)', fontWeight: '800'}}>
                                        {userObj.displayName}
                                    </span>
                                ) : (
                                    <span>
                                        {displayObj.displayName}
                                    </span>
                                )
                            }
                        </div>
                        {isOwner && (
                            <div className="nweet-top-actions">
                                <span onClick={onDeleteClick}>
                                <FontAwesomeIcon icon={faTrash} />
                                </span>
                                <span onClick={onEditClick}>
                                <FontAwesomeIcon icon={faPencilAlt} />
                                </span>
                            </div>
                        )}
                        <div className="nweet-title">{newTitle}</div>
                        {/* <h4 className="nweet-h4">{newNContext}</h4> */}
                        <div className="nweet-context">{newNContext}</div>
                        <div>
                            {newAttachment && (
                                <img src={newAttachment} className="nweet-img"/>
                            )}
                        </div>

                        <div className="nweet-bottom-likes">
                            <span onClick={onLikeClick}>
                            {/* <FontAwesomeIcon icon={isHeart ? faThumbsUp : faThumbsDown} size="1x"/> */}
                            <FontAwesomeIcon icon={faThumbsUp} size="1x"/>
                            </span>
                            <span className="nweet-bottom-like-color">
                            {newLikeCount}
                            </span>
                            <span onClick={onDisLikeClick}  className="nweet-bottom-likes-space">
                            <FontAwesomeIcon icon={faThumbsDown} size="1x"/>
                            </span>
                            <span>
                            {newDisLikeCount}
                            </span>
                        </div>
                        <div className="nweet-bottom-add">
                            <span onClick={onCommentClick}>
                            <FontAwesomeIcon icon={faCommentDots} size="1x"/>
                            </span>
                            <span>
                            {newCommentListLength}
                            </span>
                        </div>
                    </div>
                    </>
                )}
            </div>
            {isShowComment && (
                <div className="comment-area" >
                    <div className="comment-edit">
                        <div className="nweet-comment-user-img">
                            { (userObj.photoURL !== '') && (userObj.photoURL !== null) ? (
                                    <span>
                                        <img className="comment-profile-icon-container-img" 
                                            src={userObj.photoURL}
                                            style={{
                                                backgroundImage: userObj.photoURL,
                                            }}
                                        />
                                    </span> 
                                ) : (
                                    <span className="comment-profile-icon-container-img">
                                    <FontAwesomeIcon icon={faUser} color={"#04AAFF"} />
                                    </span> 
                                )
                            }
                        </div>  
                        <div className="nweet-comment-user-name">
                            <span >
                                {userObj.displayName}
                            </span>
                        </div>        
                        <input
                            className="comment-edit-input"
                            type="text"
                            placeholder="Please write a comment"
                            value={newComment}
                            onChange={onCommentChange}
                            maxLength={60}
                            ref={commentEditInputFocus}
                        />
                        <div className="comment-edit-bottom-add">
                            <span onClick={onCommentAdd}>
                            <FontAwesomeIcon icon={faSquarePlus} size="1x"/>
                            </span>
                        </div>
                    </div>
                    { (newCommentListLength > 0) &&
                        <div className="comment-edit-bottom-line">
                        </div>
                    }
                    <div className="comment-display">
                        {newCommentList.map((commentElement) => (
                            <EachComment
                                // key={element.id}
                                userObj={userObj}
                                nTweetObj={nTweetObj}
                                curCommentObj={commentElement}
                                isCommentOwner={commentElement.creatorId === userObj.uid}
                                displayObj={commentDisplayObj(commentElement)}
                                onCommentDelete={onCommentDelete}
                                onCommentLike={onCommentLike}
                                onCommentDisLike={onCommentDisLike}
                            />
                        ))}      
                    </div>          
                </div>
            )}
        </div> 
    );
};
export default NTweet;