import mongoose, { Schema, Document } from 'mongoose';

export interface IOrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
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
  status: 'pending' | 'dispatched';
  created: string;
  createdAt: Date;
}

const OrderItemSchema = new Schema<IOrderItem>({
  id: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true }
});

const OrderSchema = new Schema<IOrder>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: false },
  address: { type: String, required: false },
  country: { type: String, required: false },
  paymentMethod: { type: String, required: true, default: 'cod' },
  total: { type: Number, required: true },
  items: [OrderItemSchema],
  status: { type: String, enum: ['pending', 'dispatched'], default: 'pending' },
  created: { type: String, required: true } // keeping original string format for backward compat
}, {
  timestamps: true
});

// Avoid compiling model multiple times in Next.js development
export default mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema);
