import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { SimulationComponent } from './simulation/simulation.component';

const COMPONENTS = [
    DashboardComponent,
    NavbarComponent,
    SimulationComponent
];

const PARTIALS_COMPONENTS = [
];

const DIRECTIVES = [
];

const PIPES = [
];

const IMPORTS = [
    CommonModule,
    DashboardRoutingModule
];

const SERVICES = [
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
export class DashboardModule { }
