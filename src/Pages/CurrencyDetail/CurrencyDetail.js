import React, { useState, useEffect } from "react";
import "./CurrencyDetail.scss";
import axios from "axios";

export default function CurrencyDetail({ match }) {
  const [currencyData, setCurrencyData] = useState([]);
  const getApiData = async () => {
    try {
      const basicUrl = `https://api.coingecko.com/api/v3/coins/${match.params.id}`;
      const response = await axios.get(basicUrl);
      // console.log(response.data)
      const apiData = {
        id: response.data.id,
        name: response.data.name,
        symbol: response.data.symbol.toUpperCase(),
        image: response.data.image.small,
        rank: response.data.market_cap_rank,
        website: response.data.links.homepage[0],
        price: response.data.market_data.current_price,
        market_cap: response.data.market_cap,
        total_volume: response.data.total_volume,
        description: response.data.description,
      };
      console.log(apiData)
      setCurrencyData(apiData);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getApiData();
  }, []);
  console.log(currencyData)
  return <div>hello World</div>;
}
