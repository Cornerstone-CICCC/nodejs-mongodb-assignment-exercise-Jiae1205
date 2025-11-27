// src/routes/product.routes.ts
import { Router } from 'express';
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/product.controller';

const router = Router();

router.get('/', getAllProducts);       // GET /products
router.get('/:id', getProductById);    // GET /products/:id
router.post('/', createProduct);       // POST /products
router.put('/:id', updateProduct);     // PUT /products/:id
router.delete('/:id', deleteProduct);  // DELETE /products/:id

export default router;
