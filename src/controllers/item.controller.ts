import { Request, Response } from 'express';
import Item, { IItem } from '../models/item.model';

export const getItems = async (req: Request, res: Response) => {
  try {
    const items = await Item.find().sort('order');
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching items' });
  }
};

export const createItem = async (req: Request, res: Response) => {
  try {
    const { title, icon, parentId } = req.body;
    const count = await Item.countDocuments();
    const item: IItem = new Item({ title, icon, parentId, order: count });
    await item.save();
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ message: 'Error creating item' });
  }
};