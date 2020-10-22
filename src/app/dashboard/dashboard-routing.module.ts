import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { SimulationComponent } from './simulation/simulation.component';
import { SavingGoalsComponent } from "./saving-goals/saving-goals.component";

const dashboardRoutes: Routes = [
    {
        path: '',
        component: DashboardComponent,
        children: [
            {
               path: 'saving-goals',
               component: SavingGoalsComponent
            },
            {
                path: 'simulation/:uuid',
                component: SimulationComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(dashboardRoutes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule { }
