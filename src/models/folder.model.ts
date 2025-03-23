import mongoose, { Document, Schema } from 'mongoose';

export interface IFolder extends Document {
  name: string;
  isOpen: boolean;
  parentId: mongoose.Types.ObjectId | null;
  order: number;
}

const FolderSchema = new Schema({
  name: { type: String, required: true },
  isOpen: { type: Boolean, default: true },
  parentId: { type: Schema.Types.ObjectId, ref: 'Folder', default: null },
  order: { type: Number, required: true }
}, { timestamps: true });

export default mongoose.model<IFolder>('Folder', FolderSchema);