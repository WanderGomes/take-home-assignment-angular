import {Injectable, OnInit} from '@angular/core';
import {SavingGoal} from "../models/saving-goal";
import {BehaviorSubject} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class SavingGoalsService {

    private readonly STORAGE_KEY: string = 'SAVING_GOALS';

    private savingGoals: BehaviorSubject<Array<SavingGoal>>;

    constructor() {
    }

    init(): void {
        this.savingGoals = new BehaviorSubject<Array<SavingGoal>>([]);

        this.getSavingGoalsFromLocalStorage();

        if (!this.savingGoals.getValue().length) {
            this.generateEmptyCollection();
        }
    }

    private generateEmptyCollection(): void {
        const savingGoals: Array<SavingGoal> = [{
            uuid: 'go-to-college',
            icon: 'tk-icon tk-buy-house',
            title: 'Go to college'
        }, {
            uuid: 'take-a-vacation',
            icon: 'tk-icon tk-buy-house',
            title: 'Take a vacation'
        }, {
            uuid: 'buy-a-car',
            icon: 'tk-icon tk-buy-house',
            title: 'Buy a car'
        }, {
            uuid: 'throw-a-wedding-party',
            icon: 'tk-icon tk-buy-house',
            title: 'Throw a wedding party'
        }, {
            uuid: 'build-an-emergency-fund',
            icon: 'tk-icon tk-buy-house',
            title: 'Build an emergency fund'
        }, {
            uuid: 'have-a-baby',
            icon: 'tk-icon tk-buy-house',
            title: 'Have a baby'
        }];

        this.savingGoals.next(savingGoals);

        this.saveInLocalStorage();
    }

    getSavingGoals(): BehaviorSubject<Array<SavingGoal>> {
        if (this.savingGoals) {
            this.getSavingGoalsFromLocalStorage();
        }
        return this.savingGoals;
    }

    getSavingGoalByUuid(uuid: string): SavingGoal {
        return this.savingGoals.getValue().find((saving: SavingGoal) => saving.uuid === uuid);
    }

    updateSavingGoal(savingGoal: SavingGoal): void {
        const savingGoals: Array<SavingGoal> = this.savingGoals.getValue().map((saving: SavingGoal) => {
            if (saving.uuid == savingGoal.uuid) {
                saving = savingGoal
            }
            return saving;
        });
        this.savingGoals.next(savingGoals);
        this.saveInLocalStorage();
    }

    private saveInLocalStorage(): void {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.savingGoals.getValue()));
    }

    private getSavingGoalsFromLocalStorage(): void {
        const colection: string = localStorage.getItem(this.STORAGE_KEY);

        if (colection) {
            const savingGoals: Array<SavingGoal> = JSON.parse(colection);
            this.savingGoals.next(savingGoals);
        }
    }
}

