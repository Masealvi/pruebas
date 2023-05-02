import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ChartModule } from 'angular-highcharts';

import { NationalRoutingModule } from './national-routing.module';
import { TabMainNComponent } from './tab-main-n/tab-main-n.component';
import { TableComponent } from './tab-main-n/table/table.component';
import { SheetComponent } from './tab-main-n/sheet/sheet.component';
import { GrafhicsComponent } from './tab-main-n/graphics/graphics.component';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';

import { MatButtonModule } from '@angular/material/button';

import { DetailByDepartmentComponent } from './tab-main-n/detail-by-department/detail-by-department.component';
import { NavGraphicsComponent } from './tab-main-n/nav-graphics/nav-graphics.component';



@NgModule({
  declarations: [
    TabMainNComponent,
    TableComponent,
    SheetComponent,
    GrafhicsComponent,
    DetailByDepartmentComponent,
    NavGraphicsComponent,
    
   
  ],
  imports: [
    CommonModule,
    NationalRoutingModule,
    FormsModule,
    MatSelectModule,
    MatInputModule,
    MatAutocompleteModule,
    AutocompleteLibModule,
    MatPaginatorModule,
    HttpClientModule,
    ChartModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatButtonModule
  ]
})
export class NationalModule { }
