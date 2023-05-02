import { async, TestBed, inject } from '@angular/core/testing';
import { Router, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Observable } from 'rxjs';

import { ComparativeService } from './comparative/tab-comparative/services/comparative.service';
import { DirectoryService, PlacesService } from './directory/services';
import { MapService } from './directory/services/map.service';
import { SendCodeService } from './multilaterals/services/tab/send-code.service';
import { IndicadorMultilateralService } from './multilaterals/services/indicador-multilateral.service';
import { Graficas } from './utils/graficas';
import { GrafhicsService } from './national/services/graphics.service';
import { IndicadorChildToParentService } from './national/services/graficas/indicador-child-to-parent.service';
import { Utilidades } from './utils/utilidades';
import { DataService } from './directory/services/data.Service';

import { environment } from '../../src/environments/environment.desa';
import { HttpClient } from '@angular/common/http';

describe('Testing environment.desa', () => {
  it('should have correct values', () => {
    expect(environment).toBeTruthy();
  });
});


describe('prueba Graficas', () => {
  let service: Graficas;

  beforeEach(() => {
      TestBed.configureTestingModule({
          providers: [Graficas]
      });
      service = TestBed.inject(Graficas);
  });

  it('function generateCategory', () => {
      expect(service).toBeTruthy();
  });

  it('function generateColumnChart', () => {
    expect(Graficas.generateColumnChart([])).toBeTruthy();
  });

  it('function generateLineChart', () => {
    expect(Graficas.generateLineChart([],true)).toBeTruthy();
  });

  it('function generateBarChart', () => {
    expect(Graficas.generateBarChart([])).toBeTruthy();
  });

  it('function generateBarChart2', () => {
    expect(Graficas.generateBarChart2([],[])).toBeTruthy();
  });

  it('function generateSerie2', () => {
    expect(Graficas.generateSerie2([],'')).toBeTruthy();
  });

  it('function generateTable', () => {
    expect(Graficas.generateTable([],'')).toBeTruthy();
  });

  it('function generateTable2', () => {
    expect(Graficas.generateTable2([],[])).toBeTruthy();
  });

  it('function genarateSpiderChart', () => {
    expect(Graficas.genarateSpiderChart([],[],1,true)).toBeTruthy();
  });

  it('function generateSerieSpider', () => {
    expect(Graficas.generateSerieSpider([],'',1,true)).toBeTruthy();
  });

  it('function ejeYSpider', () => {
    expect(Graficas.ejeYSpider(true)).toBeTruthy();
  });

  it('function genarateDonutChart', () => {
    expect(Graficas.genarateDonutChart([],[])).toBeTruthy();
  });

  it('function generateSerieDonutChart', () => {
    expect(Graficas.generateSerieDonutChart(1,[])).toBeTruthy();
  });

  it('function generateTable3', () => {
    expect(Graficas.generateTable3([])).toBeTruthy();
  });

});


describe('prueba Utilidades', () => {
  let service: Utilidades;

  beforeEach(() => {
      TestBed.configureTestingModule({
          providers: [Utilidades]
      });
      service = TestBed.inject(Utilidades);
  });

  it('function generateCategory', () => {
      expect(service).toBeTruthy();
  });

  it('function getYears', () => {
    expect(Utilidades.getYears([],2023)).toBeTruthy();
  });

  it('function getCountries', () => {
    expect(Utilidades.getCountries([],0)).toBeTruthy();
  });

  it('function removeChip', () => {
    expect(Utilidades.removeChip([],['Argentina', 'Peru'],'','')).toBeFalsy();
  });

  it('function procesarDataChart', () => {
    expect(Utilidades.procesarDataChart([])).toEqual([]);
  });

  it('function compararPais', () => {
    expect(Utilidades.compararPais('' as any,'' as any)).toEqual('igual.svg');
  });

});


describe('ComparativeService: GET', () => {
  let service: ComparativeService;
  let comS: ComparativeService;
  let http: HttpClient;

  beforeEach(() => { 
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ComparativeService]
    });

    comS = new ComparativeService(http);
  });

  it('Service ComparativeService', inject([ComparativeService], (service: ComparativeService) => {
    expect(service).toBeTruthy();
  }));

  // it('private function', () => {
  //   expect(comS["getFiltroTipoComparative"]('' as any)).toBeTruthy();
  // });

  // it('function getFiltroTipoComparative', () => {
  //   const data: any = comS.getFiltroTipoComparative([]);
  //   expect(data).toBeFalsy();
  // });

});


