import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { getProduct, 
    getProducts, 
    createProducts, 
    deleteProducts, 
    updateProducts, 
} from "../controllers/products.controllers.js";

const router = Router();

router.get('/products', authRequired, getProducts);

router.get('/products/:id', authRequired, getProduct);

router.post('/products', authRequired, createProducts);

router.delete('/products', authRequired, deleteProducts);

router.put('/products/:id', authRequired, updateProducts);

export default router;