import React from "react";
import loadingImg from "../../Img/giphy.gif";
import "./Loader.scss";

export default function Loader() {
  return (
    <div className="Loader">
      <img alt="laoding Img" src={loadingImg} className="loadImg" />
      <div className="loadText">로딩중입니다. 잠시만 기다려주세요.</div>
    </div>
  );
}
