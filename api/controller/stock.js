import Stock from "../models/Stock.js"

export const getStocks = async (req, res) => {
  try {
    const stocks = await Stock.find();
    res.status(200).json(stocks);
  } catch (error) {
    console.log(error);
  }
};

export const createStock = async (req, res) => {
  const newStock = new Stock(req.body);
  try {
    const savedStock = await newStock.save();
    res.status(200).json(savedStock);
  } catch (error) {
    console.log(error);
  }
};
