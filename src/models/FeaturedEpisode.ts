import mongoose, { Schema, Document } from 'mongoose';

export interface IFeaturedEpisode extends Document {
  youtubeId: string;
  episodeNumber: number;
  title: string;
  guest: string;
  duration: string;
  updatedAt: Date;
}

const FeaturedEpisodeSchema: Schema = new Schema(
  {
    youtubeId:     { type: String, required: true },
    episodeNumber: { type: Number, required: true },
    title:         { type: String, required: true },
    guest:         { type: String, default: '' },
    duration:      { type: String, default: '' },
  },
  { timestamps: true }
);

export default mongoose.models.FeaturedEpisode ||
  mongoose.model<IFeaturedEpisode>('FeaturedEpisode', FeaturedEpisodeSchema);
