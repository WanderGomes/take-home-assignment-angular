import {Component, OnDestroy, OnInit} from '@angular/core';
import { DollarPipe } from '../../shared/pipes/dollar.pipe';
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {SavingGoal} from "../shared/models/saving-goal";
import {SavingGoalsService} from "../shared/services/saving-goals.service";

@Component({
    selector: 'app-simulation',
    templateUrl: './simulation.component.html',
    styleUrls: ['./simulation.component.scss']
})
export class SimulationComponent implements OnInit, OnDestroy {

    totalAmount: string;

    monthlyAmount: string;

    installments = 1;

    currentDate = new Date();

    minGoalDate: Date;

    goalDate: Date;

    goalMonth: string;

    goalYear: string;

    paramsSubscription: Subscription;

    savingGoalUuid: string;

    savingGoal: SavingGoal;

    private readonly EMPTY_VALUE: string = '0.00';

    constructor(private dollarPipe: DollarPipe,
                private router: Router,
                private route: ActivatedRoute,
                private savingGoalsService: SavingGoalsService) {
    }

    ngOnInit(): void {
        this.initGoalDate();

        this.registerListeners();
    }

    private registerListeners(): void {
        this.paramsSubscription = this.route.params.subscribe(param => {
            this.savingGoalUuid = param.uuid;
            // TODO: RECUPERAR
            this.savingGoal = this.savingGoalsService.getSavingGoalByUuid(this.savingGoalUuid);
        });
    }

    formatCurrency(event): void {
        this.totalAmount = this.transformToDollars(event.target.value);
        if (!this.totalAmount || this.totalAmount === this.EMPTY_VALUE) {
            this.totalAmount = undefined;
            this.monthlyAmount = this.EMPTY_VALUE;
        } else {
            this.updateMonthlyAmount();
        }
    }

    changeDate(date: Date): void {
        this.goalDate = date;
        this.installments = this.getMonthDiff(date);
        this.updateMonthlyAmount();
        this.updateGoalInfo(date);
    }

    addPlanning(): void {
        this.savingGoal.monthlyValue = this.monthlyAmount;
        this.savingGoal.goalMonth = this.goalMonth;
        this.savingGoal.goalYear = this.goalYear;

        // TODO: SALVAR
        this.savingGoalsService.updateSavingGoal(this.savingGoal);

        this.router.navigate(['/dashboard/saving-goals']);
    }

    isDisabled(): boolean {
        let retorno: boolean = false;

        if (!this.totalAmount) {
            retorno = true;
        } else {
            retorno = !!this.totalAmount.match(".*[a-z].*");
        }

        return retorno
    }

    private initGoalDate(): void {
        this.minGoalDate = new Date();
        this.minGoalDate = new Date(this.minGoalDate.setMonth(this.minGoalDate.getMonth() + 1));

        this.updateGoalInfo(this.minGoalDate);
    }

    private updateMonthlyAmount(): void {
        if (this.totalAmount) {
            const total = parseInt(this.totalAmount.replace(/\D/g, ''), 10);
            const monthlyAmount =  total / this.installments;
            this.monthlyAmount = this.transformToDollars(monthlyAmount);
        }
    }

    private transformToDollars(value: string | number): string {
        return this.dollarPipe.transform(value);
    }

    private getMonthDiff(dateTo: Date): number {
        return dateTo.getMonth() - this.currentDate.getMonth() + (12 * (dateTo.getFullYear() - this.currentDate.getFullYear()));
    }

    private updateGoalInfo(dateTo: Date): void {
        this.goalMonth = dateTo.toLocaleString('en-US', { month: 'long' });
        this.goalYear = dateTo.getFullYear().toString();
    }

    ngOnDestroy(): void {
        if (this.paramsSubscription) {
            this.paramsSubscription.unsubscribe();
        }
    }
}
