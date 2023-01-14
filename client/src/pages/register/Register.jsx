import React from 'react'
import './register.scss'
import {useState,useRef} from 'react';

export default function Register() {
    const [email,setEmail]=useState();
    const [password,setPassword]=useState();

    const emailRef=useRef();
    const passwordRef=useRef();

    const handleStart=()=>{
        setEmail(emailRef.current.value);
    }

    const handleFinish=()=>{
        setPassword(passwordRef.current.value);
    }
  return (
    <div className="register">
        <div className="top">
            <div className="wrapper">
        <img className="logo" 
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1198px-Netflix_2015_logo.svg.png?20190206123158"
        alt="" />
        <button className="loginButton">Sign In</button>
        </div>
        </div>
        <div className="container">
            <h1>Unlimited Movies, TV shows, and more.</h1>
            <h2>Watch anywhere.Cancel anytime.</h2>
            <p>
                Ready to watch? Enter your email to create 
                or restart your membership.
            </p>
            {!email ? (

            <div className="input">
                <input type="email" ref={emailRef} placeholder='email address'/>
                <button className="registerButton" onClick={handleStart}>Get Started</button>
            </div>
            ):( 
            <form action="" className="input">
            <input type="password" ref={passwordRef} placeholder='password'/>
            <button className="registerButton" onClick={handleFinish}>Start
            </button>
            </form>


            )
            }
        </div>
        </div>
  )
}
