import {RouterModule, Routes} from '@angular/router';
import {
    ApplicationFormComponent,
    DashboardComponent,
    NewApplicationComponent,
    ProductFormComponent,
    SettingsComponent
} from './pages';
import {ApplicationComponent} from './application.component';
import {MainViewContainerComponent} from '../shared/main-view-container/main-view-container.component';
import {UnauthorizedContainerComponent} from '../shared/unauthorized-container/unauthorized-container.component';
import {LoginComponent} from '../shared/login/login.component';
import {AuthGuard} from '../core/auth/auth.guard';
import {HasSessionGuard} from '../core/auth/has-session.guard';
import {CatalogComponent} from "./pages";
import {RegisterComponent} from "../shared/register/register.component";

const CATALOG_ROUTES: Routes = [
    {
        path: '',
        redirectTo: 'catalog',
        pathMatch: 'full'
    },
    {
        path: 'catalog',
        pathMatch: 'full',
        component: CatalogComponent,
    },
    {
        path: 'catalog/:productId',
        component: ProductFormComponent,
    }
];

const ONLY_PRIVATE_ROUTES: Routes = [
    {
        path: 'dashboard',
        pathMatch: 'full',
        component: DashboardComponent,
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

const ONLY_PUBLIC_ROUTES: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'register',
        component: RegisterComponent,
    }
];

const applicationRoutes: Routes = [
    {
        path: '',
        redirectTo: 'catalog',
        pathMatch: 'full'
    },
    {
        path: '',
        component: MainViewContainerComponent,
        children: CATALOG_ROUTES,
    },
    {
        path: '',
        component: UnauthorizedContainerComponent,
        children: ONLY_PUBLIC_ROUTES,
        canActivate: [HasSessionGuard]
    },
    {
        path: '',
        component: MainViewContainerComponent,
        children: ONLY_PRIVATE_ROUTES,
        canActivate: [AuthGuard],
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
