import mongoose, { Schema, Document } from 'mongoose';

export interface IArticleLead extends Document {
  fullName: string;
  practiceName: string;
  email: string;
  contact: string;
  articleSlug: string;
  articleTitle: string;
  submittedAt: Date;
}

const ArticleLeadSchema: Schema = new Schema({
  fullName: { type: String, required: true },
  practiceName: { type: String, required: true },
  email: { type: String, required: true },
  contact: { type: String, required: true },
  articleSlug: { type: String, required: true },
  articleTitle: { type: String, required: true },
  submittedAt: { type: Date, default: Date.now }
});

export default mongoose.models.ArticleLead || mongoose.model<IArticleLead>('ArticleLead', ArticleLeadSchema);
