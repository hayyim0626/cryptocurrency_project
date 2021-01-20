import React from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
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
        <Link to="/" className="priceList">
          가상자산 시세 목록
        </Link>
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
            <Link className="name" to={`/currencydetail/${data.id}`}>
              {data.name}
            </Link>
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
            <li className="volume">
              {data.vsCurrency === "krw"
                ? data.volume.toLocaleString("ko-KR", {
                    style: "currency",
                    currency: "KRW",
                  })
                : data.volume.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
            </li>
          </ul>
        ))}
    </div>
  );
}
