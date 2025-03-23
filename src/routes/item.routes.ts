import express from 'express';
import { getItems, createItem } from '../controllers/item.controller';
const router = express.Router();

router.get('/', getItems);
router.post('/', createItem);

export default router;