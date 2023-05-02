import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapComponent } from './tab-directory/map/map.component';
import { TabDirectoryComponent } from './tab-directory/tab-directory.component';


const routes: Routes = [

  {path:'',component:TabDirectoryComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DirectoryRoutingModule { }
