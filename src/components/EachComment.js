import { dbService, storageService } from "fbase";
import React, { useEffect, useState } from "react";
// https://fontawesome.com/icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt, faUser} from "@fortawesome/free-solid-svg-icons";
// import { faThumbsUp, faThumbsDown } from "@fortawesome/free-light-svg-icons";
import { faThumbsUp, faThumbsDown, faCommentDots } from "@fortawesome/free-regular-svg-icons";

import styled, { css } from 'styled-components';
import './EachComment.css';

const EachComment = ( {userObj, nTweetObj, curCommentObj, isCommentOwner, displayObj, onCommentDelete, onCommentLike, onCommentDisLike} ) => {
    // console.log("EachComment key: " + key);
    console.log("nTweetObj id: " + nTweetObj.id);
    console.log(curCommentObj);
    console.log("curCommentObj id: " + curCommentObj.id);
    console.log("curCommentObj createdAt: " + curCommentObj.createdAt);
    console.log("curCommentObj likeCount: " + curCommentObj.likeCount + " DisLikeCount: " + curCommentObj.disLikeCount );
    console.log(nTweetObj);
    console.log("isCommentOwner: " + isCommentOwner);

    console.log("displayObj.displayName: " + displayObj.displayName);
    console.log(displayObj);

    const [newCommentLikeCount, setNewCommentLikeCount] = useState(curCommentObj.likeCount);
    const [newCommentDisLikeCount, setNewCommentDisLikeCount] = useState(curCommentObj.disLikeCount); 
    console.log("newCommentLikeCount: " + newCommentLikeCount + " newCommentDisLikeCount: " + newCommentDisLikeCount);

    useEffect(() => {
        console.log('[curCommentObj.likeCount] likeCount ' + curCommentObj.likeCount, " " + newCommentLikeCount);
        if (curCommentObj.likeCount !== newCommentLikeCount) {
            setNewCommentLikeCount(curCommentObj.likeCount);            
        }
    }, [curCommentObj.likeCount]);

    useEffect(() => {
        console.log('useEffect Dislike curCommentObj.disLikeCount] disLikeCount ' + curCommentObj.disLikeCount, " " + newCommentDisLikeCount);
        if (curCommentObj.disLikeCount !== newCommentDisLikeCount) {
            
            setNewCommentDisLikeCount(curCommentObj.comdislikeArray.length/2);            
        }
    }, [curCommentObj.dislikeCount]);


    const onDeleteClick = async () => {
        console.log('onDeleteClick createdAt : ' + curCommentObj.createdAt);
        const ok = window.confirm("Are you sure you want to delete this nweet?");
        console.log('onDeleteClick ok : ' + ok);
        if(ok){
            //delete
            onCommentDelete(curCommentObj.createdAt);
        }
    };

    const onLikeClick = async (event) => {
        // const ok = window.confirm("Are you sure you want to delete this nweet?");
        console.log('onLikeClick createdAt : ' + curCommentObj.createdAt);
        console.log('onLikeClick: ' + newCommentLikeCount);
        event.preventDefault();
        //onCommentLike(curCommentObj.createdAt, newCommentLikeCount + 1);
        //setNewCommentLikeCount(newCommentLikeCount + 1);
        onCommentLike(curCommentObj.createdAt, newCommentLikeCount + 1, curCommentObj);
        setNewCommentLikeCount(curCommentObj.comlikeArray.length);
    };

    const onDisLikeClick = async (event) => {
        console.log('onDisLikeClick createdAt : ' + curCommentObj.createdAt);
        console.log('onDisLikeClick: ' + newCommentDisLikeCount);
        event.preventDefault();
        onCommentDisLike(curCommentObj.createdAt, newCommentDisLikeCount + 1, curCommentObj);
        setNewCommentDisLikeCount(curCommentObj.comdislikeArray.length);
    };

    return (
        <div>
            <div className="eachcomment">
                <div className="eachcomment-image">
                    {isCommentOwner &&  (userObj.photoURL !== '') && (userObj.photoURL !== null) ? (
                            <span>
                                <img className="comment-profile-icon-container-img" 
                                    src={userObj.photoURL}
                                    style={{
                                        backgroundImage: userObj.photoURL,
                                    }}
                                />
                            </span>                                 
                        ) : (
                            (displayObj.photoURL !== '') && (displayObj.photoURL !== null) ? ( 
                                <span>
                                    <img className="comment-profile-icon-container-img" 
                                        src={displayObj.photoURL}
                                        style={{
                                            backgroundImage: displayObj.photoURL,
                                        }}
                                    />
                                </span> 
                            ) : (
                                <span>
                                <FontAwesomeIcon icon={faUser} color={"#04AAFF"} size="1x" />
                                </span> 
                            )
                        )
                    }
                </div>  
                <span className="eachcomment-name">
                    { isCommentOwner ? (
                        <span className="eachcomment-user-owner-name">
                            {userObj.displayName}
                        </span>
                        ) : (
                        <span className="eachcomment-user-name">
                        {/* {curCommentObj.name} */}
                            {displayObj.displayName}
                        </span>
                        )
                    }
                </span>
                {isCommentOwner && (
                    <div className="eachcomment-top-actions">
                        <span onClick={onDeleteClick}>
                        <FontAwesomeIcon icon={faTrash} />
                        </span>
                    </div>
                )}
                <span className="eachcomment-context">
                    {curCommentObj.context}
                </span>
                <div className="eachcomment-bottom-likes">
                    <span onClick={onLikeClick}>
                    <FontAwesomeIcon icon={faThumbsUp} size="1x"/>
                    </span>
                    <span className="eachcomment-bottom-like-color">
                        {curCommentObj.comlikeArray.length/2}
                    </span>
                    <span onClick={onDisLikeClick}  className="eachcomment-bottom-likes-space">
                    <FontAwesomeIcon icon={faThumbsDown} size="1x"/>
                    </span>
                    <span>
                        {curCommentObj.comdislikeArray.length/2}
                    </span>
                </div>
            </div>
        </div> 
    );
};
export default EachComment;