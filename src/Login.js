import React, { useContext, useRef, useState } from "react"
import Header from "./component/header";
import { useNavigate } from "react-router-dom";
import AuthContext from "./context/AuthProvider";
import axios from 'axios';
import Cookies from 'js-cookie';

import "./style/Login.css"

export default function Login() {

    const nav = useNavigate()
    const errRef = useRef();
    const { auth, setAuth } = useContext(AuthContext);
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);
    const [values, setValues] = useState({ email: "", password: "" });

    const URL = "http://51.178.83.139/api"

    const axiosInstance = axios.create({
        baseURL: URL
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { email, password } = values
            const response = await axiosInstance.post('login',
                JSON.stringify({ email, password }),
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            console.log('data :', JSON.stringify(response?.data));
            setAuth(response?.data);
            localStorage.setItem("user", JSON.stringify(response?.data))
            Cookies.set('auth', response?.data.id);
            setSuccess(true);
            nav('/')
            console.log(auth);
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    }

    return (
        <div className="register">
            <Header />
            { success && <h1>LOGGED</h1> }
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <div className="form">
                <div className="form-block">
                    <p className="label">Email</p>
                    <input onChange={e => { setValues({ ...values, email: e.target.value }) }} type="email" id="email" name="email" placeholder="Email" />
                </div>
                <div className="form-block">
                    <p className="label">Mot de passe</p>
                    <input onChange={e => { setValues({ ...values, password: e.target.value }) }} type="password" id="password" name="password" placeholder="Mot de passe" />
                </div>
                <input className="submit" type="button" value="Se connecter" onClick={handleSubmit}/>
            </div>
        </div>
    );
}