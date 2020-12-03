import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addCurrency, deleteCurrency } from "../../Store/actions/";
import SelectBox from "./Component/SelectBox/SelectBox";
import CurrencyInfoBox from "../../Components/CurrencyInfoBox/CurrencyInfoBox";
import Loader from "../../Components/Loader/Loader";
import "./CurrencyList.scss";

export default function CurrencyList() {
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const state = useSelector((store) => store.currencyReducer);

  const getApiData = async () => {
    setLoading(true);
    try {
      const basicUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=krw&per_page=50&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d`;
      const response = await axios.get(basicUrl);
      const apiData = response.data.map((el) => ({
        id: el.id,
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
      }));
      setApiData(apiData.sort((a, b) => a.rank - b.rank));
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getApiData();
  }, []);

  const handleClick = (idx) => {
    if (state.includes(apiData[idx])) {
      const remainCurrency = state.filter((i) => i !== apiData[idx]);
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
          <SelectBox />
          <CurrencyInfoBox />
          <div>
            {apiData.map((data, idx) => {
              return (
                <ul className="currency" key={idx}>
                  <div>
                    <button
                      className={
                        state.includes(data) ? "star isClicked" : "star"
                      }
                      onClick={() => handleClick(idx)}
                    >
                      ★
                    </button>
                    {/* <ToastContainer /> */}
                  </div>
                  <li
                    className="name"
                    id={data.name}
                    onClick={() => history.push(`/currencydetail/${data.id}`)}
                  >
                    {data.name}
                  </li>
                  <li className="symbol">{data.symbol}</li>
                  <li className="price">{data.price}</li>
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
                  <li className="volume">{data.volume}</li>
                </ul>
              );
            })}
          </div>
          <div className="moreCurrency">+더보기</div>
        </div>
      )}
    </>
  );
}

// const [apiData, setApiData] = useState({ ...SET_API, SET_API });
// const page = ["전체보기", "북마크보기"];
// const vsCurrency = { 0: "krw", 1: "usd" };
// const perPage = { 0: 10, 1: 30, 2: 50 };
// const [loading, setLoading] = useState(false);
// const SET_API = {
//   vsCurrency: ["krw", "usd"],
//   perPage: [10, 30, 50],
//   moreCurrency: function () {
//     let page = 1;
//     page = page + 1;
//     return page;
//   },
// };

//----------클릭에 따라서 붙는게 달라진다.
// .toLocaleString("ko-KR", {
//   style: "currency",
//   currency: "KRW",
// }),

// .toLocaleString("en-US", {
//   style: "currency",
//   currency: "USD",
// }),
