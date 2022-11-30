export interface IWeather {
	latitude: number;
	longitude: number;
	generationtime_ms: number;
	utc_offset_seconds: number;
	timezone: string;
	timezone_abbreviation: string;
	elevation: number;
	current_weather: ICurrentWeather;
}

export interface ICurrentWeather {
	temperature: number;
	windspeed: number;
	winddirection: number;
	weathercode: number | string;
	time: string;
}
