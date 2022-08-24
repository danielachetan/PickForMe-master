import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookviewComponent } from './bookview/bookview.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
	{
		path: "",
		component: HomeComponent,
	},
	{
		path: "login",
		component: LoginComponent,
	},
	{
		path: "home",
		component: HomeComponent,
	},
	{
		path: ":item/:id",
		component: BookviewComponent,
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }