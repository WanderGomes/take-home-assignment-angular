import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ThemeEnum } from '../enums/theme.enum';

@Injectable({
    providedIn: 'root'
})
export class ThemeService {

    private currentTheme: BehaviorSubject<ThemeEnum> = new BehaviorSubject<ThemeEnum>(null);

    constructor() { }

    init(): void {
        this.registerColorSchemeListerner();
    }

    setCurrentTheme(theme: ThemeEnum): void {
        this.currentTheme.next(theme);
    }

    getCurrentTheme(): BehaviorSubject<ThemeEnum> {
        return this.currentTheme;
    }

    changeColorSchemePref(isDark: boolean): void {
        if (isDark) {
            document.documentElement.classList.add('tk-theme--dark');
            this.setCurrentTheme(ThemeEnum.DARK);
        } else {
            document.documentElement.classList.remove('tk-theme--dark');
            this.setCurrentTheme(ThemeEnum.LIGHT);
        }
    }

    private registerColorSchemeListerner(): void {
        const colorSchemePrefs = window.matchMedia('(prefers-color-scheme: dark)');

        this.changeColorSchemePref(colorSchemePrefs.matches);

        colorSchemePrefs.addEventListener('change', (e) => {
            this.changeColorSchemePref(e.matches);
        });
    }
}
