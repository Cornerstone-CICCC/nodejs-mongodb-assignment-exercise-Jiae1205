// src/models/product.model.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
  productName: string;
  productPrice: number;
}

const ProductSchema: Schema = new Schema(
  {
    productName: { type: String, required: true },
    productPrice: { type: Number, required: true },
  },
  {
    timestamps: true, // createdAt, updatedAt 자동 생성
  }
);

const Product = mongoose.model<IProduct>('Product', ProductSchema);

export default Product;
