import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { FeedComponent } from './pages/feed/feed.component';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
  { path: '', redirectTo: 'feed', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'feed', component: FeedComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: 'feed' },
];
