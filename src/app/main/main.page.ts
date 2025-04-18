import { Component, OnInit } from '@angular/core';
import { DataService, Item } from '../services/data.service'; // Import DataService and Item
import { Observable } from 'rxjs'; // Import Observable
import { Router } from '@angular/router'; // Import Router
import { HttpClient } from '@angular/common/http'; // Import HttpClient
import { TitleCasePipe } from '@angular/common'; // Import TitleCasePipe

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
  standalone: false,
  providers: [TitleCasePipe] // Provide TitleCasePipe
})
export class MainPage implements OnInit {

  popularItems$!: Observable<Item[]>; // Use Observable for async data
  weatherData: any; // Property to hold weather data
  weatherIconUrl: string | null = null; // Property for weather icon URL

  constructor(
    private dataService: DataService, // Inject DataService
    private router: Router, // Inject Router
    private http: HttpClient // Inject HttpClient
  ) { }

  ngOnInit() {
    this.popularItems$ = this.dataService.getPopular(); // Fetch popular items
    this.fetchWeatherData(); // Fetch weather data on init
  }

  fetchWeatherData() {
    const apiUrl = '/vilaverde-api/vilaverde'; // Use the proxy path
    this.http.get(apiUrl).subscribe({
      next: (data: any) => {
        this.weatherData = data;
        if (data.weather && data.weather[0]) {
          // Construct the icon URL using OpenWeatherMap's standard URL format
          this.weatherIconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        } else {
          this.weatherIconUrl = null; // Ensure icon URL is null if data is incomplete
        }
        console.log('Weather data:', this.weatherData);
      },
      error: (error) => {
        console.error('Error fetching weather data:', error);
        // Provide default data on error, including missing fields
        this.weatherData = {
          name: 'Vila Verde',
          main: {
            temp: 0, // Default temperature
            feels_like: 0, // Default feels like
            humidity: 0 // Default humidity
          },
          weather: [{ description: 'Tempo indisponível', icon: '01d' }] // Default description and icon
        };
        // Set a default icon URL or handle appropriately
        this.weatherIconUrl = `https://openweathermap.org/img/wn/${this.weatherData.weather[0].icon}@2x.png`; // Use default icon
        console.log('Using default weather data due to API error.');
      }
    });
  }

  // Function to navigate to item detail page
  goToItemDetail(itemId: number) {
    this.router.navigate(['/item-detail', itemId]);
  }

}
