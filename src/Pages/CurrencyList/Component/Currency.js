import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Currency.scss";

export default function Currency({ data }) {
  const [isClicked, setisClicked] = useState([]);

  const handleClick = (idx) => {
    const currencyNum = idx + 1;
    if (isClicked.includes(currencyNum)) {
      isClicked.splice(isClicked.indexOf(currencyNum), 1);
      return setisClicked([...isClicked]);
    } else {
      return setisClicked([...isClicked, currencyNum]);
    }
  };

  return (
    <>
      {data.map((el, idx) => {
        return (
          <ul className="currency" key={idx}>
            <button
              className={isClicked.includes(idx + 1) ? "star isClicked" : "star"}
              onClick={() => handleClick(idx)}
            >
              ★
            </button>
            <li className="name">{el.name}</li>
            <li className="symbol">{el.symbol}</li>
            <li className="price">{el.price}</li>
            <li className={el.hourPer.includes("-") ? "minusPer" : "plusPer"}>
              {el.hourPer}%
            </li>
            <li className={el.dayPer.includes("-") ? "minusPer" : "plusPer"}>
              {el.dayPer}%
            </li>
            <li className={el.weekPer.includes("-") ? "minusPer" : "plusPer"}>
              {el.weekPer}%
            </li>
            <li className="volume">{el.volume}</li>
          </ul>
        );
      })}
    </>
  );
}

// onclick 이벤트 함수
//(e) => {if (e.target.id !== data.name) return; setApiData([...data, {...el, isClicked: true}])}
