import "./CurrencyInfoBox.scss";

export default function CurrencyInfoBox() {
  const PRODUCT_INFO = ["자산", "Price", "1H", "24H", "7D", "24H Volume"];
  return (
    <div className="CurrencyInfoBox">
      {PRODUCT_INFO.map((el, idx) => (
        <div key={idx}>{el}</div>
      ))}
    </div>
  );
}
