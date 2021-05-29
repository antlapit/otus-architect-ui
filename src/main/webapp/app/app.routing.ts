import {RouterModule, Routes} from '@angular/router';

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: '',
        pathMatch: 'full'
    }
];

export const AppRouting = RouterModule.forRoot(appRoutes, {
    useHash: false,
    enableTracing: true
});
