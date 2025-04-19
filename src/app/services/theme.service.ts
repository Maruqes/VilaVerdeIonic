import { Injectable, Renderer2, RendererFactory2, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ThemeService {
    private renderer: Renderer2;
    private darkMode = new BehaviorSubject<boolean>(false);

    constructor(
        rendererFactory: RendererFactory2,
        @Inject(DOCUMENT) private document: Document
    ) {
        this.renderer = rendererFactory.createRenderer(null, null);
        this.initialize();
    }

    initialize() {
        // Check system preference or localStorage
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const storedPreference = localStorage.getItem('darkMode');

        // Set initial value
        if (storedPreference !== null) {
            this.darkMode.next(storedPreference === 'true');
        } else {
            this.darkMode.next(prefersDark);
        }

        // Apply theme immediately
        this.applyTheme(this.darkMode.value);

        // Listen for changes in system preference
        window.matchMedia('(prefers-color-scheme: dark)')
            .addEventListener('change', e => {
                if (localStorage.getItem('darkMode') === null) {
                    this.darkMode.next(e.matches);
                    this.applyTheme(e.matches);
                }
            });
    }

    isDarkMode(): Observable<boolean> {
        return this.darkMode.asObservable();
    }

    getCurrentValue(): boolean {
        return this.darkMode.value;
    }

    toggle() {
        const newValue = !this.darkMode.value;
        this.darkMode.next(newValue);
        localStorage.setItem('darkMode', newValue.toString());
        this.applyTheme(newValue);
    }

    private applyTheme(isDark: boolean) {
        // Remove existing theme class
        this.renderer.removeClass(
            this.document.body,
            isDark ? 'light-theme' : 'dark-theme'
        );

        // Add new theme class
        this.renderer.addClass(
            this.document.body,
            isDark ? 'dark-theme' : 'light-theme'
        );
    }
}