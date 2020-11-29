import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ProductList.scss";

export default function PriceList() {
  const PRODUCT_INFO = ["자산", "Price", "1H", "24H", "7D", "24H Volume"];
  const VS_CURRENCY = ["krw", "usd"];
  const PER_PAGE = [10, 30, 50];
  const SELECT_BOX = [
    { 0: "전체보기 ∧", 1: "북마크보기 ∧" },
    { 0: "KRW 보기 ∧", 1: "USD 보기 ∧" },
    { 0: "50개 보기 ∧", 1: "30개 보기 ∧", 2: "10개 보기 ∧" },
  ];
  const [data, setData] = useState([]);
  const [isClicked, setIsClicked] = useState(false);
  const clickBtn = (e, idx) => {
    e.target.id !== SELECT_BOX[idx] ? setIsClicked(isClicked) : setIsClicked(!isClicked)
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getApiData = async (vsCurrency, perPage) => {
    try {
      const basicUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=krw&per_page=50&page=1&sparkline=false&price_change_percentage='1h%2C%2024%2C%207d'`;
      const response = await axios.get(basicUrl);
      const data = response.data.map((el) => ({
        name: el.name,
        symbol: el.symbol.toUpperCase(),
        price: el.current_price.toLocaleString("ko-KR", {
          style: "currency",
          currency: "KRW",
        }),
        // hourPer: el.price_change_percentage_1h_in_currency.toFixed(1),
        dayPer: el.price_change_percentage_24h.toFixed(1),
        volume: el.total_volume.toLocaleString("ko-KR", {
          style: "currency",
          currency: "KRW",
        }),
        rank: el.market_cap_rank,
      }));
      setData(data.sort((a, b) => a.rank - b.rank));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => getApiData(), []);
  console.log(data);
  return (
    <div className="ProductList">
      <h3 className="lists">
        <div className="priceList">가상자산 시세 목록</div>
        <div className="bookMarkList">북마크 목록</div>
      </h3>
      <nav className="selectBox">
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
      <div className="productInfoBox">
        {PRODUCT_INFO.map((el, idx) => (
          <div key={idx}>{el}</div>
        ))}
      </div>
      <div>
        {data.map((el, idx) => {
          return (
            //별 만들기
            <ul className="currency" key={idx}>
              <li className="name">{el.name}</li>
              <li className="symbol">{el.symbol}</li>
              <li className="price">{el.price}</li>
              <li
                className={
                  el.dayPer.includes("-") ? "dayperMinus" : "dayperPlus"
                }
              >
                {el.dayPer}%
              </li>
              <li className="volume">{el.volume}</li>
            </ul>
          );
        })}
      </div>
      <div className="moreCurrency">+더보기</div>
    </div>
  );
}
