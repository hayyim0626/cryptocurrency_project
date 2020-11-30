import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CurrencyInfoBox from "../../Components/CurrencyInfoBox/CurrencyInfoBox";
import "./Bookmark.scss";

export default function Bookmark() {
  return (
    <div className="Bookmark">
      <h3 className="lists">
        <Link to='currencylist' className="priceList">가상자산 시세 목록</Link>
        <div className="bookMarkList">북마크 목록</div>
      </h3>
      <CurrencyInfoBox />
    </div>
  );
}
