import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiKey = '817dfb1910c3dac5f9deab2f1c427597';
  private apiWeather = `https://api.openweathermap.org/data/2.5/weather?appid=${this.apiKey}&units=metric`;

  constructor(private http: HttpClient) { }

  getWeather(city: string): Observable<any> {
    return this.http.get<any>(`${this.apiWeather}&q=${city}`);
  }
}
