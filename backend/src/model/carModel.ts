import mongoose, { Model, Schema, Document } from 'mongoose';

export interface ICar extends Document {
  name: string;
  year: number;
  selling_price: number;
  km_driven: number;
  fuel: string;
  seller_type: string;
  transmission: string;
  owner: string;
}

const carSchema: Schema<ICar> = new mongoose.Schema(
  {
    name: { type: String, required: true },
    year: { type: Number, required: true },
    selling_price: { type: Number, required: true },
    km_driven: { type: Number, required: true },
    fuel: { type: String, required: true },
    seller_type: { type: String, required: true },
    transmission: { type: String, required: true },
    owner: { type: String, required: true },
  },
  {
    collection: 'cars-dealer',
  },
);

export function getCarModel(): Model<ICar> {
  return mongoose.models.Car || mongoose.model<ICar>('Car', carSchema);
}
