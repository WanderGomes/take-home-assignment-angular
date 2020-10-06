import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { DatepickerComponent } from './datepicker.component';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from '../../dashboard/dashboard-routing.module';
import { FormsModule } from '@angular/forms';
import { DollarPipe } from '../pipes/dollar.pipe';

describe('DatepickerComponent', () => {
    let component: DatepickerComponent;
    let fixture: ComponentFixture<DatepickerComponent>;

    const COMPONENTS = [
        DatepickerComponent
    ];

    const IMPORTS = [
        CommonModule,
        DashboardRoutingModule,
        FormsModule
    ];

    const PIPES = [
        DollarPipe
    ];

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [
                ...COMPONENTS,
                ...PIPES
            ],
            imports: [
                ...IMPORTS
            ],
            providers: [
                ...PIPES
            ],
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(DatepickerComponent);
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
     * Check @Input label
     *********************/
    it('should change @Input label',  waitForAsync(() => {
        fixture.whenStable().then(() => {
            const label = 'Datepicker';

            component.label = label;

            fixture.detectChanges();

            expect(component.label).toBe(label);
        });
    }));

    /**********************
     * Check @Input minDate
     *********************/
    it('should change @Input minDate',  waitForAsync(() => {
        fixture.whenStable().then(() => {
            let date = new Date();
            date = new Date(date.setMonth(date.getMonth() + 1));

            component.minDate = date;

            fixture.detectChanges();

            expect(component.minDate).toBe(date);
        });
    }));

    /**********************
     * Check @Output changeDate
     *********************/
    it('should change @Output changeDate',  waitForAsync(() => {
        let goalDate: Date = new Date();

        let date = new Date();
        date = new Date(date.setMonth(date.getMonth() + 2));

        component.selectedDate = date;

        component.changeDate.subscribe((date: Date) => goalDate = date);
        component.changeDate.emit(date);

        expect(date).toBe(goalDate);
    }));

    /**********************
     * Check increase month
     *********************/
    it('should increase month',  waitForAsync(() => {
        let goalDate: Date = new Date();

        let minDate = new Date();
        minDate = new Date(minDate.setMonth(minDate.getMonth() + 1));

        let expectedDate = new Date();
        expectedDate = new Date(expectedDate.setMonth(expectedDate.getMonth() + 2));

        component.minDate = minDate;
        component.selectedDate = minDate;
        component.changeDate.subscribe((date: Date) => goalDate = date);

        component.nextMonth();

        fixture.detectChanges();

        expect(goalDate.getMonth()).toBe(expectedDate.getMonth());
        expect(goalDate.getFullYear()).toBe(expectedDate.getFullYear());
    }));

    /**********************
     * Check decrease month
     *********************/
    it('should decrease month',  waitForAsync(() => {
        let goalDate: Date = new Date();

        let minDate = new Date();
        minDate = new Date(minDate.setMonth(minDate.getMonth() + 1));

        let expectedDate = new Date();
        expectedDate = new Date(expectedDate.setMonth(expectedDate.getMonth() + 2));

        component.minDate = minDate;
        component.selectedDate = minDate;
        component.changeDate.subscribe((date: Date) => goalDate = date);

        component.nextMonth();
        component.nextMonth();
        component.previousMonth();

        fixture.detectChanges();

        expect(goalDate.getMonth()).toBe(expectedDate.getMonth());
        expect(goalDate.getFullYear()).toBe(expectedDate.getFullYear());
    }));

    /**********************
     * Check increase year
     *********************/
    it('should increase year',  waitForAsync(() => {
        let goalDate: Date = new Date();

        let minDate = new Date();
        minDate = new Date(minDate.setFullYear(minDate.getFullYear() + 1));

        let expectedDate = new Date();
        expectedDate = new Date(expectedDate.setFullYear(expectedDate.getFullYear() + 2));

        component.minDate = minDate;
        component.selectedDate = minDate;
        component.changeDate.subscribe((date: Date) => goalDate = date);

        component.nextYear();

        fixture.detectChanges();

        expect(goalDate.getMonth()).toBe(expectedDate.getMonth());
        expect(goalDate.getFullYear()).toBe(expectedDate.getFullYear());
    }));

    /**********************
     * Check decrease year
     *********************/
    it('should decrease month',  waitForAsync(() => {
        let goalDate: Date = new Date();

        let minDate = new Date();
        minDate = new Date(minDate.setFullYear(minDate.getFullYear() + 1));

        let expectedDate = new Date();
        expectedDate = new Date(expectedDate.setFullYear(expectedDate.getFullYear() + 2));

        component.minDate = minDate;
        component.selectedDate = minDate;
        component.changeDate.subscribe((date: Date) => goalDate = date);

        component.nextYear();
        component.nextYear();
        component.previousYear();

        fixture.detectChanges();

        expect(goalDate.getMonth()).toBe(expectedDate.getMonth());
        expect(goalDate.getFullYear()).toBe(expectedDate.getFullYear());
    }));
});
