import { TestBed, waitForAsync } from '@angular/core/testing';
import { ThemeService } from './theme.service';
import { ThemeEnum } from '../enums/theme.enum';

describe('ThemeService', () => {
    let service: ThemeService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(ThemeService);
    });

    /**********************
     * Check if the component was created
     *********************/
    it('should create the service', () => {
        expect(service).toBeTruthy();
    });

    /**********************
     * Check if change theme
     *********************/
    it('should change and emit selected theme',  waitForAsync(() => {
        service.changeColorSchemePref(true);

        service.getCurrentTheme().subscribe((theme: ThemeEnum) => {
            expect(theme).toBe(ThemeEnum.DARK);
        });
    }));

    /**********************
     * Check theme subscription
     *********************/
    it('should change and emit selected theme',  waitForAsync(() => {
        service.setCurrentTheme(ThemeEnum.DARK);

        service.getCurrentTheme().subscribe((theme: ThemeEnum) => {
            expect(theme).toBe(ThemeEnum.DARK);
        });
    }));
});
