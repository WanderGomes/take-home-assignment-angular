import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ThemeService {

    constructor() { }

    init(): void {
        this.registerColorSchemeListerner();
    }

    private registerColorSchemeListerner(): void {
        const colorSchemePrefs = window.matchMedia('(prefers-color-scheme: dark)');

        this.changeColorSchemePref(colorSchemePrefs.matches);

        colorSchemePrefs.addEventListener('change', (e) => {
            this.changeColorSchemePref(e.matches);
        });
    }

    changeColorSchemePref(isDark: boolean): void {
        if (isDark) {
            document.documentElement.classList.add('tk-theme--dark');
        } else {
            document.documentElement.classList.remove('tk-theme--dark');
        }
    }
}
