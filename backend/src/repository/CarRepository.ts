import { getCarModel } from '../model/carModel.js';
import { ICar } from '../model/carModel.js';

export default class CarRepository {
  private Car = getCarModel();

  async findAll(): Promise<ICar[]> {
    return this.Car.find();
  }

  async findById(id: string): Promise<ICar | null> {
    return this.Car.findById(id);
  }

  async create(carData: Partial<ICar>): Promise<ICar> {
    const car = new this.Car(carData);
    return car.save();
  }

  async update(id: string, updateData: Partial<ICar>): Promise<ICar | null> {
    return this.Car.findByIdAndUpdate(id, updateData, { new: true });
  }

  async delete(id: string): Promise<ICar | null> {
    return this.Car.findByIdAndDelete(id);
  }
}