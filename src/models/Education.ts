import mongoose, { Schema, Document } from 'mongoose';

export interface IEducation extends Document {
  youtubeId: string;
  title: string;
  description: string;
  category: string;
  duration: string;
  published: boolean;
  createdAt: Date;
}

const EducationSchema: Schema = new Schema({
  youtubeId: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  duration: { type: String, required: true },
  published: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Education || mongoose.model<IEducation>('Education', EducationSchema);
