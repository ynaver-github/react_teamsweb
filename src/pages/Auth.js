import React from "react";
import { useEffect, useState, useCallback, useRef } from "react";
import { authService, firebaseInstance } from "fbase";
// https://fontawesome.com/icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faGoogle,
  faGithub,
  faSqureGithub,
  faSquareFacebook,
  faFacebook,
} from "@fortawesome/free-brands-svg-icons";
import {
    faUsersRectangle,
} from "@fortawesome/free-solid-svg-icons";

import styled, { css } from 'styled-components';
import './Auth.css';

import lglogo from 'assets/img/lg.jpg';

import AuthForm from "components/AuthForm";

const Auth = () => {
    console.log("Start: ");
    useEffect(() => {
        const showTopBtnOnBottom = () => {
            if (window.pageYOffset > 100) {
                console.log(window.pageYOffset);
            } else {
                console.log(window.pageYOffset);
            }
        };
        window.addEventListener("scroll", showTopBtnOnBottom);

        window.addEventListener('message', function(event) {
            console.log(event);
            try {
              event = JSON.parse(event)
            } catch(e) {
              return
            }
            console.log(event.type);
            if(event.type === 'facebookLogin') {
              // cool! now finish your login flow ;)
              
            //   doOtherStuff(event)
            }
          })

        return () => {
            window.removeEventListener("scroll", showTopBtnOnBottom);
        };
    }, []);

    const onSocialClick = async (event) => {
        const { //ES6
            target:{name},
        } = event;
        console.log("name: " + name);
        let provider;
        if (name === "google"){
            provider = new firebaseInstance.auth.GoogleAuthProvider();
        } else if (name === "github"){
            provider = new firebaseInstance.auth.GithubAuthProvider();
        } else if (name === "facebook"){
            console.log("isNative: " + window.isNative);
            // to login react native facebook login
            if(window.isNative) {
                window.postMessage('facebookLoginClicked', '*')
            } else {
                provider = new firebaseInstance.auth.FacebookAuthProvider();
            }
        }
        await authService.signInWithPopup(provider);
    };

    return (
        <div className="auth-conatiner">
            <div className="authContainer">
                <FontAwesomeIcon
                    icon={faUsersRectangle}
                    color={"#04AAFF"}
                    size="3x"
                    style={{ marginBottom: 30 }}
                />
                {/* <img className="authBtns" src={lglogo} alt=""    /> */}
                <AuthForm />
                <div className="authBtnsContainer">
                    <button onClick={onSocialClick} name="google" className="authBtn-google">
                        <FontAwesomeIcon icon={faGoogle} color={"red"} /> Continue with Google
                    </button>
                    <button onClick={onSocialClick} name="github" className="authBtn-github">
                        <FontAwesomeIcon icon={faGithub} color={"blue"} /> Continue with Github
                    </button>
                    <button onClick={onSocialClick} name="facebook" className="authBtn-facebook">
                        <FontAwesomeIcon icon={faFacebook} color={"blue"} size="1x"/> Continue w/ Facebook
                    </button>
                </div>
            </div>
        </div>
    );
};
export default Auth;