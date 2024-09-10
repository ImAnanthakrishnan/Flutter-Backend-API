import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { v4 } from "uuid";
import { readData, writeData } from "../helpers/productsHelper";
import { ProductTypes } from "../../types/productTypes";

export const createProduct = async (req: Request, res: Response) => {
  const errors = validationResult(req); //checking for validation error;
  if (!errors.isEmpty()) {
    res.status(400).json({
      message: errors.array(),
    });
    return;
  } //validation failed;

  const { item_name, price, description } = req.body;
  const products: ProductTypes[] = readData(); //reads data from the file

  const existingProduct = products.find(
    (product: ProductTypes) =>
      product.item_name.toLowerCase() === item_name.toLowerCase()
  );

  if (existingProduct) {
    res.status(409).json({ message: "Item already exist" });
    return;
  }

  const newProduct: ProductTypes = {
    id: v4(),
    item_name,
    price,
    description: description || "",
  };

  products.push(newProduct);
  writeData(products); //writing data to file;

  res.status(201).json({
    message: "Product created",
    newProduct,
  });
};

export const getAllProduct = async (req: Request, res: Response) => {
  const products = readData();
  res.status(200).json(products);
};

export const getSingleProduct = async (req: Request, res: Response) => {
  const id = req.params.id;
  const products: ProductTypes[] = readData(); //getting data;

  const product = products.find((product: ProductTypes) => product.id === id);
  //finding the product;

  if (!product) {
    res.status(404).json({
      message: "Item not found",
    });
    return;
  }

  res.status(200).json({
    message: "Successfull",
    product,
  });
};

export const updateProduct = async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400).json({
      message: errors.array(),
    });
    return;
  } //validation failed;

  const id = req.params.id;
  const { item_name, price, description } = req.body;

  const products: ProductTypes[] = readData(); //getting data;

  const productIndex = products.findIndex(
    (product: ProductTypes) => product.id === id
  );

  if (productIndex === -1) {
    res.status(404).json({ message: "Product not found" });
    return;
  }

  products[productIndex] = {
    ...products[productIndex],
    item_name: item_name || products[productIndex].item_name,
    price: price,
    description: description || products[productIndex].description,
  }; //updating existing product

  writeData(products); //applying changes
  res.status(200).json({
    message: "Item updated",
    product: products[productIndex],
  });
};

export const deleteProduct = async (req: Request, res: Response) => {
  const products: ProductTypes[] = readData(); //data read;

  const productIndex = products.findIndex(
    (product: ProductTypes) => product.id === req.params.id
  );

  if (productIndex === -1) {
    res.status(404).json({ message: "Product not found" });
    return;
  }

  products.splice(productIndex, 1); //deleting from original data.
  writeData(products); //applying changes;

  res.status(200).json({ message: "Product deleted successfully" });
};
