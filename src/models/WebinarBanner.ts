import mongoose, { Schema, Document } from 'mongoose';

export interface IWebinarSettings extends Document {
  bannerTitle: string;
  bannerSubtitle: string;
  date: string;
  duration: number
  time: string;
  name: string;
  totalRegistrations: number;
}

const WebinarSettingsSchema: Schema = new Schema({
  bannerTitle: { type: String, required: true },
  bannerSubtitle: { type: String, required: true },
  date: { type: String, required: true },
  duration: { type: Number, required: true },
  time: { type: String, required: true },
  name: { type: String, required: true },
  totalRegistrations: { type: Number, default: 0 }
});

export default mongoose.models.WebinarSettings || mongoose.model<IWebinarSettings>('WebinarSettings', WebinarSettingsSchema);
