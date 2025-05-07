"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
const openmeteo_1 = require("openmeteo");
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = require("./context/db");
const CarController_1 = require("./controller/CarController");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = 3000;
// Middleware
app.use((0, cors_1.default)());
app.use((0, express_1.json)());
(0, db_1.connectDB)();
// Routes
app.get('/', (req, res) => {
    res.send('Welcome to the Home Page!');
});
app.get('/api/getWeather', async (req, res) => {
    const params = {
        latitude: 44.3285,
        longitude: 28.6065,
        hourly: ['temperature_2m', 'weather_code'],
    };
    const url = process.env.FORECAST_URL || 'localhost:3000';
    const responses = await (0, openmeteo_1.fetchWeatherApi)(url, params);
    const response = responses[0];
    const utcOffsetSeconds = response.utcOffsetSeconds();
    const hourly = response.hourly();
    const weatherData = {
        hourly: {
            time: [
                ...Array((Number(hourly.timeEnd()) - Number(hourly.time())) /
                    hourly.interval()),
            ].map((_, i) => new Date((Number(hourly.time()) + i * hourly.interval() + utcOffsetSeconds) *
                1000)),
            temperature2m: hourly.variables(0).valuesArray(),
            weatherCode: hourly.variables(1).valuesArray(),
        },
        location: {
            lat: response.latitude(),
            lng: response.longitude(),
        },
    };
    res.json(weatherData);
});
app.get('/api/getCars', CarController_1.getCarDetails);
app.use((req, res) => {
    res.status(404).send('Route not found.');
});
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
