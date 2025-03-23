import { Request, Response } from 'express';
const express = require('express');
const router = express.Router();
import Item from '../models/item.model';
import Folder from '../models/folder.model';

router.get('/', async (req : Request, res : Response) => {
  try {
    const items = await Item.find({});
    const folders = await Folder.find({});
    res.status(200).json({ items, folders });
  } catch (error) {
    console.error('Error fetching elements:', error);
    res.status(500).json({ message: 'Server error fetching elements' });
  }
});

module.exports = router;
