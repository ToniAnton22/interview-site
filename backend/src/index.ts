import express, { json } from 'express';
import { fetchWeatherApi } from 'openmeteo';
import { Request, Response } from 'express';
import cors from 'cors';
import config from 'dotenv';
import { connectDB } from './context/db';
import { getCarDetails } from './controller/CarController';

config.config();

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(json());
connectDB();

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the Home Page!');
});

app.get('/api/getWeather', async (req: Request, res: Response) => {
  const params = {
    latitude: 44.3285,
    longitude: 28.6065,
    hourly: ['temperature_2m', 'weather_code'],
  };
  const url = process.env.FORECAST_URL || 'localhost:3000';
  const responses = await fetchWeatherApi(url, params);
  const response = responses[0];

  const utcOffsetSeconds = response.utcOffsetSeconds();
  const hourly = response.hourly()!;

  const weatherData = {
    hourly: {
      time: [
        ...Array(
          (Number(hourly.timeEnd()) - Number(hourly.time())) /
            hourly.interval(),
        ),
      ].map(
        (_, i) =>
          new Date(
            (Number(hourly.time()) + i * hourly.interval() + utcOffsetSeconds) *
              1000,
          ),
      ),
      temperature2m: hourly.variables(0)!.valuesArray()!,
      weatherCode: hourly.variables(1)!.valuesArray()!,
    },
    location: {
      lat: response.latitude(),
      lng: response.longitude(),
    },
  };

  res.json(weatherData);
});

app.get('/api/getCars', getCarDetails);

app.use((req, res) => {
  res.status(404).send('Route not found.');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
