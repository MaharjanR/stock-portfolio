import "./card.css";

const card = ({ data }) => {

  return (
    <div className="card">
      <h3 className="title">{data.name}</h3>
      <div className="cardContent">
        <span>Total Units: {data.totalUnits}</span>
        <span>Total Investment: {data.totalInvestment}</span>
      </div>
      <div className="cardContent">
        <span>Sold Amount: {data.soldAmt}</span>
        <span>Current Amount: {data.currentAmt}</span>
      </div>
      <div className="cardContent">
        <span>Overall Profit: {data.overallProfit}</span>
      </div>
    </div>
  );
};

export default card;
