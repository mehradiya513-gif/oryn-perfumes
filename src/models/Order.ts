import mongoose, { Schema, Document } from 'mongoose';

export interface IOrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface IFreebieItem {
  id: string;
  name: string;
  price?: number;
  quantity?: number;
  image?: string;
  description?: string;
}

export interface IOrder extends Document {
  name: string;
  email: string;
  phone: string;
  address: string;
  country: string;
  paymentMethod: string;
  total: number;
  items: IOrderItem[];
  freebies?: IFreebieItem[];
  status: 'pending' | 'dispatched';
  created: string;
  createdAt: Date;
  updatedAt: Date;
}

const OrderItemSchema = new Schema<IOrderItem>({
  id: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  image: { type: String, required: false }
}, { _id: false });

const FreebieItemSchema = new Schema<IFreebieItem>({
  id: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, default: 0 },
  quantity: { type: Number, default: 1 },
  image: { type: String, required: false },
  description: { type: String, required: false }
}, { _id: false });

const OrderSchema = new Schema<IOrder>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: false, default: '' },
  address: { type: String, required: false, default: '' },
  country: { type: String, required: false, default: 'India' },
  paymentMethod: { type: String, required: true, default: 'cod' },
  total: { type: Number, required: true },
  items: { type: [OrderItemSchema], default: [] },
  freebies: { type: [FreebieItemSchema], default: [] },
  status: { type: String, enum: ['pending', 'dispatched'], default: 'pending' },
  created: { type: String, required: true } // keeping original string format for backward compat
}, {
  timestamps: true
});

// Avoid compiling model multiple times in Next.js development
export default mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema);
