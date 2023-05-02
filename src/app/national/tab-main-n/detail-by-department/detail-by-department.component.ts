import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import MapModule from 'highcharts/modules/map';

MapModule(Highcharts);
@Component({
  selector: 'app-detail-by-department',
  templateUrl: './detail-by-department.component.html',
  styleUrls: ['./detail-by-department.component.css']
})
export class DetailByDepartmentComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    
  }

  
}