import { Request, Response } from 'express';
import Folder, { IFolder } from '../models/folder.model';

export const getFolders = async (req: Request, res: Response) => {
  try {
    const folders = await Folder.find().sort('order');
    console.log("Finding Folders")
    res.status(200).json(folders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching folders' });
  }
};

export const createFolder = async (req: Request, res: Response) => {
  try {
    const { name, parentId } = req.body;
    const count = await Folder.countDocuments();
    const folder: IFolder = new Folder({ name, parentId, order: count });
    await folder.save();
    console.log("Creating Folder")
    res.status(201).json(folder);
  } catch (error) {
    res.status(500).json({ message: 'Error creating folder' });
  }
};