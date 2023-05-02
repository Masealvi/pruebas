import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DirectoryRoutingModule } from './directory-routing.module';

import { MapComponent } from './tab-directory/map/map.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { TabDirectoryComponent } from './tab-directory/tab-directory.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { MapAllComponent } from './tab-directory/map-all/map-all.component';
import {MatPaginatorModule} from '@angular/material/paginator';




@NgModule({
  declarations: [
    TabDirectoryComponent,
    MapComponent,
    MapAllComponent
  ],
  imports: [
    CommonModule,
    DirectoryRoutingModule,
    MatSelectModule,
    MatRadioModule,
    MatChipsModule,
    MatIconModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    AutocompleteLibModule,
    MatPaginatorModule
   
  ]
})
export class DirectoryModule { }
