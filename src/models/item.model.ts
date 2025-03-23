import mongoose, { Document, Schema } from 'mongoose';

export interface IItem extends Document {
  title: string;
  icon: string;
  parentId: mongoose.Types.ObjectId | null;
  order: number;
}

const ItemSchema = new Schema({
  title: { type: String, required: true },
  icon: { type: String, required: true },
  parentId: { type: Schema.Types.ObjectId, ref: 'Folder', default: null },
  order: { type: Number, required: true }
}, { timestamps: true });

export default mongoose.model<IItem>('Item', ItemSchema);