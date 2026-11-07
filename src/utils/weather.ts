import { fetchWeatherApi } from "openmeteo";

/** Open-Meteo API URL */
const url = "https://api.open-meteo.com/v1/forecast";

/** Weather types, including icons for day/night */
const weather: {
  [key: number]: { desc: string; dayIcon: string; nightIcon: string };
} = {
  0: { desc: "Clear sky", dayIcon: " ", nightIcon: " " },
  1: { desc: "Mainly clear", dayIcon: " ", nightIcon: " " },
  2: { desc: "Partly cloudy", dayIcon: " ", nightIcon: " " },
  3: { desc: "Overcast", dayIcon: " ", nightIcon: " " },
  45: { desc: "Fog", dayIcon: " ", nightIcon: " " },
  48: { desc: "Depositing rime fog", dayIcon: " ", nightIcon: " " },
  51: { desc: "Light drizzle", dayIcon: " ", nightIcon: " " },
  53: { desc: "Moderate drizzle", dayIcon: " ", nightIcon: " " },
  55: { desc: "Dense drizzle", dayIcon: " ", nightIcon: " " },
  56: { desc: "Light freezing drizzle", dayIcon: " ", nightIcon: " " },
  57: { desc: "Dense freezing drizzle", dayIcon: " ", nightIcon: " " },
  61: { desc: "Slight rain", dayIcon: " ", nightIcon: " " },
  63: { desc: "Moderate rain", dayIcon: " ", nightIcon: " " },
  65: { desc: "Heavy rain", dayIcon: " ", nightIcon: " " },
  66: { desc: "Light freezing rain", dayIcon: "󰙿 ", nightIcon: "󰙿 " },
  67: { desc: "Heavy freezing rain", dayIcon: "󰙿 ", nightIcon: "󰙿 " },
  71: { desc: "Slight snowfall", dayIcon: " ", nightIcon: " " },
  73: { desc: "Moderate snowfall", dayIcon: " ", nightIcon: " " },
  75: { desc: "Heavy snowfall", dayIcon: " ", nightIcon: " " },
  77: { desc: "Snow grains", dayIcon: " ", nightIcon: " " },
  80: { desc: "Slight rain showers", dayIcon: " ", nightIcon: " " },
  81: { desc: "Moderate rain showers", dayIcon: " ", nightIcon: " " },
  82: { desc: "Violent rain showers", dayIcon: " ", nightIcon: " " },
  85: { desc: "Slight snow showers", dayIcon: " ", nightIcon: " " },
  86: { desc: "Heavy snow showers", dayIcon: " ", nightIcon: " " },
  95: { desc: "Thunderstorm", dayIcon: " ", nightIcon: " " },
  96: {
    desc: "Thunderstorm with slight hail",
    dayIcon: "  ",
    nightIcon: " ",
  },
  97: { desc: "Heavy thunderstorm", dayIcon: " ", nightIcon: " " },
  99: { desc: "Thunderstorm with heavy hail", dayIcon: " ", nightIcon: " " },
};

const LAT = 0;
const LONG = 0;

/** Get weather information and print it in a format suitable for a status bar */
export const printStatusBarWeatherFormat = async () => {
  // Set parameters for the Open-Meteo API
  const params = {
    latitude: LAT,
    longitude: LONG,
    current: ["temperature_2m", "is_day", "weather_code"],
    forcast_days: 1,
    temperature_unit: "fahrenheit",
    precipitation_unit: "inch",
  };

  // Fetch the data from the API
  const responses = await fetchWeatherApi(url, params);

  // Process first location. Add a for-loop for multiple locations or weather models
  const response = responses[0];

  const current = response!.current()!;

  // Get each variable relevant to the display
  const temperature = Math.round(current.variables(0)!.value());
  const isDay = current.variables(1)!.value();
  const weatherCode = current.variables(2)!.value();

  // Format and print the data
  console.log(
    `${isDay ? weather[weatherCode]!.dayIcon : weather[weatherCode]!.nightIcon} ${temperature} °F`,
  );
};
