import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ThemeService } from './services/theme.service';

const COMPONENTS = [
];

const PARTIALS_COMPONENTS = [
];

const DIRECTIVES = [
];

const PIPES = [
];

const IMPORTS = [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule
];

const SERVICES = [
    ThemeService
];

@NgModule({
    declarations: [
        ...COMPONENTS,
        ...PARTIALS_COMPONENTS,
        ...DIRECTIVES,
        ...PIPES,
    ],
    imports: [
        ...IMPORTS
    ],
    exports: [
        ...COMPONENTS,
        ...DIRECTIVES,
        ...PIPES
    ],
    providers: [
        ...SERVICES
    ],
    entryComponents: [
        ...PARTIALS_COMPONENTS
    ]
})
export class CoreModule { }
