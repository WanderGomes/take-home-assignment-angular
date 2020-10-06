import { Component, OnDestroy, OnInit } from '@angular/core';
import { ThemeService } from '../../../core/services/theme.service';
import { ThemeEnum } from '../../../core/enums/theme.enum';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {

    currentTheme: ThemeEnum;

    private themeSubscription: Subscription;

    constructor(private themeService: ThemeService) { }

    ngOnInit(): void {
        this.registerListerners();
    }

    changeToDarkMode(): void {
        this.themeService.changeColorSchemePref(true);
    }

    changeToLightMode(): void {
        this.themeService.changeColorSchemePref(false);
    }

    private registerListerners(): void {
        this.themeSubscription = this.themeService.getCurrentTheme().subscribe((theme: ThemeEnum) => {
            if (theme) {
                this.currentTheme = theme;
            }
        });
    }

    ngOnDestroy(): void {
        if (this.themeSubscription) {
            this.themeSubscription.unsubscribe()
        }
    }
}
