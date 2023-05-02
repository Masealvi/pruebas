import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { TabComparativeComponent } from './comparative/tab-comparative/tab-comparative.component';
import { MapComponent } from './directory/tab-directory/map/map.component';
import { MapAllComponent } from './directory/tab-directory/map-all/map-all.component';
import { TabDirectoryComponent } from './directory/tab-directory/tab-directory.component';
import { TabMainMComponent } from './multilaterals/tab-main-m/tab-main-m.component';
import { AirTransportComponent } from './multilaterals/tab-main-m/airTransport/air-transport.component';
import { ComparativeComponent } from './multilaterals/tab-main-m/comparative/comparative.component';
import { ComparisonByMeasuresComponent } from './multilaterals/tab-main-m/comparisonByMeasures/comparison-by-measures.component';
import { MarineTransportComponent } from './multilaterals/tab-main-m/marineTransport/marine-transport.component';
import { PatentsComponent } from './multilaterals/tab-main-m/patents/patents.component';
import { PositioningComponent } from './multilaterals/tab-main-m/positioning/positioning.component';
import { RailwaysComponent } from './multilaterals/tab-main-m/railways/railways.component';
import { SummaryComponent } from './multilaterals/tab-main-m/summary/summary.component';
import { WorldComparisonComponent } from './multilaterals/tab-main-m/worldComparison/world-comparison.component';
import { DetailByDepartmentComponent } from './national/tab-main-n/detail-by-department/detail-by-department.component';
import { GrafhicsComponent } from './national/tab-main-n/graphics/graphics.component';
import { NavGraphicsComponent } from './national/tab-main-n/nav-graphics/nav-graphics.component';
import { SheetComponent } from './national/tab-main-n/sheet/sheet.component';
import { TableComponent } from './national/tab-main-n/table/table.component';
import { TabMainNComponent } from './national/tab-main-n/tab-main-n.component';
import jasmine from 'jasmine';
import { IndicadorMultilateralService } from './multilaterals/services/indicador-multilateral.service';
import { SendCodeService } from './multilaterals/services/tab/send-code.service';
import { PageEvent } from '@angular/material/paginator';
import { GrafhicsService } from './national/services/graphics.service';

import { environment } from '../../src/environments/environment.prod';

describe('Testing environment.prod', () => {
  it('should have correct values', () => {
    expect(environment).toBeTruthy();
  });
});


