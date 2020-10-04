import { Component, OnInit } from '@angular/core';
import {ThemeService} from '../../../core/services/theme.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

    constructor(private themeService: ThemeService) { }

    ngOnInit(): void {
    }

    changeToDarkMode(): void {
        this.themeService.changeColorSchemePref(true);
    }

    changeToLightMode(): void {
        this.themeService.changeColorSchemePref(false);
    }
}
