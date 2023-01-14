import React from 'react'
import './login.scss'
import {useState,useRef} from 'react';

export default function Login() {
  return (
    <div className="login">
        <div className="top">
            <div className="wrapper">
        <img className="logo" 
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1198px-Netflix_2015_logo.svg.png?20190206123158"
        alt="" />
        </div>
        </div>
            <div className="container">
                <form>
                    <h1>Sign In</h1>
                    <input type="email" placeholder='Email or phone' />
                    <input type="password" placeholder='password' />
                    <button className="loginBUtton">Sign Up</button>
                    <span>New to Netflix? <b>Sign Up now. </b></span>
                    <small>
                        This page is protected by Google reCAPTCHA to ensure
                        you're not a bot.<b>Learn More</b>
                    </small>
                </form>
            </div>
        </div>
  )
}
