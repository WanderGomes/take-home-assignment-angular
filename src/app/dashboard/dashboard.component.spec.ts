import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { SimulationComponent } from './simulation/simulation.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../shared/shared.module';

describe('DashboardComponent', () => {
    let component: DashboardComponent;
    let fixture: ComponentFixture<DashboardComponent>;
    let router: Router;
    let location: Location;

    beforeEach(waitForAsync(() => {
        const COMPONENTS = [
            DashboardComponent,
            NavbarComponent,
            SimulationComponent
        ];

        const IMPORTS = [
            CommonModule,
            DashboardRoutingModule,
            SharedModule,
            FormsModule,
            RouterTestingModule.withRoutes([{
                path: 'dashboard',
                component: DashboardComponent,
                children: [
                    {
                        path: 'simulation',
                        component: SimulationComponent
                    }
                ]
            }])
        ];

        TestBed.configureTestingModule({
            declarations: [
                ...COMPONENTS
            ],
            imports: [
                ...IMPORTS
            ]
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(DashboardComponent);
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
     * Check if the component was created
     *********************/
    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    /**********************
     * Check the redirect to '/dashboard/simulation' after the component init cycle
     *********************/
    it('should redirect to /dashboard/simulation on the component init cycle', waitForAsync(() => {
        fixture.ngZone.run(() => {
            fixture.whenStable().then(() => {
                expect(location.path()).toEqual('/dashboard/simulation');
            });
        });
    }));
});
