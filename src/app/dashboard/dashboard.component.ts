import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {SavingGoalsService} from "./shared/services/saving-goals.service";

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    constructor(private router: Router,
                private savingGoalsServices: SavingGoalsService) { }

    ngOnInit(): void {
        // this.openSimulation();
        this.savingGoalsServices.init();
    }

    openSimulation(): void {
        this.router.navigate(['/dashboard/saving-goals']);
    }
}
