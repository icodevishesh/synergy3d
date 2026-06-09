import mongoose, { Schema, Document } from 'mongoose';

export interface IPartner extends Document {
  name: string;
  logoUrl: string;
  websiteUrl: string;
  order: number;
  createdAt: Date;
}

const PartnerSchema: Schema = new Schema({
  name: { type: String, required: true },
  logoUrl: { type: String, required: true },
  websiteUrl: { type: String, required: true },
  order: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Partner || mongoose.model<IPartner>('Partner', PartnerSchema);
