import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService, Item } from '../services/data.service';
import { ThemeService } from '../services/theme.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { TitleCasePipe } from '@angular/common';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
  standalone: false,
  providers: [TitleCasePipe]
})
export class MainPage implements OnInit, OnDestroy {

  popularItems$!: Observable<Item[]>;
  weatherData: any;
  weatherIconUrl: string | null = null;
  isDarkMode: boolean = false;
  private darkModeSubscription?: Subscription;

  constructor(
    private dataService: DataService,
    private router: Router,
    private http: HttpClient,
    private themeService: ThemeService
  ) { }

  ngOnInit() {
    this.popularItems$ = this.dataService.getPopular();
    this.fetchWeatherData();

    // Subscribe to dark mode changes
    this.isDarkMode = this.themeService.getCurrentValue();
    this.darkModeSubscription = this.themeService.isDarkMode().subscribe(
      isDark => {
        this.isDarkMode = isDark;
      }
    );
  }

  ngOnDestroy() {
    // Clean up subscription when component is destroyed
    if (this.darkModeSubscription) {
      this.darkModeSubscription.unsubscribe();
    }
  }

  toggleDarkMode() {
    this.themeService.toggle();
  }

  fetchWeatherData() {
    // Usar a URL da API definida no environment em vez do caminho relativo
    const apiUrl = environment.weatherApiUrl;
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
