import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Currency.scss";

export default function Currency({ apiData }) {
  const [selectCurrency, setSelectCurrency] = useState([]);
  // const handleClick = (idx) => {
  //   if (selectCurrency.includes(apiData[idx])) {
  //     selectCurrency.splice(selectCurrency.indexOf(apiData[idx]), 1);
  //     return setSelectCurrency([...selectCurrency]);
  //   } else {
  //     setSelectCurrency([...selectCurrency, apiData[idx]]);
  //   }
  //   // saveLocalStorage(idx);  여기서부터 다시 시작하기
  // };
  return (
    <>
      {apiData.map((data, idx) => {
        return (
          <ul className="currency" key={idx}>
            <button
              className={
                selectCurrency.includes(data) ? "star isClicked" : "star"
              }
              // onClick={() => handleClick(idx)}
            >
              ★
            </button>
            <li className="name">{data.name}</li>
            <li className="symbol">{data.symbol}</li>
            <li className="price">{data.price}</li>
            <li className={data.hourPer.includes("-") ? "minusPer" : "plusPer"}>
              {data.hourPer}%
            </li>
            <li className={data.dayPer.includes("-") ? "minusPer" : "plusPer"}>
              {data.dayPer}%
            </li>
            <li className={data.weekPer.includes("-") ? "minusPer" : "plusPer"}>
              {data.weekPer}%
            </li>
            <li className="volume">{data.volume}</li>
          </ul>
        );
      })}
    </>
  );
}
