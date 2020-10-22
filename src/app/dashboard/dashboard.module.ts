import {DEFAULT_CURRENCY_CODE, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { SimulationComponent } from './simulation/simulation.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { NgxMaskModule } from "ngx-mask";
import { SavingGoalsComponent } from './saving-goals/saving-goals.component';
import {SavingGoalsService} from "./shared/services/saving-goals.service";

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
    DashboardRoutingModule,
    SharedModule,
    FormsModule,
    NgxMaskModule.forChild()
];

const SERVICES = [
    SavingGoalsService,
    {
        provide: DEFAULT_CURRENCY_CODE,
        useValue: 'USD'
    }
];

@NgModule({
    declarations: [
        ...COMPONENTS,
        ...PARTIALS_COMPONENTS,
        ...DIRECTIVES,
        ...PIPES,
        SavingGoalsComponent,
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
