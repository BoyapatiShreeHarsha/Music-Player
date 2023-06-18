import React from "react";
import { loginEndpoint } from "../spotify";
import "../screen_css/login.css";
import symbol from '../shared/images/symbol.webp';

export default function Login() {
  return (
    <div className="login-page">
      <div className="login-heading flex">
      <img
        src={symbol}
        alt="logo-SoundWave"
        className="logo"
      />
      <p>SoundWave</p>
      </div>
      <div className="login-card">
        <p>If you are not registered in Database</p>
        <p>Kindly use the guest account</p>
        <div className="login-card-subpart">
          <p>Email: ghostforproject@gmail.com</p>
          <p>Password: Ghost_2001</p>
        </div>
      </div>
      <a href={loginEndpoint}>
        <div className="login-btn">LOG IN</div>
      </a>
      <div className="login-name">
      <p>By</p>
      <p >Boyapati Shree Harsha</p>
      </div>
      <footer className="login-error">&#42;In case of access key timeout,Please clear your LocalStorage and reload the page</footer>
    </div>
  );
}