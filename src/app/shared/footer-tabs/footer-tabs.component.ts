import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-footer-tabs',
  templateUrl: './footer-tabs.component.html',
  styleUrls: ['./footer-tabs.component.scss'],
  standalone: false,
})
export class FooterTabsComponent implements OnInit {
  currentUrl: string = '';

  constructor(private router: Router) { }

  ngOnInit() {
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.currentUrl = event.urlAfterRedirects;
    });
    // Set initial URL
    this.currentUrl = this.router.url;
  }

  isTabActive(tabUrl: string): boolean {
    return this.currentUrl === tabUrl;
  }
}
