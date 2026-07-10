
import mongoose, { Document, Schema } from "mongoose";


interface ICallback extends Document {
  firstName: string;
  lastName: string;
  practice: string;
  phone: string;
  email: string;
  state: string;
  callTime: string;
  notes: string;
  helpWith: string[];
}

const callbackSchema: Schema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  practice: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String },
  state: { type: String },
  callTime: { type: String },
  notes: { type: String },
  helpWith: { type: [String] },
}, { timestamps: true });

export default mongoose.models.Callback || mongoose.model<ICallback>("Callback", callbackSchema);