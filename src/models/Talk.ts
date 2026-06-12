import mongoose, { Schema, Document } from 'mongoose';

export interface ITalk extends Document {
  youtubeId: string;
  episodeNumber: number;
  title: string;
  description: string;
  guest: string;
  category: string;
  docName?: string;
  duration: string;
  published: boolean;
  locked: boolean;
  createdAt: Date;
}

const TalkSchema: Schema = new Schema({
  youtubeId: { type: String, required: true },
  episodeNumber: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  guest: { type: String, required: true },
  category: { type: String, required: true },
  docName: { type: String },
  duration: { type: String, required: true },
  published: { type: Boolean, default: true },
  locked: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Talk || mongoose.model<ITalk>('Talk', TalkSchema);
