import mongoose, { Schema, Document } from 'mongoose';

export interface ITalkUnlock extends Document {
  name: string;
  email: string;
  practice: string;
  unlockedAt: Date;
}

const TalkUnlockSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, lowercase: true, trim: true },
  practice: { type: String, required: true },
  unlockedAt: { type: Date, default: Date.now },
});

// One record per email — no duplicate unlocks
TalkUnlockSchema.index({ email: 1 }, { unique: true });

export default mongoose.models.TalkUnlock ||
  mongoose.model<ITalkUnlock>('TalkUnlock', TalkUnlockSchema);