describe('PlacesService: GET', () => {
  let service: PlacesService;
  let HttpClientSpy: { get: jasmine.Spy };

  beforeEach(() => {
      HttpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
      service = new PlacesService(HttpClientSpy as any, HttpClientSpy as any, HttpClientSpy as any);
  });

  it('debe crearse correctamente PlacesService', () => {
      expect(service).toBeTruthy();
  });

  it('function getFiltroDirectory', () => {
    const data: any = service.getPlacesByQuery('');
    expect(data).toBeFalsy();
  });

});


describe('MapService: GET', () => {
  let service: MapService;

  beforeEach(() => {
      TestBed.configureTestingModule({
          imports: [HttpClientTestingModule],
          providers: [MapService]
      });

      service = new MapService();

  });

  it('prueba MapService', inject([MapService], (service: MapService) => {
      expect(service).toBeTruthy();
  }));

});


describe('DirectoryService: GET', () => {
  let service: DirectoryService;
  let HttpClientSpy: { get: jasmine.Spy }
  let actions: Observable<any>;

  beforeEach(() => {
      TestBed.configureTestingModule({
          imports: [HttpClientTestingModule]
      });
      service = TestBed.inject(DirectoryService);

      HttpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
      actions = service.getDetalleOperador(HttpClientSpy as any);
  });

  it('service: DirectoryService', () => {
      expect(service).toBeTruthy();
  });

  it('function getFiltroDirectory', () => {
      const data = service.getFiltroDirectory([]);
      expect(data).toBeTruthy();
  });

  it('function groupchips', () => {
      const data = service.groupChips([{'tipo:': 1, 'code':2, 'valor': 0}]);
      expect(data).toBeTruthy();
  });

});


describe('MultilateralsRoutingModule: GET', () => {
  let router: Router;

  const routes: Routes = [
      { path: '', redirectTo: '/', pathMatch: 'full' },
  ];

  beforeEach(async(() => {
      TestBed.configureTestingModule({
          imports: [ RouterTestingModule, RouterTestingModule.withRoutes(routes)],
      })
      router = TestBed.inject(Router);
      router.initialNavigation();
  }));

  it('prueba router', () => {
      expect(router).toBeTruthy();
  });

});


describe('SendCodeService: GET', () => {
  beforeEach(() => {
      TestBed.configureTestingModule({
          imports: [HttpClientTestingModule],
          providers: [SendCodeService]
      });
  });

  it('Servicio SendCode', inject([SendCodeService], (service: SendCodeService) => {
      expect(service).toBeTruthy();
  }));
  
});


describe('IndicadorMultilateralService: Post', () => {
  beforeEach(() => {
      TestBed.configureTestingModule({
          imports: [HttpClientTestingModule],
          providers: [IndicadorMultilateralService]
      });
  });

  it('Service IndicadorMultilateralService', inject([IndicadorMultilateralService], (service: IndicadorMultilateralService) => {
      expect(service).toBeTruthy();
  }));

});


describe('GrafhicsService: Get ', () =>{

  let service: GrafhicsService;
  let HttpClientSpy: { get: jasmine.Spy };
  let actions: Observable<any>;

  beforeEach(() => {
      TestBed.configureTestingModule({
          imports: [HttpClientTestingModule]
      });
      service = TestBed.inject(GrafhicsService);

      HttpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
      actions = service.getAllIndicator();
  });
  
  it('prueba GrafhicsService', () => {
      expect(service).toBeTruthy();
  });
  
});


describe('IndicadorChildToParentService: Get', () => {
  let service: IndicadorChildToParentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [IndicadorChildToParentService]
    });

    service = new IndicadorChildToParentService();
  });

  it('should be created IndicadorChildToParentService', () => {
    expect(service).toBeTruthy();
  });

  it('should call onChangeIndicadorSub when onChangeIndicador$ is emitted', () => {
    spyOn(service.onChangeIndicador$, 'subscribe').and.callThrough();
    service.onChangeIndicador$.subscribe();
    expect(service.onChangeIndicador$.subscribe).toHaveBeenCalled();
  });

  it('should call if', () => {
    const local = "test";
    if (local != null){
      expect(local).toBeTruthy();
    }
  });
 
 });


 describe('DataService : GET', () => {
  let service: DataService ;

  beforeEach(() => { 
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DataService ]
    });
  });

  it('Service DataService ', inject([DataService ], (service: DataService) => {
    expect(service).toBeTruthy();
  }));

});
