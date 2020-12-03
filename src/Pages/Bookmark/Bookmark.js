import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import CurrencyInfoBox from "../../Components/CurrencyInfoBox/CurrencyInfoBox";
import { useSelector, useDispatch } from "react-redux";
import { deleteCurrency } from "../../Store/actions/";
import "./Bookmark.scss";

export default function Bookmark() {
  const state = useSelector((store) => store.currencyReducer);
  const dispatch = useDispatch();

  const handleClick = (idx) => {
    const currency = state.filter((_, i) => i !== idx);
    dispatch(deleteCurrency(currency));
    toast.info("북마크가 해제되었습니다", {
      position: "top-right",
      autoClose: 1500,
    });
  };

  return (
    <div className="Bookmark">
      <h3 className="lists">
        <div className="priceList">가상자산 시세 목록</div>
        <div className="bookMarkList">북마크 목록</div>
      </h3>
      <CurrencyInfoBox />
      {state
        .sort((a, b) => a.rank - b.rank)
        .map((data, idx) => (
          <ul className="currency" key={idx}>
            <button
              className={state.includes(data) ? "star isClicked" : "star"}
              onClick={() => handleClick(idx)}
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
        ))}
    </div>
  );
}
