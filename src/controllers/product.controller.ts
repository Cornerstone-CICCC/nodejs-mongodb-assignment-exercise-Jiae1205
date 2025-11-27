// src/controllers/product.controller.ts
import { Request, Response } from 'express';
import Product from '../models/product.model';

// 1) 전체 조회
export const getAllProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch products' });
  }
};

// 2) 하나 조회
export const getProductById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);
    if (!product) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch product' });
  }
};

// 3) 추가
export const createProduct = async (req: Request, res: Response): Promise<void> => {
  const { productName, productPrice } = req.body;

  if (!productName || productPrice == null) {
    res.status(400).json({ message: 'productName and productPrice are required' });
    return;
  }

  try {
    const newProduct = new Product({ productName, productPrice });
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create product' });
  }
};

// 4) 수정
export const updateProduct = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { productName, productPrice } = req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { productName, productPrice },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update product' });
  }
};

// 5) 삭제
export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete product' });
  }
};
