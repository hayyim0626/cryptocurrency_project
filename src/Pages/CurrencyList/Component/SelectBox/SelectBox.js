import React from "react";
import { useHistory } from "react-router-dom";
import "./SelectBox.scss";

export default function SelectBox({
  setVsCurrency,
  setPerPage,
  perPage,
  vsCurrency,
}) {
  const CURRENT_PAGE = ["전체보기", "북마크보기"];
  const VS_CURRENCY = ["KRW 보기", "USD 보기"];
  const PER_PAGE = ["50개 보기", "30개 보기", "10개 보기"];
  const history = useHistory();

  const handlePage = (e) => {
    e.target.value === "북마크보기"
      ? history.push("/bookmark")
      : history.push("/currencylist");
  };
  const handleVsCurrencyApi = (e) => {
    setVsCurrency(e.target.value.slice(0, 3).toLowerCase());
  };

  const handlePerPageApi = (e) => {
    setPerPage(e.target.value.slice(0, 2));
  };

  return (
    <nav className="SelectBox">
      <select className="selectType" onChange={(e) => handlePage(e)}>
        {CURRENT_PAGE.map((el, idx) => (
          <option key={idx}>{el}</option>
        ))}
      </select>
      <select className="selectType" onClick={(e) => handleVsCurrencyApi(e)}>
        {VS_CURRENCY.map((el, idx) => (
          <option
            key={idx}
            selected={vsCurrency === el.slice(0, 3).toLowerCase() ? "selected" : ""}
          >
            {el}
          </option>
        ))}
      </select>
      <select className="selectType" onClick={(e) => handlePerPageApi(e)}>
        {PER_PAGE.map((el, idx) => (
          <option
            key={idx}
            selected={perPage === el.slice(0, 2) ? "selected" : ""}
          >
            {el}
          </option>
        ))}
      </select>
    </nav>
  );
}
