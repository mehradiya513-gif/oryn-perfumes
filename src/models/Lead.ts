import mongoose, { Schema, Document } from 'mongoose';

export interface ILead extends Document {
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt: Date;
}

const LeadSchema = new Schema<ILead>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: false },
  message: { type: String, required: false }
}, {
  timestamps: true
});

export default mongoose.models.Lead || mongoose.model<ILead>('Lead', LeadSchema);
