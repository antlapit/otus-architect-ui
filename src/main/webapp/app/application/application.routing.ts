import {RouterModule, Routes} from '@angular/router';
import {ApplicationFormComponent, DashboardComponent, NewApplicationComponent, SettingsComponent} from './pages';
import {ApplicationComponent} from './application.component';
import {MainViewContainerComponent} from '../shared/main-view-container/main-view-container.component';
import {UnauthorizedContainerComponent} from '../shared/unauthorized-container/unauthorized-container.component';
import {LoginComponent} from '../shared/login/login.component';
import {AuthGuard} from '../core/auth/auth.guard';
import {HasSessionGuard} from '../core/auth/has-session.guard';

const SECURE_ROUTES: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    },
    {
        path: 'dashboard',
        pathMatch: 'full',
        component: DashboardComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'settings',
        pathMatch: 'full',
        canActivate: [AuthGuard],
        component: SettingsComponent,
    },
    {
        path: 'applications',
        canActivate: [AuthGuard],
        children: [
            {
                path: 'new',
                component: NewApplicationComponent,
                canActivate: [AuthGuard]
            },
            {
                path: ':finApplicationId',
                component: ApplicationFormComponent,
                canActivate: [AuthGuard]
            }
        ]
    }
];

const PUBLIC_ROUTES: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent,
    }
];

const applicationRoutes: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    },
    {
        path: '',
        component: UnauthorizedContainerComponent,
        children: PUBLIC_ROUTES,
        canActivate: [HasSessionGuard]
    },
    {
        path: '',
        component: MainViewContainerComponent,
        children: SECURE_ROUTES,
        canActivate: [AuthGuard]
    }
];

const rootApplicationRoutes: Routes = [
    {
        path: '',
        component: ApplicationComponent,
        children: applicationRoutes
    }
];


export const ApplicationPathRouting = RouterModule.forChild(rootApplicationRoutes);
