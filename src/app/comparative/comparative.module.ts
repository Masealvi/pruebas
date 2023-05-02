import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComparativeRoutingModule } from './comparative-routing.module';

import { TabComparativeComponent } from './tab-comparative/tab-comparative.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import {MatPaginatorModule} from '@angular/material/paginator';



@NgModule({
  declarations: [
   
    TabComparativeComponent
  ],
  imports: [
    CommonModule,
    ComparativeRoutingModule,
    MatFormFieldModule,
    MatChipsModule,
    MatSelectModule,
    MatRadioModule,
    MatIconModule,
    AutocompleteLibModule,
    NgMultiSelectDropDownModule,
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule

  ]
})
export class ComparativeModule { }
