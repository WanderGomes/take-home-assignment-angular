import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';
import { By } from '@angular/platform-browser';
import { ThemeEnum } from '../../../core/enums/theme.enum';

describe('NavbarComponent', () => {
    let component: NavbarComponent;
    let fixture: ComponentFixture<NavbarComponent>;

    const COMPONENTS = [
        NavbarComponent
    ];

    function triggerChangeTheme(linkId: string): void {
        fixture.detectChanges();

        let linkElement = fixture.debugElement.query(By.css(linkId));
        linkElement.triggerEventHandler('click', null);

        fixture.detectChanges();
    }

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [
                ...COMPONENTS
            ]
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(NavbarComponent);
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
     * Check if change to dark mode
     *********************/
    it('should change theme to dark',  waitForAsync(() => {
        triggerChangeTheme('#tk-nav__dark-mode');

        fixture.whenStable().then(() => {
            expect(component.currentTheme).toBe(ThemeEnum.DARK.toString());
        });
    }));

    /**********************
     * Check if change to light mode
     *********************/
    it('should change theme to light',  waitForAsync(() => {
        triggerChangeTheme('#tk-nav__light-mode');

        fixture.whenStable().then(() => {
            expect(component.currentTheme).toBe(ThemeEnum.LIGHT.toString());
        });
    }));
});
