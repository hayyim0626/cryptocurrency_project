import React, { useState, useEffect } from "react";
import "./SelectBox.scss";

export default function SelectBox() {
  const SELECT_BOX = [
    { 0: "전체보기 ∧", 1: "북마크보기 ∧" },
    { 0: "KRW 보기 ∧", 1: "USD 보기 ∧" },
    { 0: "50개 보기 ∧", 1: "30개 보기 ∧", 2: "10개 보기 ∧" },
  ];
  const [isClicked, setIsClicked] = useState(false);
  const clickBtn = (id) => {};
  return (
    <nav className="SelectBox">
      {SELECT_BOX.map((el, idx) => (
        <button
          key={idx}
          id={idx}
          className={isClicked ? "isClicked" : "notClicked"}
          onClick={(e) => clickBtn(e.target.id)}
        >
          {el[0]}
        </button>
      ))}
    </nav>
  );
}
