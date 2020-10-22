import {Component, OnDestroy, OnInit} from '@angular/core';
import {SavingGoal} from "../shared/models/saving-goal";
import {Router} from "@angular/router";
import {SavingGoalsService} from "../shared/services/saving-goals.service";
import {Subscription} from "rxjs";

@Component({
    selector: 'app-saving-goals',
    templateUrl: './saving-goals.component.html',
    styleUrls: ['./saving-goals.component.scss']
})
export class SavingGoalsComponent implements OnInit, OnDestroy {

    savingGoals: Array<SavingGoal>;

    savingGoalsSubscription: Subscription;

    constructor(private router: Router,
                private savingGoalsService: SavingGoalsService) {
    }

    ngOnInit(): void {
        this.registerListeners();
    }

    private registerListeners(): void {
        this.savingGoalsSubscription = this.savingGoalsService.getSavingGoals().subscribe((savingGoals: Array<SavingGoal>) => {
           this.savingGoals = savingGoals;
        });
    }

    openSimulation(savingGoal: SavingGoal): void {
        this.router.navigate([`/dashboard/simulation/${savingGoal.uuid}`]);
    }

    ngOnDestroy(): void {
        if (this.savingGoalsSubscription) {
            this.savingGoalsSubscription.unsubscribe();
        }
    }
}
