import { useState, useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
import "./dashboard.css";
import axios from "axios";
import Card from "../../components/card/card";

const Dashboard = () => {
  const [stockData, setStockData] = useState();

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/user");
      const data = await response.data;
      setStockData(data[0].stock);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="dashboard">
      <Navbar />
      <div className="cardContainer">
        {stockData ? (
          stockData.map((data,index) => {
            return <Card key={index} data={data} />;
          })
        ) : (
          <div>Loading</div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
