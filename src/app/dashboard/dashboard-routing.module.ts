import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardModule } from './dashboard.module';
import { SimulationComponent } from './simulation/simulation.component';

const routes: Routes = [
    {
        path: '',
        component: DashboardModule,
        redirectTo: '/simulation',
        children: [
            {
                path: 'simulation',
                component: SimulationComponent
            }
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
