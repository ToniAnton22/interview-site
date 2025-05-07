"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCarModel = getCarModel;
const mongoose_1 = __importDefault(require("mongoose"));
const carSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    year: { type: Number, required: true },
    selling_price: { type: Number, required: true },
    km_driven: { type: Number, required: true },
    fuel: { type: String, required: true },
    seller_type: { type: String, required: true },
    transmission: { type: String, required: true },
    owner: { type: String, required: true },
}, {
    collection: 'cars-dealer',
});
function getCarModel() {
    return mongoose_1.default.models.Car || mongoose_1.default.model('Car', carSchema);
}
