import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnsichtComponent } from './ansicht/ansicht.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  {
    path:"home",
    component: HomeComponent
  },
  {
    path:"ansicht",
    component: AnsichtComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
