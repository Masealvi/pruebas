import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'indicador-nacional',
    loadChildren: () => import('./national/national.module').then((m) => m.NationalModule),
  },
  {
    path: 'indicador-multilateral',
    loadChildren: () => import('./multilaterals/multilaterals.module').then((m) => m.MultilateralsModule),
  },
  {
    path: 'directory',
    loadChildren: ()=>import('./directory/directory.module').then((m)=>m.DirectoryModule)
  },
  {
    path: 'comparative',
    loadChildren: ()=>import('./comparative/comparative.module').then((m)=>m.ComparativeModule)
  }
 

  
  
];

@NgModule({
  declarations: [],
  imports: [
    
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
