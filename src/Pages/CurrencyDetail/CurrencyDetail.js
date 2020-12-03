import React, { useState, useEffect } from "react";
import "./CurrencyDetail.scss";
import axios from "axios";

export default function CurrencyDetail() {
  const [currencyData, setCurrencyData] = useState([]);
  console.log(currencyData);
  const getApiData = async () => {
    try {
      const basicUrl = `https://api.coingecko.com/api/v3/coins/bitcoin`;
      const response = await axios.get(basicUrl);
      const apiData = response.data.map((el) => ({
        id: el.id,
        name: el.name,
        symbol: el.symbol.toUpperCase(),
        image: el.image.small,
        rank: el.market_cap_rank,
        website: el.links.homepage[0],
        price: el.market_data.current_price,
        market_cap: el.market_cap,
        total_volume: el.total_volume,
        description: el.description,
      }));
      setCurrencyData(apiData);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getApiData();
  }, []);
  return <div>hello World</div>;
}
