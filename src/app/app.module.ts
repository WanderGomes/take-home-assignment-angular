import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';

const MAIN_COMPONENTS = [
    AppComponent
];

const COMPONENTS = [
    ...MAIN_COMPONENTS
];

const IMPORTS = [
    BrowserModule,
    AppRoutingModule,
    CoreModule
];

@NgModule({
    declarations: [
        ...COMPONENTS
    ],
    imports: [
        ...IMPORTS
    ],
    bootstrap: [
        ...MAIN_COMPONENTS
    ]
})
export class AppModule { }
