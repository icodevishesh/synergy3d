import mongoose, { Schema, Document } from 'mongoose';

export interface IWebinarRegistration extends Document {
  webinarId: mongoose.Types.ObjectId;
  name: string;
  email: string;
  whatsAppNumber: string;
  registeredAt: Date;
}

const WebinarRegistrationSchema: Schema = new Schema({
  webinarId: { type: Schema.Types.ObjectId, ref: 'Webinar', required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  whatsAppNumber: { type: String, required: true },
  registeredAt: { type: Date, default: Date.now }
});

export default mongoose.models.WebinarRegistration || mongoose.model<IWebinarRegistration>('WebinarRegistration', WebinarRegistrationSchema);
