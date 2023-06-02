import React from "react";
import { loginEndpoint } from "../spotify";
import "../screen_css/login.css";
import symbol from '../symbol.webp';

export default function Login() {
  return (
    <div className="login-page">
      <img
        src={symbol}
        alt="logo-SoundWave"
        className="logo"
      />
      <p className="login-heading">SoundWave</p>
      <a href={loginEndpoint}>
        <div className="login-btn">LOG IN</div>
      </a>
      <p>By</p>
      <p className="login-name">Boyapati Shree Harsha</p>
    </div>
  );
}