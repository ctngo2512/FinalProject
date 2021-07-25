import React from 'react';
import loginImg from "./loginImg.png";
import {Button} from 'react-bootstrap';

//login page
const Login = (props) => {

    const { 
        email, 
        setEmail, 
        password, 
        setPassword, 
        handleLogin, 
        handleSignup, 
        hasAccount, 
        setHasAccount, 
        emailError, 
        passwordError, 
       // user,
        clearErrors } = props;

    return (
        <section className="login">
            <div className="loginContainer">
                <div className="image">
                    <img src={loginImg}/>
                </div>
                <label>Username</label>
                <input className="email" type="text" onClick = {clearErrors} autoFocus required value={email} onChange={(e) => setEmail(e.target.value)} />
                <p className="errorMsg">{emailError}</p>
                <label>Password</label>
                <input className="password" type="password" required value = {password} onChange={(e) => setPassword(e.target.value)} />
                <p className="errorMsg">{passwordError}</p>
                <div className="btnContainer">
                    {hasAccount ? (
                        //if has account, sign in
                        <>
                        <Button onClick={handleLogin}>Sign In</Button>
                        <p>Don't have an account? 
                            <span onClick={() => setHasAccount(!hasAccount)}>Sign Up</span></p>
                        </>
                    ) : (
                        //if doesn't have account, sign up
                        <>
                        <Button onClick={handleSignup}>Sign Up</Button>
                        <p>Have an account? 
                            <span onClick={() => setHasAccount(!hasAccount)}>Sign In</span></p>
                        </>
                    )}
                </div>
            </div>
        </section>
    )
}

export default Login;
