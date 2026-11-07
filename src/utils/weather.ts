import { fetchWeatherApi } from "openmeteo";

const url = "https://api.open-meteo.com/v1/forecast";

const LAT = 0;
const LONG = 0;

export const printWaybarWeatherFormat = async () => {
  const params = {
    latitude: LAT,
    longitude: LONG,
    current: [
      "temperature_2m",
      "is_day",
      "cloud_cover",
      "rain",
      "showers",
      "snowfall",
    ],
    forcast_days: 1,
    temperature_unit: "fahrenheit",
    precipitation_unit: "inch",
  };

  const responses = await fetchWeatherApi(url, params);

  // Process first location. Add a for-loop for multiple locations or weather models
  const response = responses[0];

  const current = response!.current()!;

  const temperature = Math.round(current.variables(0)!.value());
  const isDay = current.variables(1)!.value();
  const cloudCover = current.variables(2)!.value();
  const rain = current.variables(3)!.value();
  const showers = current.variables(4)!.value();
  const snowfall = current.variables(5)!.value();

  console.log(`{"text": "${temperature} °F"}`);
};
