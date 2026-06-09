import mongoose, { Schema, Document } from 'mongoose';

export interface IWebinar extends Document {
  youtubeUrl: string;
  category: 'recorded' | 'upcoming';
  title: string;
  description: string;
  date: string;
  duration: number;
  name: string;
  published: boolean;
  registeredCount: number;
}

const WebinarSchema: Schema = new Schema({
  youtubeUrl: { type: String, required: true },
  category: { type: String, enum: ['recorded', 'upcoming'], required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: String, required: false, default: '' },
  duration: { type: Number, required: true },
  name: { type: String, required: true },
  published: { type: Boolean, default: true },
  registeredCount: { type: Number, default: 0 }
});

// Delete cached model so schema changes (e.g. date: required false) always take effect
if (mongoose.models.Webinar) {
  delete mongoose.models.Webinar;
}
export default mongoose.model<IWebinar>('Webinar', WebinarSchema);
