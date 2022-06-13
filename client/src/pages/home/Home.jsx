import { useEffect, useState } from "react";
import axios from "axios";
import "./home.css";
import Navbar from "../../components/navbar/Navbar";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const Home = () => {
  const transcationSchema = Yup.object().shape({
    quantity: Yup.number().required("Quantity is required").min(0),
  });

  const [data, setData] = useState([]);
  const [stocks, setStocks] = useState([]);
  const [price, setPrice] = useState(0);
  const [action, setAction] = useState(true);

  const addTransaction = async (transactionData) => {
    const postData = {
      ...transactionData,
      "amount": price
    };    
    await axios.post(
      `http://localhost:8080/transaction`,
      postData
    )

    setAction(!action)
    // const user = await axios.get("http://localhost:8080/user");
    // const userId = await user.data[0]._id;
    // const userDatas = await user.data[0].stock;
    // const totalPrice = price * transactionData.quantity;
    
    // const updatedUserData = userDatas.map( userData => {
    //   delete userData._id;
    //   if(transactionData.type === "Buy"){
    //     if(userData.name === transactionData.name){
    //       userData.totalUnits += transactionData.quantity;
    //       userData.totalInvestment += totalPrice;
    //     } 
    //     if(userData.name === "Total"){
    //       userData.totalUnits += transactionData.quantity;
    //       userData.totalInvestment += totalPrice;
    //     }
    //   }else{
    //     if(userData.name === transactionData.name){
    //       userData.totalUnits -= transactionData.quantity;
    //       userData.totalInvestment -= totalPrice;
    //       userData.soldAmt += totalPrice
    //     }  
    //     if(userData.name === "Total"){
    //       userData.totalUnits -= transactionData.quantity;
    //       userData.totalInvestment -= totalPrice;
    //       userData.soldAmt += totalPrice
    //     }
    //   }
    //   return userData;
    // })

    
    // console.log(updatedUserData);
    // const updateUser = await axios.put(`http://localhost:8080/user/id=${userId}`, updatedUserData)
    // console.log(updateUser);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/transaction");
      await setData(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchStock = async () => {
    try {
      const response = await axios.get("http://localhost:8080/stock");
      await setStocks(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
    fetchStock();
  }, [action]);

  return (
    <div className="home">
      <Navbar />
      <div className="stockHistory">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>S.N.</TableCell>
                <TableCell align="left">Stock Name</TableCell>
                <TableCell align="left">Transaction Type</TableCell>
                <TableCell align="left">Quantity</TableCell>
                <TableCell align="left">Amount</TableCell>
                <TableCell align="left">Transaction Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row, index) => (
                <TableRow
                  key={row._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell align="left">{row.name}</TableCell>
                  <TableCell align="left">{row.type}</TableCell>
                  <TableCell align="left">{row.quantity}</TableCell>
                  <TableCell align="left">{row.amount}</TableCell>
                  <TableCell align="left">{row.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <Formik
        initialValues={{
          name: "Prime Commercial Bank",
          type: "Buy",
          quantity: "",
        }}
        validationSchema={transcationSchema}
        onSubmit={(values, actions) => {
          addTransaction(values);
          actions.resetForm();
        }}
      >
        {(props) => (
          <div className="form">
            <Form noValidate autoComplete="on">
              <h2 className="title">Buy/Sell Stocks</h2>
              <Field
                as="select"
                onChange={props.handleChange}
                name="name"
                className="form-control"
                value={props.values.stock}
              >
                {stocks.map((stock, index) => {
                  return (
                    <option key={index} id={stock.name} value={stock.name}>
                      {stock.name}
                    </option>
                  );
                })}
                ;
              </Field>
              <Field
                as="select"
                onChange={props.handleChange}
                name="type"
                className="form-control"
                value={props.values.type}
              >
                <option id="buy" value={"Buy"}>
                  Buy
                </option>
                <option id="sell" value={"Sell"}>
                  Sell
                </option>
              </Field>

              <Field
                name="quantity"
                type="number"
                className="form-control"
                placeholder="Quantity"
                value={props.values.quantity}
                onChange={props.handleChange}
              />

              {/* <Field
                name="amount"
                as="select"
                className="form-control stockPrice"
                placeholder="Amount"
                value={props.values.amount }
                onChange={props.handleChange}
                disabled
              >
                <option id="amount" value={"amount"}>
                {
                  stocks &&
                  stocks.map(
                    (stock, index) =>
                      props.values.stock === stock.name && stock.buyPerUnit
                  )}
                </option>
              </Field> */}

              <label htmlFor="" className="stockPrice">
                {stocks.map((stock) => {
                  if (
                    props.values.name === stock.name &&
                    props.values.type === "Buy"
                  ) {
                    setPrice(stock.buyPerUnit);
                    return stock.buyPerUnit;
                  } else if (
                    props.values.name === stock.name &&
                    props.values.type === "Sell"
                  ) {
                    setPrice(stock.sellPerUnit);
                    return stock.sellPerUnit;
                  }
                })}
              </label>

              <button type="submit" className="btn">
                {props.values.type}
              </button>

              <div className="errors">
                {props.errors.quantity && props.touched.quantity ? (
                  <small>{props.errors.quantity}</small>
                ) : null}

                {props.errors.amount && props.touched.amount ? (
                  <small>{props.errors.amount}</small>
                ) : null}
              </div>
            </Form>
          </div>
        )}
      </Formik>
    </div>
  );
};

export default Home;
