import { Component } from '@angular/core';
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.scss'
})
export class WeatherComponent {
  city: string = '';
  weather: any;
  errorMessage: string = '';

  constructor(private weatherService: WeatherService) {}

  getWeather() {
    this.weatherService.getWeather(this.city).subscribe(
      data => {
        this.weather = data;
        this.errorMessage = '';
      },
      error => {
        this.errorMessage = 'City not found';
        console.error('Error fetching weather data:', error);
      }
    )
  }

  getWeatherIconUrl(icon: string): string {
    return `https://openweathermap.org/img/wn/${icon}@2x.png`;
  }
}
