import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import "./SelectBox.scss";

export default function SelectBox() {
  const CURRENT_PAGE = ["전체보기", "북마크보기"];
  const VS_CURRENCY = ["KRW 보기", "USD 보기"];
  const PER_PAGE = ["50개 보기", "30개 보기", "10개 보기"];

  const history = useHistory();

  const handlePage = (e) => {
    e.target.value === "북마크보기"
      ? history.push("bookmark")
      : history.push("currencylist");
  };

  return (
    <nav className="SelectBox">
      <select className="selectType" onChange={(e) => handlePage(e)}>
        {CURRENT_PAGE.map((el, idx) => (
          <option key={idx}>{el}</option>
        ))}
      </select>
      <select className="selectType">
        {VS_CURRENCY.map((el, idx) => (
          <option key={idx}>{el}</option>
        ))}
      </select>
      <select className="selectType">
        {PER_PAGE.map((el, idx) => (
          <option key={idx}>{el}</option>
        ))}
      </select>
    </nav>
  );
}
