import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Location } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AppComponent } from './app.component';
import { appRoutes, AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';

describe('AppComponent', () => {
    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;
    let router: Router;
    let location: Location;

    beforeEach(waitForAsync(() => {
        const COMPONENTS = [
            AppComponent
        ];

        const IMPORTS = [
            BrowserModule,
            AppRoutingModule,
            CoreModule,
            RouterTestingModule.withRoutes(appRoutes)
        ];

        TestBed.configureTestingModule({
            declarations: [
                ...COMPONENTS
            ],
            imports: [
                ...IMPORTS
            ]
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(AppComponent);
            component = fixture.debugElement.componentInstance;
            router = TestBed.inject(Router);
            location = TestBed.inject(Location);

            fixture.detectChanges();
            fixture.ngZone.run(() => {
                router.initialNavigation();
            });
        });
    }));

    /**********************
     * Test to check if the component was created
     *********************/
    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    /**********************
     * Check if the main route redirect is correct
     *********************/
    it('should redirect to /dashboard when navigate to ""', waitForAsync(() => {
        fixture.ngZone.run(() => {
            fixture.whenStable().then(() => {
                router.navigate(['']).then(() => {
                    expect(location.path()).toEqual('/dashboard');
                });
            });
        });
    }));

    /**********************
     * Check the redirect to dashboard if the user change the url to an unknown route
     *********************/
    it('should redirect to /dashboard when navigate to any route', waitForAsync(() => {
        fixture.ngZone.run(() => {
            fixture.whenStable().then(() => {
                router.navigate(['asdasd']).then(() => {
                    expect(location.path()).toEqual('/dashboard');
                });
            });
        });
    }));
});
