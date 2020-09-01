import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './pages/signin/signin.component';
import { SignupComponent } from './pages/signup/signup.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserlistGuard } from './guards/userlist.guard';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'signin', component: SignInComponent, canActivate: [UserlistGuard] },
  { path: 'signup', component: SignupComponent, canActivate: [UserlistGuard] },
  { path: 'userlist', component: UserListComponent, canActivate: [AuthGuard] },
  {
    path: '',
    redirectTo: '/signup',
    pathMatch: 'full',
    canActivate: [UserlistGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
