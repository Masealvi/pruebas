import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabComparativeComponent } from './tab-comparative/tab-comparative.component';

const routes: Routes = [
  {path:'',component:TabComparativeComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComparativeRoutingModule { }
