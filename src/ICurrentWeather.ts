export interface Weather {
	latitude: number;
	longitude: number;
	generationtime_ms: number;
	utc_offset_seconds: number;
	timezone: string;
	timezone_abbreviation: string;
	elevation: number;
	current_weather: CurrentWeather;
}

export interface CurrentWeather {
	temperature: number;
	windspeed: number;
	winddirection: number;
	weathercode: number | string;
	time: string;
}
