import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { SimulationComponent } from './simulation.component';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from '../dashboard-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { DollarPipe } from '../../shared/pipes/dollar.pipe';
import { By } from '@angular/platform-browser';

describe('SimulationComponent', () => {
    let component: SimulationComponent;
    let fixture: ComponentFixture<SimulationComponent>;

    const COMPONENTS = [
        SimulationComponent
    ];

    const IMPORTS = [
        CommonModule,
        DashboardRoutingModule,
        SharedModule,
        FormsModule
    ];

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [
                ...COMPONENTS
            ],
            imports: [
                ...IMPORTS
            ]
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(SimulationComponent);
            component = fixture.debugElement.componentInstance;

            fixture.detectChanges();
        });
    }));

    /**********************
     * Check if the component was created
     *********************/
    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    /**********************
     * Check the minGoalDate after the component init cycle
     *********************/
    it('should set minGoalDate and add one month', waitForAsync(() => {
        fixture.ngZone.run(() => {
            fixture.whenStable().then(() => {
                let minGoalDate = new Date();
                minGoalDate = new Date(minGoalDate.setMonth(minGoalDate.getMonth() + 1));

                expect(component.minGoalDate.getMonth()).toBe(minGoalDate.getMonth());
                expect(component.minGoalDate.getFullYear()).toBe(minGoalDate.getFullYear());
            });
        });
    }));

    /**********************
     * Check total amount format in Dollar
     *********************/
    it('should set total amount and format to Dollar format', waitForAsync(() => {
        fixture.ngZone.run(() => {
            fixture.whenStable().then(() => {
                const value = 123456789;
                const expectedString = '1,234,567.89';

                const mockTotalAmountValue = {
                    target: {
                        value
                    }
                };

                component.formatCurrency(mockTotalAmountValue);

                expect(component.totalAmount).toBe(expectedString);
            });
        });
    }));

    /**********************
     * Check change date
     *********************/
    it('should change date', waitForAsync(() => {
        fixture.ngZone.run(() => {
            fixture.whenStable().then(() => {
                let date = new Date();
                date = new Date(date.setMonth(date.getMonth() + 2));

                component.changeDate(date);

                expect(component.goalDate.toISOString()).toBe(date.toISOString());
            });
        });
    }));

    /**********************
     * Check installments
     *********************/
    it('should update installments', waitForAsync(() => {
        fixture.ngZone.run(() => {
            fixture.whenStable().then(() => {
                const value = 2500000;

                const mockTotalAmountValue = {
                    target: {
                        value
                    }
                };

                component.formatCurrency(mockTotalAmountValue);

                const installments = 48;

                let date = new Date();
                date = new Date(date.setMonth(date.getMonth() + installments));

                component.changeDate(date);

                expect(component.installments).toBe(installments);
            });
        });
    }));

    /**********************
     * Check monthly amout value
     *********************/
    it('should update installments', waitForAsync(() => {
        fixture.ngZone.run(() => {
            fixture.whenStable().then(() => {
                const value = 2500000;

                const mockTotalAmountValue = {
                    target: {
                        value
                    }
                };

                component.formatCurrency(mockTotalAmountValue);

                const installments = 48;

                let date = new Date();
                date = new Date(date.setMonth(date.getMonth() + installments));

                component.changeDate(date);

                const dollarPipe = new DollarPipe();

                const monthlyAmount = dollarPipe.transform(value / installments);

                expect(component.monthlyAmount).toBe(monthlyAmount);
            });
        });
    }));

    /**********************
     * Check submit action
     *********************/
    it('should submit form', waitForAsync(() => {
        fixture.ngZone.run(() => {
            fixture.whenStable().then(() => {
                fixture.detectChanges();

                const linkElement = fixture.debugElement.query(By.css('#tk-simulation__submit'));
                linkElement.triggerEventHandler('click', null);

                fixture.detectChanges();

                expect().nothing();
            });
        });
    }));
});
