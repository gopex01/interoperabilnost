import { Routes } from '@angular/router';
import { HomePage } from './pages/home-page/home-page';
import { Login } from './features/login/login';
import { Register } from './features/register/register';
import { ProfileLayout } from './layouts/profile-layout/profile-layout';
import { ProfileInfo } from './features/profile-info/profile-info';
import { UserProfile } from './features/user-profile/user-profile';
import { UserTasks } from './features/user-tasks/user-tasks';
import { CreateTask } from './features/create-task/create-task';
import { authGuard } from './auth/auth.guard';
export const routes: Routes = [
    {
        path:'',
        component:HomePage,
    },
    {
        path:'login',
        component:Login,
    },
    {
        path:'register',
        component:Register
    },
    {
        path:'profile',
        component:ProfileLayout,
        canActivate:[authGuard],
        children:[
            {
                path:'',
                redirectTo:'home',
                pathMatch:'full',
            },
            {
                path:'home',
                component:ProfileInfo,
            },
            {
                path:'user-profile',
                component:UserProfile,
            },
            {
                path:'user-tasks',
                component:UserTasks
            },
            {
                path:'create-task',
                component:CreateTask
            }
        ]
    }
];
