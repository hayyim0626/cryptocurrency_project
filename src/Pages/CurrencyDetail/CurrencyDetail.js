import React, { useState, useEffect } from "react";
import Loader from "../../Components/Loader/Loader";
import "./CurrencyDetail.scss";
import axios from "axios";

export default function CurrencyDetail({ match }) {
  const [currencyData, setCurrencyData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [vsCurrency, setVsCurrency] = useState("krw");
  // const [seeDescription, setSeeDescription] = useState(["▼", "▲"])
  const VS_CURRENCY = ["KRW 보기", "USD 보기"];
  const coinId = match.params.id;
  // const description = currencyData.description;
  
  const handleVsCurrency = (e) => {
    setVsCurrency(e.target.value.slice(0, 3).toLowerCase());
  };

  const getApiData = async () => {
    setLoading(true);
    try {
      const basicUrl = `https://api.coingecko.com/api/v3/coins/${coinId}`;
      const response = await axios.get(basicUrl);
      const apiData = {
        id: response.data.id,
        name: response.data.name,
        symbol: response.data.symbol.toUpperCase(),
        image: response.data.image.small,
        rank: response.data.market_cap_rank,
        website: response.data.links.homepage[0],
        price: response.data.market_data.current_price,
        hourPer:
          response.data.market_data.price_change_percentage_1h_in_currency,
        marketCap: response.data.market_data.market_cap,
        totalVolume: response.data.market_data.total_volume,
        description: response.data.description,
      };
      setCurrencyData(apiData);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getApiData();
  }, []);

  console.log(currencyData.description);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="CurrencyDetail">
          <header>
            <div className="currencyInfo">
              <button className="star">★</button>
              <img
                src={currencyData.image}
                alt="currency Img"
                className="currencyLogo"
              />
              <div className="currencyName">
                <h2>{currencyData.name}</h2>
                <h2>({currencyData.symbol})</h2>
              </div>
            </div>
            <select className="selectType" onClick={(e) => handleVsCurrency(e)}>
              {VS_CURRENCY.map((el, idx) => (
                <option
                  key={idx}
                  selected={
                    vsCurrency === el.slice(0, 3).toLowerCase()
                      ? "selected"
                      : ""
                  }
                >
                  {el}
                </option>
              ))}
            </select>
          </header>
          <content className="detailInfo">
            <article>
              <div className="infoBox">
                <div className="infoTitle">시가총액 Rank</div>
                <div className="infoContents">Rank #{currencyData.rank}</div>
              </div>
              <div className="infoBox">
                <div className="infoTitle">웹사이트</div>
                <div className="infoContents">{currencyData.website}</div>
              </div>
            </article>
            <article>
              <div className="currentPrice">
                <div>
                  {vsCurrency === "krw"
                    ? currencyData.price?.krw.toLocaleString("ko-KR", {
                        style: "currency",
                        currency: "KRW",
                      })
                    : currencyData.price?.usd.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                </div>
                <span>{currencyData.hourPer?.ethereum}</span>
              </div>
              <div className="currencyVolume">
                <div className="marketCap">
                  <div className="">시가총액</div>
                  {/* <div className="">{currencyData.marketCap[currencyData.symbol.toLowerCase()]}</div> */}
                </div>
                <div className="dayVolume">
                  <div className="">24시간 거래대금</div>
                  {/* <div className="">{currencyData.totalVolume[currencyData.symbol.toLowerCase()]}</div> */}
                </div>
              </div>
            </article>
          </content>
          <content className="priceCalculation"></content>
          <content className="description">
            <article
              className="seeDescription"
              onClick={() => setIsClicked(!isClicked)}
            >
              설명보기 ▼
            </article>
            <article className={isClicked ? "clicked" : "notClicked"}>
              {currencyData.description?.ko
                ? currencyData.description?.ko
                : currencyData.description?.en
                ? currencyData.description?.en
                : "설명이 존재하지 않습니다."}
            </article>
          </content>
        </div>
      )}
    </>
  );
}
