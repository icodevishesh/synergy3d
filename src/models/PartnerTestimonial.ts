import mongoose, { Schema, Document } from 'mongoose';

export interface IPartnerTestimonial extends Document {
  name: string;
  practice: string;
  quote: string;
  tag?: string;
  tagColor?: string; // e.g. "emerald", "blue", "violet", "amber"
  emoji?: string; // default '👨‍⚕️'
  category: string; // matches practiceType e.g., 'private', 'group', 'dso'
  published: boolean;
  createdAt: Date;
}

const PartnerTestimonialSchema: Schema = new Schema({
  name: { type: String, required: true },
  practice: { type: String, required: true },
  quote: { type: String, required: true },
  tag: { type: String },
  tagColor: { type: String, default: 'blue' },
  emoji: { type: String, default: '👨‍⚕️' },
  category: { type: String, required: true, default: 'private' },
  published: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.PartnerTestimonial || mongoose.model<IPartnerTestimonial>('PartnerTestimonial', PartnerTestimonialSchema);
