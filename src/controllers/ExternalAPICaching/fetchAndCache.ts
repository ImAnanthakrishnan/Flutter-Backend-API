import axios from "axios";
import { Request, Response } from "express";
import { cache } from "../../middlewares/cache/cacheMiddleware";

export const getWeatherData = async (req: Request, res: Response) => {
  const { city } = req.params;
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.WEATHER_API}`
    );
    const data = response.data;

    const key = req.originalUrl;
    cache[key] = { value: data, timestamp: Date.now() };
    res.status(200).json({
      message: "Success",
      data,
    });
   
  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).json({ message: "Error fetching weather data" });
  }
};
