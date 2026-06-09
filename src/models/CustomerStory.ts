import mongoose, { Schema, Document } from 'mongoose';

export interface ICustomerStory extends Document {
  youtubeId?: string;
  title: string;
  description: string;
  category: string; // matches practiceType e.g., 'private', 'group', 'dso'
  customerName: string;
  customerImage?: string;
  location: string;
  published: boolean;
  featuredOnHomepage: boolean;
  rating: number;
  tag?: string; // e.g. "↑ 80% chair time" or "↑ 79% adjustment time"
  tagColor?: string; // e.g. "emerald", "blue", "violet", "amber"
  createdAt: Date;
}

const CustomerStorySchema: Schema = new Schema({
  youtubeId: { type: String },
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  customerName: { type: String, required: true },
  customerImage: { type: String },
  location: { type: String, required: true },
  published: { type: Boolean, default: true },
  featuredOnHomepage: { type: Boolean, default: false },
  rating: { type: Number, default: 5 },
  tag: { type: String },
  tagColor: { type: String, default: 'emerald' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.CustomerStory || mongoose.model<ICustomerStory>('CustomerStory', CustomerStorySchema);
