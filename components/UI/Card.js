import React from "react";

function Card(props) {
  const CardRow = (props) => {
    return (
      <div className="card__row">
        <span>Last 24 hours</span>
        <span>1</span>
        <span>0.5</span>
      </div>
    );
  };
  return (
    <div className="card">
      <div className="card__header">
        <div className="card__header--title">Deposits</div>
        <div>Amount</div>
        <div>Change</div>
      </div>

      <div className="card__content">
          <CardRow />
          <CardRow />
          <CardRow />
      </div>
    </div>
  );
}

export default Card;
