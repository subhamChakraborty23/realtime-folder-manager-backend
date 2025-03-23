import express from 'express';
import { getFolders, createFolder } from '../controllers/folder.controller';
const router = express.Router();

router.get('/', getFolders);
router.post('/', createFolder);

export default router;