import React from "react";

function Card(props) {
  const CardRow = ({ name, amount, change }) => {
    return (
      <div className="card__row">
        <span>{name}</span>
        <span>{amount}</span>
        <span>{change}</span>
      </div>
    );
  };
  
  return (
    <div className="card">
      <div className="card__header">
        <div className="card__header--title">{props.title}</div>
        <div>Amount</div>
        <div>Change</div>
      </div>

      <div className="card__content">
        {props.rows.map((row) => (
          <CardRow
            key={row.name}
            name={row.name}
            amount={row.amount}
            change={row.change}
          />
        ))}
      </div>

      {
        props.id === 2 && <div className="user-overview">
           <div className="30days-overview">
              <div className="number">0</div>
              <div className="title">Last 30 days</div>
           </div>
           <div className="24hrs-overview">
              <div className="number">0</div>
              <div className="title">Last 24 hours</div>
           </div>
        </div>
      }
    </div>
  );
}

export default React.memo(Card);
