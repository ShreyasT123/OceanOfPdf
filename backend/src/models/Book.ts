import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IBook extends Document {
  title: string;
  author: string;
  category: string;
  publishedYear: number;
  size: string;
  coverUrl: string;
  fileUrl: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

const BookSchema: Schema = new Schema(
  {
    title: { type: String, required: true, index: true },
    author: { type: String, required: true, index: true },
    category: { type: String, required: true, index: true },
    publishedYear: { type: Number, required: true },
    size: { type: String, required: true },
    coverUrl: { type: String, required: true },
    fileUrl: { type: String, required: true },
    tags: { type: [String], default: [] },
  },
  {
    timestamps: true,
  }
);

BookSchema.index({ title: 'text', author: 'text', category: 'text' });

const Book: Model<IBook> = mongoose.models.Book || mongoose.model<IBook>('Book', BookSchema);

export default Book;
