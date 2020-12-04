import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { addCurrency, deleteCurrency } from "../../Store/actions/";
import SelectBox from "./Component/SelectBox/SelectBox";
import CurrencyInfoBox from "../../Components/CurrencyInfoBox/CurrencyInfoBox";
import Loader from "../../Components/Loader/Loader";
import "./CurrencyList.scss";

export default function CurrencyList() {
  const arr = [];
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const state = useSelector((store) => store.currencyReducer);
  const [vsCurrency, setVsCurrency] = useState("krw");
  const [perPage, setPerPage] = useState("50");
  const [page, setPage] = useState(1);
  const basicUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${vsCurrency}&per_page=${perPage}&page=${page}&sparkline=false&price_change_percentage=1h%2C24h%2C7d`;

  const getApiData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(basicUrl);
      const currencyData = response.data
        .map((el) => ({
          id: el.id,
          name: el.name,
          symbol: el.symbol.toUpperCase(),
          price: el.current_price,
          hourPer: Number(el.price_change_percentage_1h_in_currency).toFixed(1),
          dayPer: Number(el.price_change_percentage_24h_in_currency).toFixed(1),
          weekPer: Number(el.price_change_percentage_7d_in_currency).toFixed(1),
          volume: el.total_volume,
          rank: el.market_cap_rank,
        }))
        .sort((a, b) => a.rank - b.rank);
      if (page === 1) {
        setApiData(currencyData);
      } else {
        setApiData(...apiData, ...currencyData);
      }
      setLoading(false);
      return;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getApiData();
  }, []);

  useEffect(() => {
    getApiData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vsCurrency, perPage, page]);
  const handleClick = (id, idx) => {
    if (
      state.find((data) => {
        return data.id === id;
      })
    ) {
      const remainCurrency = state.filter((i) => i.id !== id);
      dispatch(deleteCurrency(remainCurrency));
      toast.info("북마크가 해제되었습니다", {
        position: "top-right",
        autoClose: 1500,
      });
    } else {
      dispatch(addCurrency(apiData[idx]));
      toast.info("북마크가 추가되었습니다", {
        position: "top-right",
        autoClose: 1500,
      });
    }
  };

  const fetchMoreCurrency = () => {
    setPage(page + 1);
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="CurrencyList">
          <h3 className="lists">
            <div className="priceList">가상자산 시세 목록</div>
            <div className="bookMarkList">북마크 목록</div>
          </h3>
          <SelectBox
            perPage={perPage}
            vsCurrency={vsCurrency}
            setVsCurrency={setVsCurrency}
            setPerPage={setPerPage}
            getApiData={getApiData}
          />
          <CurrencyInfoBox />
          <div>
            {apiData.map((data, idx) => {
              return (
                <ul className="currency" key={idx}>
                  <div>
                    <button
                      className={
                        state.find((currency) => currency.id === data.id)
                          ? "star isClicked"
                          : "star"
                      }
                      onClick={() => handleClick(data.id, idx)}
                    >
                      ★
                    </button>
                    {/* <ToastContainer /> */}
                  </div>
                  <Link className="name" to={`/currencydetail/${data.id}`}>
                    {data.name}
                  </Link>
                  <li className="symbol">{data.symbol}</li>
                  <li className="price">
                    {vsCurrency === "usd"
                      ? data.price.toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                        })
                      : data.price.toLocaleString("ko-KR", {
                          style: "currency",
                          currency: "KRW",
                        })}
                  </li>
                  <li
                    className={
                      data.hourPer.includes("-") ? "minusPer" : "plusPer"
                    }
                  >
                    {data.hourPer}%
                  </li>
                  <li
                    className={
                      data.dayPer.includes("-") ? "minusPer" : "plusPer"
                    }
                  >
                    {data.dayPer}%
                  </li>
                  <li
                    className={
                      data.weekPer.includes("-") ? "minusPer" : "plusPer"
                    }
                  >
                    {data.weekPer}%
                  </li>
                  <li className="volume">
                    {vsCurrency === "usd"
                      ? data.volume.toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                        })
                      : data.volume.toLocaleString("ko-KR", {
                          style: "currency",
                          currency: "KRW",
                          maximumFractionDigits: 2,
                        })}
                  </li>
                </ul>
              );
            })}
          </div>
          <div className="moreCurrency" onClick={() => fetchMoreCurrency()}>
            +더보기
          </div>
        </div>
      )}
    </>
  );
}
