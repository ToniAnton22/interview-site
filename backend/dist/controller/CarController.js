"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCarDetails = getCarDetails;
const CarRepository_1 = __importDefault(require("../repository/CarRepository"));
const carRepository = new CarRepository_1.default();
async function getCarDetails(req, res) {
    try {
        const car = await carRepository.findAll();
        if (!car) {
            res.status(404).json({ message: 'Car not found' });
            return;
        }
        res.json(car);
    }
    catch (error) {
        console.error('Error fetching car details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
