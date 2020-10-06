import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
    selector: 'app-datepicker',
    templateUrl: './datepicker.component.html',
    styleUrls: ['./datepicker.component.scss']
})
export class DatepickerComponent implements OnInit {

    @ViewChild('inputDate') inputDateElement: ElementRef;
    @ViewChild('leftArrow') leftArrowElement: ElementRef;
    @ViewChild('rightArrow') rightArrowElement: ElementRef;

    @Input() label: string;
    @Input() minDate: Date;

    @Output() changeDate = new EventEmitter<Date>();

    selectedDate = new Date();

    selectedMonth: string;

    selectedYear: string;

    constructor() { }

    ngOnInit(): void {
        if (!this.minDate) {
            this.resetDate();
        } else {
            this.selectedDate = new Date(this.minDate.valueOf());
            this.setSelectedInfo();
        }
    }

    handleKeyPress(event): void {
        const LEFT_ARROW_KEY = [37, 'ArrowLeft'];
        const RIGHT_ARROW_KEY = [39, 'ArrowRight'];
        const UP_ARROW_KEY = [38, 'ArrowUp'];
        const DOWN_ARROW_KEY = [40, 'ArrowDown'];

        const allowedKeys = [
            ...LEFT_ARROW_KEY,
            ...RIGHT_ARROW_KEY,
            ...UP_ARROW_KEY,
            ...DOWN_ARROW_KEY
        ];

        const key: string | number = event.key || event.keyCode;

        if (allowedKeys.includes(key)) {
            if (LEFT_ARROW_KEY.includes(key)) {
                this.focusLeftArrow();
                this.previousMonth();
            }

            if (RIGHT_ARROW_KEY.includes(key)) {
                this.focusRightArrow();
                this.nextMonth();
            }

            if (UP_ARROW_KEY.includes(key)) {
                this.cleanArrowsFocus();
                this.nextYear();
            }

            if (DOWN_ARROW_KEY.includes(key)) {
                this.cleanArrowsFocus();
                this.previousYear();
            }
        }
    }

    nextMonth(): void {
        const newDate = new Date(this.selectedDate.setMonth(this.selectedDate.getMonth() + 1));

        this.change(newDate);
    }

    previousMonth(): void {
        const newDate = new Date(this.selectedDate.setMonth(this.selectedDate.getMonth() - 1));

        this.change(newDate);
    }

    nextYear(): void {
        const newDate = new Date(this.selectedDate.setFullYear(this.selectedDate.getFullYear() + 1));

        this.change(newDate);
    }

    previousYear(): void {
        const newDate = new Date(this.selectedDate.setFullYear(this.selectedDate.getFullYear() - 1));

        this.change(newDate);
    }

    focusInputDate(): void {
        this.inputDateElement.nativeElement.focus();
    }

    private focusLeftArrow(): void {
        this.cleanArrowsFocus();
        this.leftArrowElement.nativeElement.focus();
        this.cleanFocusAfterAction();
    }

    private focusRightArrow(): void {
        this.cleanArrowsFocus();
        this.rightArrowElement.nativeElement.focus();
        this.cleanFocusAfterAction();
    }

    private cleanArrowsFocus(): void {
        this.focusInputDate();
        this.leftArrowElement.nativeElement.blur();
        this.rightArrowElement.nativeElement.blur();
    }

    private cleanFocusAfterAction(): void {
        setTimeout(() => {
            this.cleanArrowsFocus();
        }, 75);
    }

    private setSelectedInfo(): void {
        this.selectedMonth = this.selectedDate.toLocaleString('en-US', { month: 'long' });
        this.selectedYear = this.selectedDate.getFullYear().toString();

        this.changeDate.emit(this.selectedDate);
    }

    private change(date: Date): void {
        if (this.canChangeDate(date)) {
            this.selectedDate = date;
            this.setSelectedInfo();
        } else {
            this.resetDate();
        }
    }

    private canChangeDate(newDate: Date): boolean {
        return newDate > this.minDate;
    }

    private resetDate(): void {
        if (!this.minDate) {
            this.minDate = new Date();
            this.minDate = new Date(this.minDate.setMonth(this.minDate.getMonth() + 1));
        }

        this.selectedDate = new Date(this.minDate.valueOf());

        this.setSelectedInfo();
    }
}
