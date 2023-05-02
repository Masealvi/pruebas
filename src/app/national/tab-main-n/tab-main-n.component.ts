import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IndicadorChildToParentService } from '../services/graficas/indicador-child-to-parent.service';
import { GrafhicsService } from '../services/graphics.service';
import { KEY_PARAM } from './config/config';

@Component({
  selector: 'app-tab-main-n',
  templateUrl: './tab-main-n.component.html',
  styleUrls: ['./tab-main-n.component.css']
})
export class TabMainNComponent implements OnInit {
  onChangeIndicadorSub: Subscription;

  
  descripcionIndicador: string = "";
  
  private urlBaseGraphic: string = '/indicador-nacional/';
  private urlBaseTable: string = '/indicador-nacional/tabla/';
  private urlBaseSheet: string='/indicador-nacional/ficha/';
  graphic: string = "";
  table: string = "";
  sheet: string="";
  codes: any;
  constructor(
    private graphicsService: GrafhicsService,
    private route: ActivatedRoute,
   
    private childToParentService: IndicadorChildToParentService,
    
    ) {
    this.onChangeIndicadorSub = this.childToParentService.onChangeIndicador$.subscribe($event => {
      this.getRouterParam();//$event.
    }); 
   }

  ngOnInit(): void {
  
    this.getRouterParam();
    // Obtener el código de la URL
   
  }

  ngOnDestroy(): void {
    if (this.onChangeIndicadorSub) {
      this.onChangeIndicadorSub.unsubscribe();
    }
  }

 

  getRouterParam() {

    console.log(this.codes);
    let local: any = localStorage.getItem(KEY_PARAM);
    console.log(local);

    if (local != null) {
    
      let code: any = JSON.parse(local);
      this.graphic = this.urlBaseGraphic + code.graphic;
      this.table = this.urlBaseTable + code.graphic;
      this.sheet = this.urlBaseSheet + code.graphic;
      this.getFileIndicator(this.codes);

    }
  }
 
  private getFileIndicator(code :string) {
    console.log(code);
    this.graphicsService.getFileIndicator(code).subscribe(
      (response) => {
        console.log(response)
  
      },
      
    );
  }
}
