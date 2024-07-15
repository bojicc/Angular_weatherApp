import { Component } from '@angular/core';
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent {
  city: string = '';
  weather: any;
  forecast: any[] = [];
  hourlyForecast: any[] = [];
  errorMessage: string = '';
  airQualityData: any;
  airPollutionData: any; 
  geocodingData: any;

  minTemp: number | undefined;
  maxTemp: number | undefined;
  humidity: number | undefined;
  windSpeed: number | undefined;
  visibility: number | undefined;
  pressure: number | undefined;
  sunrise: string | undefined;
  sunset: string | undefined;

  startCity: string = '';
  endCity: string = '';
  roadRiskData: any;

  constructor(private weatherService: WeatherService) {}

  getWeather() {
    this.weatherService.getWeather(this.city).subscribe(
      data => {
        this.weather = data;
        this.errorMessage = '';
        this.getForecast();
        this.extractStatistics(this.weather);
        this.getHourlyForecast();
        this.getAirPollutionDataForCity(); 
        this.getGeocoding();

        this.city = '';
        console.log(this.weather);
      },
      error => {
        this.errorMessage = 'City not found';
      }
      
    );
  }

  getForecast() {
    this.weatherService.getForecast(this.city).subscribe(
      data => {
        this.forecast = data.list.filter((item: any, index: number) => index % 8 == 0);
      },
      error => {
        console.error('Error fetching data: ', error);
      }
    );
  }

  getHourlyForecast() {
    this.weatherService.getHourlyForecast(this.city).subscribe(
      data => {
        this.hourlyForecast = data.list;
      },
      error => {
        console.error('Error fetching hourly forecast data:', error);
        this.errorMessage = 'Error fetching hourly forecast data. Please try again later.';
      }
    );
  }

  getRoadRisk() {
    if (this.startCity && this.endCity) {
      this.weatherService.getRoadRisk(this.startCity, this.endCity).subscribe(
        data => {
          this.roadRiskData = data;
        },
        error => {
          console.error('Error fetching road risk data:', error);
        }
      );
    }
  }

  getAirPollutionDataForCity() {
    this.weatherService.getWeather(this.city).subscribe(
      (data: any) => {
        const { coord } = data;
        this.weatherService.getAirPollutionData(coord.lat, coord.lon).subscribe(
          pollutionData => {
            this.airPollutionData = pollutionData;
          },
          error => {
            console.error('Error fetching air pollution data:', error);
          }
        );
      },
      error => {
        console.error('Error fetching weather data:', error);
      }
    );
  }

  getGeocoding() {
    this.weatherService.getGeocoding(this.city).subscribe(
      data => {
        this.geocodingData = data;
        console.log('Geocoding data:', this.geocodingData);
      },
      error => {
        console.error('Error fetching geocoding data:', error);
      }
    );
  }

  extractStatistics(weatherData: any) {
    this.minTemp = weatherData.main.temp_min;
    this.maxTemp = weatherData.main.temp_max;
    this.humidity = weatherData.main.humidity;
    this.windSpeed = weatherData.wind.speed;
    this.visibility = weatherData.visibility;
    this.pressure = weatherData.main.pressure;
    this.sunrise = new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString();
    this.sunset = new Date(weatherData.sys.sunset * 1000).toLocaleTimeString();
  }

  getWeatherIconUrl(icon: string): string {
    return `https://openweathermap.org/img/wn/${icon}@2x.png`;
  }
}
