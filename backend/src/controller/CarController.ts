import { Request, Response } from 'express';
import CarRepository from '../repository/CarRepository';

const carRepository = new CarRepository();

export async function getCarDetails(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const car = await carRepository.findAll();
    if (!car) {
      res.status(404).json({ message: 'Car not found' });
      return;
    }
    res.json(car);
  } catch (error) {
    console.error('Error fetching car details:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
