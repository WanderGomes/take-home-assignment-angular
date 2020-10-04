import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DatepickerComponent } from './datepicker/datepicker.component';
import { DollarPipe } from './pipes/dollar.pipe';

const COMPONENTS = [
    DatepickerComponent
];

const PARTIALS_COMPONENTS = [
];

const DIRECTIVES = [
];

const PIPES = [
    DollarPipe
];

const IMPORTS = [
    CommonModule
];

const SERVICES = [
];

@NgModule({
    declarations: [
        ...COMPONENTS,
        ...PARTIALS_COMPONENTS,
        ...DIRECTIVES,
        ...PIPES
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
        ...SERVICES,
        ...PIPES
    ],
    entryComponents: [
        ...PARTIALS_COMPONENTS
    ]
})
export class SharedModule { }
