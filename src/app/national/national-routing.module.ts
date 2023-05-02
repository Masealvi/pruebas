import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GrafhicsComponent } from './tab-main-n/graphics/graphics.component';
import { SheetComponent } from './tab-main-n/sheet/sheet.component';
import { TabMainNComponent } from './tab-main-n/tab-main-n.component';
import { TableComponent } from './tab-main-n/table/table.component';

const routes: Routes = [
  {
     path: '',component: TabMainNComponent,
     children:[
      
      {path: ':code',component: GrafhicsComponent},
      {path:'tabla/:code',component :TableComponent},
      {path: 'ficha/:code', component: SheetComponent},
      
     ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NationalRoutingModule { }
