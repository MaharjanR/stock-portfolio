import Transaction from "../models/Transaction.js";

export const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.status(200).json(transactions);
  } catch (error) {
    console.log(error);
  }
};

export const createTransaction = async (req, res) => {
  let tempData = req.body;

  let ts = Date.now();
  let date_ob = new Date(ts);
  let day = date_ob.getDate();
  let month = date_ob.getMonth() + 1;
  let year = date_ob.getFullYear();
  let hours = date_ob.getHours();
  let minutes = date_ob.getMinutes();
  let seconds = date_ob.getSeconds();
  let dateTime = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;


  tempData = { ...tempData, date: dateTime };
  console.log(tempData);
  const newTransaction = new Transaction(tempData);
  try {
    const savedTransaction = await newTransaction.save();
    res.status(200).json(savedTransaction);
  } catch (error) {
    console.log(error);
  }
};
