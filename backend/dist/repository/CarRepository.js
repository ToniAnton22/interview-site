"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const carModel_js_1 = require("../model/carModel.js");
class CarRepository {
    constructor() {
        this.Car = (0, carModel_js_1.getCarModel)();
    }
    async findAll() {
        return this.Car.find();
    }
    async findById(id) {
        return this.Car.findById(id);
    }
    async create(carData) {
        const car = new this.Car(carData);
        return car.save();
    }
    async update(id, updateData) {
        return this.Car.findByIdAndUpdate(id, updateData, { new: true });
    }
    async delete(id) {
        return this.Car.findByIdAndDelete(id);
    }
}
exports.default = CarRepository;