describe('TabComparativeComponent', () => {
  let component: TabComparativeComponent;
  let fixture: ComponentFixture<TabComparativeComponent>;
 
  beforeEach(async(() => {
    TestBed.configureTestingModule({
     imports: [HttpClientModule],
     declarations: [ TabComparativeComponent ]
    })
    .compileComponents();
  }));
 
  beforeEach(() => {
    fixture = TestBed.createComponent(TabComparativeComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });
 
  it('Tab-Comparative', () => {
    expect(component).toBeTruthy();
  });

  it('function limpiarSelect', () => {
    expect(component.limpiarSelect('entidadTipoId')).toBeFalsy();
    expect(component.limpiarSelect('tipoServicioId')).toBeFalsy();
    expect(component.limpiarSelect('tipoComercioId')).toBeFalsy();
    expect(component.limpiarSelect('tipoCargaId')).toBeFalsy();
    expect(component.limpiarSelect('tipoViaProcedId')).toBeFalsy();
    expect(component.limpiarSelect('tipoEnvioId')).toBeFalsy();
    expect(component.limpiarSelect('tipoVehiculoId')).toBeFalsy();
    expect(component.limpiarSelect('termPortAeropId')).toBeFalsy();
    expect(component.limpiarSelect('opeTipOpeCircunscripcionId')).toBeFalsy();
    expect(component.limpiarSelect('lineaNavieraId')).toBeFalsy();
    expect(component.limpiarSelect('modTranspId')).toBeFalsy();
    expect(component.limpiarSelect('modoTransporteId')).toBeFalsy();
    expect(component.limpiarSelect('monedaId')).toBeFalsy();
    expect(component.limpiarSelect('categoriaId')).toBeFalsy();
    expect(component.limpiarSelect('origenPaisId')).toBeFalsy();
    expect(component.limpiarSelect('destinoPaisId')).toBeFalsy();
    expect(component.limpiarSelect('origenZonaId')).toBeFalsy();
    expect(component.limpiarSelect('destinoZonaId')).toBeFalsy();
    expect(component.limpiarSelect('puertoOrigenId')).toBeFalsy();
    expect(component.limpiarSelect('puertoDestinoId')).toBeFalsy();
    expect(component.limpiarSelect('denominacionServicio')).toBeFalsy();
    expect(component.limpiarSelect('ciudadOrigen')).toBeFalsy();
  });

  it('function getFiltrosAplicados', () => {
    expect(component.getFiltrosAplicados('', '', '')).toBeFalsy();
  });

  it('function buscar', () => {
    expect(component.buscar()).toBeFalsy();
  });

  it('function ordenamiento', () => {
    expect(component.ordenamiento('')).toBeFalsy();
  });

  it('function getMensajeModal', () => {
    expect(component.getMensajeModal('','')).toBeFalsy();
  });

  it('function limpiarDatosSelect', () => {
    expect(component.limpiarDatosSelect()).toBeFalsy();
  });

  it('function removeChip', () => {
    expect(component.removeChip(2)).toBe();
  });

  it('function verEmpresa', () => {
    expect(component.verEmpresa('','')).toBeFalsy();
  });

  it('function onSelect', () => {
    expect(component.onSelect('')).toBeFalsy();
  });

  it('function onSelect_20', () => {
    expect(component.onSelect('20')).toBeFalsy();
  });

  it('function onSelect_1', () => {
    expect(component.onSelect('1')).toBeFalsy();
  });

  it('function onSelect_12', () => {
    expect(component.onSelect('12')).toBeFalsy();
  });

  it('function onSelect_13', () => {
    expect(component.onSelect('13')).toBeFalsy();
  });

  it('function onSelect_16', () => {
    expect(component.onSelect('16')).toBeFalsy();
  });

  it('function onSelect_11', () => {
    expect(component.onSelect('11')).toBeFalsy();
  });

  it('function onSelect_10', () => {
    expect(component.onSelect('10')).toBeFalsy();
  });

  it('function onSelect_19', () => {
    expect(component.onSelect('19')).toBeFalsy();
  });

  it('function onSelect_14', () => {
    expect(component.onSelect('14')).toBeFalsy();
  });

  it('function onSelect_7', () => {
    expect(component.onSelect('7')).toBeFalsy();
  });

  it('function onSelect_15', () => {
    expect(component.onSelect('15')).toBeFalsy();
  });

  it('function onSelect_9', () => {
    expect(component.onSelect('9')).toBeFalsy();
  });

  it('function imprimir', () => {
    expect(component.imprimir()).toBe();
  });

  it('function cambiarPagina', () => {
    const pg: any = PageEvent;
    expect(component.cambiarPagina(pg)).toBe();
  });

  it('function cambiarPaginaEmpresa', () => {
    const pg: any = PageEvent;
    expect(component.cambiarPaginaEmpresa(pg)).toBe();
  });
  
});


describe('MapComponent', () => {
    let component: MapComponent;
    let fixture: ComponentFixture<MapComponent>;

    beforeEach(async(() =>{
        TestBed.configureTestingModule({
            imports: [HttpClientModule],
            declarations: [MapComponent]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MapComponent);
        component = fixture.debugElement.componentInstance;
        fixture.detectChanges();
    });

    it('Component MapComponent', () => {
        expect(fixture).toBeTruthy();
    });
});


describe('MapAllComponent', () => {
    let component: MapAllComponent;
    let fixture: ComponentFixture<MapAllComponent>;
   
    beforeEach(async(() => {
      TestBed.configureTestingModule({
       imports: [HttpClientModule],
       declarations: [ MapAllComponent ]
      })
      .compileComponents();
    }));
   
    beforeEach(() => {
      fixture = TestBed.createComponent(MapAllComponent);
      component = fixture.debugElement.componentInstance;
      fixture.detectChanges();
    });
   
    it('Tab-Directory', () => {
      expect(component).toBeTruthy();
    });

});


describe('TabDirectoryComponent', () => {
    let component: TabDirectoryComponent;
    let fixture: ComponentFixture<TabDirectoryComponent>;
   
    beforeEach(async(() => {
      TestBed.configureTestingModule({
       imports: [HttpClientModule],
       declarations: [ TabDirectoryComponent ]
      })
      .compileComponents();
    }));
   
    beforeEach(() => {
      fixture = TestBed.createComponent(TabDirectoryComponent);
      component = fixture.debugElement.componentInstance;
      fixture.detectChanges();
    });
   
    it('Tab-Directory', () => {
      expect(component).toBeTruthy();
    });

    it('function removeChip', () => {
      expect(component.removeChip('')).toBeFalsy();
    });

    it('function removeChip', () => {
      expect(component.removeChip('')).toBeFalsy();
    });

    it('function getFiltrosAplicados', () => {
      expect(component.getFiltrosAplicados('','','')).toBeFalsy();
    });

    it('function getFiltrosAplicados2', () => {
      expect(component.getFiltrosAplicados2('','','')).toBeFalsy();
    });

    it('function ordenamiento', () => {
      expect(component.ordenamiento('')).toBeFalsy();
    });

    it('function buscarCoincidencias', () => {
      expect(component.buscarCoincidencias()).toBeFalsy();
    });

    it('function buscar', () => {
      expect(component.buscar('')).toBeFalsy();
    });

    it('function buscarPorLetra', () => {
      expect(component.buscarPorLetra('')).toBeFalsy();
    });

    it('function getMasInformacion', () => {
      expect(component.getMasInformacion('')).toBeFalsy();
    });

});


describe('prueba AirTransportComponent', () => {
  let component: AirTransportComponent;
  let fixture: ComponentFixture<AirTransportComponent>;

  let airT: AirTransportComponent;
  let ind: IndicadorMultilateralService;
  let actR: ActivatedRoute;
  let sendS: SendCodeService;
  let frmB: FormBuilder;

  beforeEach(async(() => {
      TestBed.configureTestingModule({
          imports: [HttpClientModule, RouterTestingModule, ReactiveFormsModule],
          declarations: [AirTransportComponent],
          providers: [FormBuilder]
      })
      .compileComponents();
  }));

  beforeEach(() => {
      fixture = TestBed.createComponent(AirTransportComponent);
      component = fixture.debugElement.componentInstance;
      fixture.detectChanges();

      //airT = new AirTransportComponent(ind,actR,sendS,frmB);
  });
    

  it('Component AirTransportComponent', () => {
      expect(fixture).toBeTruthy();
  });

  it('Component getIndicatorMultilateralAir', () => {
    expect(component["getIndicatorMultilateralAir"]('')).toBeFalsy();
  });

  it('Component getMedidaFiltradoAir', () => {
    expect(component["getMedidaFiltradoAir"]()).toBeFalsy();
  });

  it('Component AirTransportComponent', () => {
    expect(component.removeChip('' as any)).toBeFalsy();
  });

  it('Component getFiltrosAplicadosAir', () => {
    expect(component.getFiltrosAplicadosAir('','','')).toBeFalsy();
  });

  it('Component graficarAir', () => {
    expect(component.graficarAir()).toBeFalsy();
  });

  it('Component changeSelectorAir', () => {
    expect(component.changeSelectorAir()).toBeFalsy();
  });

});


describe('prueba ComparativeComponent', () => {
  let component: ComparativeComponent;
  let fixture: ComponentFixture<ComparativeComponent>;

  beforeEach(async(() => {
      TestBed.configureTestingModule({
          imports: [HttpClientModule, RouterTestingModule],
          declarations: [ComparativeComponent],
          providers: [FormBuilder]
      })
      .compileComponents();
  }));

  beforeEach(() => {
      fixture = TestBed.createComponent(ComparativeComponent);
      component = fixture.debugElement.componentInstance;
      fixture.detectChanges();
  });

  it('Component ComparativeComponent', () => {
      expect(fixture).toBeTruthy();
  });

  it('function getFiltrosAplicados', () => {
    expect(component.getFiltrosAplicadosComparative('','','')).toBeFalsy();
  });

  it('function graficar', () => {
    expect(component.graficarComparativo()).toBeFalsy();
  });

});


describe('prueba SummaryComponent', () => {

  let component: SummaryComponent;
  let fixture: ComponentFixture<SummaryComponent>;

  beforeEach(async(() =>  {
      TestBed.configureTestingModule({
          imports: [HttpClientModule, RouterTestingModule, ReactiveFormsModule],
          declarations: [SummaryComponent]
      })
      .compileComponents();
  }));

  beforeEach(() => {
      fixture = TestBed.createComponent(SummaryComponent);
      component = fixture.debugElement.componentInstance;
      fixture.detectChanges();
  });

  it('Component SummaryComponent', () => {
      expect(fixture).toBeTruthy();
  });

  it('Component getIndicatorMultilateral', () => {
      expect(component["getIndicatorMultilateral"]('CODE_MULTILATERAL3')).toBe();
  });

  it('Component getYear', () => {
    expect(() => {
      expect(component.getYear()).toBe();
    }).toThrowError();
  });

});


describe('prueba RailwaysComponent', () => {
  let component: RailwaysComponent;
  let fixture: ComponentFixture<RailwaysComponent>;
  let miClase: RailwaysComponent; 
  let formGraficar: IndicadorMultilateralService;
  let aRou: ActivatedRoute;
  let senC: SendCodeService;
  let fb: FormBuilder;

  beforeEach(async(() => {
      TestBed.configureTestingModule({
          imports: [HttpClientModule, RouterTestingModule],
          declarations: [RailwaysComponent],
          providers: [FormBuilder]
      })
      .compileComponents();
  }));

  beforeEach(() => {
      fixture = TestBed.createComponent(RailwaysComponent);
      component = fixture.debugElement.componentInstance;
      fixture.detectChanges();

      //miClase = new RailwaysComponent(formGraficar, aRou, senC, fb);
  });

//   it("funcion privada getIndicatorMultilateral", () => {
//     let spy: any = spyOn(miClase, "getIndicatorMultilateral" as any).and.returnValue(true);
//     spy.getIndicatorMultilateral('');
//     expect(spy).toBeTruthy();
//   });

  it('Component RailwaysComponent', () => {
      expect(fixture).toBeTruthy();
  });

});


describe('prueba PositioningComponent', () => {
  let component: PositioningComponent;
  let fixture: ComponentFixture<PositioningComponent>;

  beforeEach(async(() => {
      TestBed.configureTestingModule({
          imports: [HttpClientModule, RouterTestingModule],
          declarations: [PositioningComponent],
          providers: [FormBuilder]
      })
      .compileComponents();
  }));

  beforeEach(() => {
      fixture = TestBed.createComponent(PositioningComponent);
      component = fixture.debugElement.componentInstance;
      fixture.detectChanges();
  });

  it('Component PositioningComponent', () => {
      expect(fixture).toBeTruthy();
  });

  // it('Component removeChip', () => {
  //   expect(component.removeChip([])).toBeFalsy();
  // });

  it('Component getFiltrosAplicados', () => {
    expect(component.getFiltrosAplicadosPositioning('','','')).toBeFalsy();
  });

});


describe('prueba ComparisonByMeasuresComponent', () => {
  let component: ComparisonByMeasuresComponent;
  let fixture: ComponentFixture<ComparisonByMeasuresComponent>;

  beforeEach(async(() => {
      TestBed.configureTestingModule({
          imports: [HttpClientModule, RouterTestingModule],
          declarations: [ComparisonByMeasuresComponent],
          providers: [FormBuilder]
      })
      .compileComponents();
  }));

  beforeEach(() => {
      fixture = TestBed.createComponent(ComparisonByMeasuresComponent);
      component = fixture.debugElement.componentInstance;
      fixture.detectChanges();
  });

  it('Component ComparisonByMeasuresComponent', () => {
      expect(fixture).toBeTruthy();
  });

});


describe('prueba MarineTransportComponent', () => {
  let component: MarineTransportComponent;
  let fixture: ComponentFixture<MarineTransportComponent>;

  beforeEach(async(() => {
      TestBed.configureTestingModule({
          imports: [HttpClientModule, RouterTestingModule],
          declarations: [MarineTransportComponent],
          providers: [FormBuilder]
      })
      .compileComponents();
  }));

  beforeEach(() => {
      fixture = TestBed.createComponent(MarineTransportComponent);
      component = fixture.debugElement.componentInstance;
      fixture.detectChanges();
  });

  it('Component MarineTransportComponent', () => {
      expect(fixture).toBeTruthy();
  });

  it('function removeChip', () => {
    expect(component.removeChipMarine('')).toBeFalsy();
  });

  it('function getFiltrosAplicados', () => {
    expect(component.getFiltrosAplicadosMarine('','','')).toBeFalsy();
  });

});


describe('prueba PatentsComponent', () => {
  let component: PatentsComponent;
  let fixture: ComponentFixture<PatentsComponent>;

  beforeEach(async(() => {
      TestBed.configureTestingModule({
          imports: [HttpClientModule, RouterTestingModule],
          declarations: [PatentsComponent],
          providers: [FormBuilder]
      })
      .compileComponents();
  }));

  beforeEach(() => {
      fixture = TestBed.createComponent(PatentsComponent);
      component = fixture.debugElement.componentInstance;
      fixture.detectChanges();
  });

  it('Component PatentsComponent', () => {
      expect(fixture).toBeTruthy();
  });

});


describe('prueba WorldComparisonComponent', () => {
  let component: WorldComparisonComponent;
  let fixture: ComponentFixture<WorldComparisonComponent>;

  beforeEach(async(() => {
      TestBed.configureTestingModule({
          imports: [HttpClientModule, RouterTestingModule],
          declarations: [WorldComparisonComponent],
          providers: [FormBuilder]
      })
      .compileComponents();
  }));

  beforeEach(() => {
      fixture = TestBed.createComponent(WorldComparisonComponent);
      component = fixture.debugElement.componentInstance;
      fixture.detectChanges();
  });

  it('Component WorldComparisonComponent', () => {
      expect(fixture).toBeTruthy();
  });

  it('Function getIndicatorMultilateralWorld', () => {
    expect(component['getIndicatorMultilateralWorld']('')).toBeFalsy();
  });

  it('Function removeChip', () => {
    expect(component.removeChip('' as any)).toBeFalsy();
  });

  it('Function getFiltrosAplicados', () => {
    expect(component.getFiltrosAplicados('','','')).toBeFalsy();
  });

});


describe('prueba TabMainMComponent', () =>{
  let component: TabMainMComponent;
  let fixture: ComponentFixture<TabMainMComponent>;

  beforeEach(async(() => {
      TestBed.configureTestingModule({
          imports: [HttpClientModule, RouterTestingModule],
          declarations: [TabMainMComponent]
      })
      .compileComponents();
  }));

  beforeEach(() => {
      fixture = TestBed.createComponent(TabMainMComponent);
      component = fixture.debugElement.componentInstance;
      fixture.detectChanges();
  });

  it('component TabMainMComponent', () => {
      expect(fixture).toBeTruthy();
  });

  it('funxtion getRouterParam', () => {
    expect(component.getRouterParam()).toBeFalsy();
  });

  it('funxtion getCodeFromURL', () => {
    expect(component["getCodeFromURL"]()).toBeFalsy();
  });

});


describe('prueba DetailByDepartmentComponent', () => {
  let component: DetailByDepartmentComponent;
  let fixture: ComponentFixture<DetailByDepartmentComponent>;

  beforeEach(async(() => {
      TestBed.configureTestingModule({
          imports: [HttpClientModule, RouterTestingModule],
          declarations: [DetailByDepartmentComponent]
      })
      .compileComponents();
  }));

  beforeEach(() => {
      fixture = TestBed.createComponent(DetailByDepartmentComponent);
      component = fixture.debugElement.componentInstance;
      fixture.detectChanges();
  });

  it('component DetailByDepartmentComponent', () => {
      expect(fixture).toBeTruthy();
  });

});

describe('prueba GrafhicsComponent', () => {
  let component: GrafhicsComponent;
  let fixture: ComponentFixture<GrafhicsComponent>;

  beforeEach(async(() => {
      TestBed.configureTestingModule({
          imports: [HttpClientModule, RouterTestingModule],
          declarations: [GrafhicsComponent],
          providers: [FormBuilder]
      })
      .compileComponents();
  }));

  beforeEach(() => {
      fixture = TestBed.createComponent(GrafhicsComponent);
      component = fixture.debugElement.componentInstance;
      fixture.detectChanges();
  });

  it('component GrafhicsComponent', () => {
      expect(fixture).toBeTruthy();
  });

  it('component filterByYearAndCompany', () => {
    expect(component.filterByYearAndCompany('' as any)).toBeFalsy();
  });

});


describe('prueba NavGraphicsComponent', () => {
  let component: NavGraphicsComponent;
  let fixture: ComponentFixture<NavGraphicsComponent>;

  beforeEach(async(() => {
      TestBed.configureTestingModule({
          imports: [HttpClientModule, RouterTestingModule],
          declarations: [NavGraphicsComponent]
      })
      .compileComponents();
  }));

  beforeEach(() => {
      fixture = TestBed.createComponent(NavGraphicsComponent);
      component = fixture.debugElement.componentInstance;
      fixture.detectChanges();
  });

  it('component NavGraphicsComponent', () => {
      expect(fixture).toBeTruthy();
  });

});


describe('prueba SheetComponent', () => {
  let component: SheetComponent;
  let fixture: ComponentFixture<SheetComponent>;

  beforeEach(async(() => {
      TestBed.configureTestingModule({
          imports: [HttpClientModule, RouterTestingModule],
          declarations: [SheetComponent]
      })
      .compileComponents();
  }));

  beforeEach(() => {
      fixture = TestBed.createComponent(SheetComponent);
      component = fixture.debugElement.componentInstance;
      fixture.detectChanges();
  });

  it('component SheetComponent', () => {
      expect(fixture).toBeTruthy();
  });

});


describe('prueba TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;
  let gInd: TableComponent;
  let graficS: GrafhicsService;

  beforeEach(async(() => {
      TestBed.configureTestingModule({
          imports: [HttpClientModule, RouterTestingModule, ReactiveFormsModule],
          declarations: [TableComponent],
          providers: [FormBuilder, FormsModule, GrafhicsService]
      })
      .compileComponents();
  }));

  beforeEach(() => {
      fixture = TestBed.createComponent(TableComponent);
      component = fixture.debugElement.componentInstance;
      fixture.detectChanges();

      graficS = TestBed.get(GrafhicsService);
  });

  it('should return an observable', () => {
    spyOn(graficS, 'getIndicatorByCodeTable').and.returnValue('' as any);
    graficS.getIndicatorByCodeTable('test');
    expect(graficS.getIndicatorByCodeTable).toHaveBeenCalled();
  });

  it('component TableComponent', () => {
      expect(fixture).toBeTruthy();
  });

  it("should return 'filterByYearAndCompany'", () => {
    let fil: any[] = [{a: 2},{b: 1},{c: []}];
    expect(component.filterByYearAndCompany(fil as any)).toBe();
  });

  it("should return 'getIndicatorTableByCode'", () => {
    expect(component["getIndicatorTableByCode"]('')).toBe();
  });

  it("should return 'getIndicatorTableByCode ind1'", () => {
    let code: string = '2.1';
    expect(component["getIndicatorTableByCode"](code)).toBe();
  }); 

  it("should return 'buildFormForYears'", () => {
    expect(component["buildFormForYears"]()).toBe();
  }); 

  it("should return 'buildFormdataNameClass'", () => {
    expect(component["buildFormdataNameClass"]()).toBe();
  }); 

  it("should return 'filterByThreeLabels'", () => {
    expect(component.filterByThreeLabels('' as any)).toBeFalsy();
  }); 

  it("should return 'filterByThreeLabels valores'", () => {
    expect(component.filterByThreeLabels('4.7' as any)).toBeFalsy();
  }); 

  it("should return 'filterByfourLabels'", () => {
    let fil: any[] = [{'startYear':0},{'endYear':0},{'dataGeiAll':''},{'dataNameClass':''},{'dataEnterprise':''}];
    expect(component.filterByfourLabels(fil as any)).toBeFalsy();
  }); 

  it("should return 'filterByEightLabels'", () => {
    expect(component.filterByEightLabels('','','','','','','','')).toBeFalsy();
  }); 

  it("should return 'cambiarPagina'", () => {
    expect(component.cambiarPagina('' as any)).toBeFalsy();
  });

});


describe('prueba TabMainNComponent', () =>{
    let component: TabMainNComponent;
    let fixture: ComponentFixture<TabMainNComponent>;
  
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientModule, RouterTestingModule],
            declarations: [TabMainNComponent]
        })
        .compileComponents();
    }));
  
    beforeEach(() => {
        fixture = TestBed.createComponent(TabMainNComponent);
        component = fixture.debugElement.componentInstance;
        fixture.detectChanges();
    });
  
    it('component TabMainNComponent', () => {
        expect(fixture).toBeTruthy();
    });
  
});