import mongoose, { Schema, Document } from 'mongoose';

export interface IArticle extends Document {
  title: string;
  slug: string;
  description: string;
  date: string;
  readDuration: string;
  writer: string;
  designation: string;
  category: string;
  content: string;
  imageUrl?: string;
  published: boolean;
  createdAt: Date;
}

const ArticleSchema: Schema = new Schema({
  title: { type: String, required: true, unique: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  date: { type: String, required: true },
  readDuration: { type: String, required: true },
  writer: { type: String, required: true },
  designation: { type: String, required: true },
  category: { type: String, required: true },
  content: { type: String, required: true },
  imageUrl: { type: String, required: false, default: '' },
  published: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

// Delete cached model so schema changes always take effect
if (mongoose.models.Article) {
  delete mongoose.models.Article;
}

export default mongoose.model<IArticle>('Article', ArticleSchema);
