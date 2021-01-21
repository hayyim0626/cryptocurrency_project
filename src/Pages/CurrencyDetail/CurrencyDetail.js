import React, { useState, useEffect } from "react";
import Loader from "../../Components/Loader/Loader";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { addCurrency, deleteCurrency } from "../../Store/actions/";
import axios from "axios";
import "./CurrencyDetail.scss";

export default function CurrencyDetail({ match }) {
  const [currencyData, setCurrencyData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [vsCurrency, setVsCurrency] = useState("krw");
  const [seeDescription, setSeeDescription] = useState(["▲", "▼"]);
  const bookmarkState = useSelector((store) => store.currencyReducer);
  const entireData = useSelector((store) => store.dataReducer);
  const VS_CURRENCY = ["KRW 보기", "USD 보기"];
  const coinId = match.params.id;
  const dispatch = useDispatch();

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
        volume: response.data.market_data.total_volume,
        description: response.data.description,
        vsCurrency: vsCurrency,
      };
      setCurrencyData(apiData);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(entireData);
  const handleVsCurrency = (e) => {
    setVsCurrency(e.target.value.slice(0, 3).toLowerCase());
  };

  const handleClick = (id) => {
    if (bookmarkState.find((data) => data.id === id)) {
      const remainCurrency = bookmarkState.filter((i) => i.id !== id);
      dispatch(deleteCurrency(remainCurrency));
      toast.info(`${id}(이)가 북마크에서 해제되었습니다`, {
        position: "top-right",
        autoClose: 1500,
      });
    } else {
      const addCurrencyData = entireData.find((data) => data.id === id);
      dispatch(addCurrency(addCurrencyData));
      toast.info(`${id}(이)가 북마크에 추가되었습니다`, {
        position: "top-right",
        autoClose: 1500,
      });
    }
  };

  useEffect(() => {
    getApiData();
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="CurrencyDetail">
          <header>
            <div className="currencyInfo">
              <button
                className={
                  bookmarkState.find(
                    (entrieData) => entrieData.id === currencyData.id
                  )
                    ? "star isClicked"
                    : "star"
                }
                id={currencyData.id}
                onClick={(e) => handleClick(e.target.id)}
              >
                ★
              </button>
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
                <div
                  className={
                    Number(currencyData.hourPer?.krw).toFixed(1).includes("-")
                      ? "minusPer"
                      : "plusPer"
                  }
                >
                  {vsCurrency === "krw"
                    ? Number(currencyData.hourPer?.krw).toFixed(1)
                    : Number(currencyData.hourPer?.usd).toFixed(1)}
                  %
                </div>
              </div>
              <div className="currencyVolume">
                <div className="marketCap">
                  <div className="marketCapText">시가총액</div>
                  <div className="marketCapData">
                    {vsCurrency === "krw"
                      ? currencyData.marketCap?.krw.toLocaleString("ko-KR", {
                          style: "currency",
                          currency: "KRW",
                        })
                      : currencyData.marketCap?.usd.toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                        })}
                  </div>
                </div>
                <div className="dayVolume">
                  <div className="dayVolumeText">24시간 거래대금</div>
                  {vsCurrency === "krw"
                    ? currencyData.volume?.krw.toLocaleString("ko-KR", {
                        style: "currency",
                        currency: "KRW",
                      })
                    : currencyData.volume?.usd.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                </div>
              </div>
            </article>
          </content>
          <content className="priceCalculate">
            <article className="calculateText">가격계산</article>
            <article className="calculateBox">
              <div className="currencyPriceCalculate">
                <span className="currencyId">{currencyData.symbol}</span>
                <input type="text" className="currencyUnit" />
              </div>
              <div className="exchangeMark">⇄</div>
              <div className="cashPriceCalculate">
                <span className="nationalCurrency">{vsCurrency.toUpperCase()}</span>
                <input type="text" className="nationalCurrencyPrice" />
              </div>
            </article>
          </content>
          <content className="description">
            <article
              className="seeDescription"
              onClick={() => setIsClicked(!isClicked)}
            >
              설명보기 {isClicked ? seeDescription[0] : seeDescription[1]}
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
