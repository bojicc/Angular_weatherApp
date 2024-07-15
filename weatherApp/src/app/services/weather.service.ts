import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiKey = '817dfb1910c3dac5f9deab2f1c427597';
  private apiWeather = `https://api.openweathermap.org/data/2.5/weather?appid=${this.apiKey}&units=metric`;
  private forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?appid=${this.apiKey}&units=metric`;
  private roadRiskUrl = `/api/v3/route/risk?appid=${this.apiKey}`;
  private airPollutionUrl = `https://api.openweathermap.org/data/2.5/air_pollution?appid=${this.apiKey}`;

  constructor(private http: HttpClient) { }

  getWeather(city: string): Observable<any> {
    return this.http.get<any>(`${this.apiWeather}&q=${city}`);
  }

  getForecast(city: string): Observable<any> {
    return this.http.get<any>(`${this.forecastUrl}&q=${city}`);
  }

  getHourlyForecast(city: string): Observable<any> {
    const hourlyForecastUrl = `${this.forecastUrl}&q=${city}&cnt=8`;
    return this.http.get<any>(hourlyForecastUrl);
  }

  getRoadRisk(start: string, end: string): Observable<any> {
    const url = `${this.roadRiskUrl}&start=${start}&end=${end}`;
    return this.http.get<any>(url);
  }

  getAirPollutionData(latitude: number, longitude: number): Observable<any> {
    const url = `${this.airPollutionUrl}&lat=${latitude}&lon=${longitude}`;
    return this.http.get<any>(url);
  }
}
