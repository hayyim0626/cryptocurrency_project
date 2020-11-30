import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Currency from "./Component/Currency/Currency";
import CurrencyInfoBox from "../../Components/CurrencyInfoBox/CurrencyInfoBox";
import "./CurrencyList.scss";
import SelectBox from "./Component/SelectBox/SelectBox";

export default function CurrencyList() {
  const VS_CURRENCY = ["krw", "usd"];
  const PER_PAGE = [10, 30, 50];
  const [data, setData] = useState([]);

  const getApiData = async (vsCurrency, perPage) => {
    try {
      const basicUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=krw&per_page=50&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d`;
      const response = await axios.get(basicUrl);
      const data = response.data.map((el) => ({
        name: el.name,
        symbol: el.symbol.toUpperCase(),
        price: el.current_price.toLocaleString("ko-KR", {
          style: "currency",
          currency: "KRW",
          maximumFractionDigits: 2,
        }),
        hourPer: el.price_change_percentage_1h_in_currency.toFixed(1),
        dayPer: el.price_change_percentage_24h_in_currency.toFixed(1),
        weekPer: el.price_change_percentage_7d_in_currency.toFixed(1),
        volume: el.total_volume.toLocaleString("ko-KR", {
          style: "currency",
          currency: "KRW",
        }),
        rank: el.market_cap_rank,
        isClicked: false,
      }));
      setData(data.sort((a, b) => a.rank - b.rank));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => getApiData(), []);

  return (
    <div className="CurrencyList">
      <h3 className="lists">
        <div className="priceList">가상자산 시세 목록</div>
        <Link className="bookMarkList" to="/bookmark">
          북마크 목록
        </Link>
      </h3>
      <SelectBox />
      <CurrencyInfoBox />
      <Currency data={data} />
      <div className="moreCurrency">+더보기</div>
    </div>
  );
}
