import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TabComparativeComponent } from './tab-comparative.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('TabComparativeComponent', () => {
  let component: TabComparativeComponent;
  let fixture: ComponentFixture<TabComparativeComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TabComparativeComponent],
      imports: [HttpClientTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabComparativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should validate limpiarSelect type entidadTipoId', () => {
    const id = 'entidadTipoId';
    const spy = spyOn(component, 'limpiarSelect').and.callThrough();
    component.limpiarSelect(id);
    expect(spy).toHaveBeenCalled();
    expect(component.sentidadTipoId).toEqual('');
  });

  it('should validate limpiarSelect type tipoServicioId', () => {
    const id = 'tipoServicioId';
    const spy = spyOn(component, 'limpiarSelect').and.callThrough();
    component.limpiarSelect(id);
    expect(spy).toHaveBeenCalled();
    expect(component.tipoServicioId).toEqual('');
  });

  it('should validate limpiarSelect type tipoComercioId', () => {
    const id = 'tipoComercioId';
    const spy = spyOn(component, 'limpiarSelect').and.callThrough();
    component.limpiarSelect(id);
    expect(spy).toHaveBeenCalled();
    expect(component.tipoComercioId).toEqual('');
  });

  it('should validate limpiarSelect type tipoCargaId', () => {
    const id = 'tipoCargaId';
    const spy = spyOn(component, 'limpiarSelect').and.callThrough();
    component.limpiarSelect(id);
    expect(spy).toHaveBeenCalled();
    expect(component.tipoCargaId).toEqual('');
  });

  it('should validate limpiarSelect type tipoViaProcedId', () => {
    const id = 'tipoViaProcedId';
    const spy = spyOn(component, 'limpiarSelect').and.callThrough();
    component.limpiarSelect(id);
    expect(spy).toHaveBeenCalled();
    expect(component.tipoViaProcedId).toEqual('');
  });

  it('should validate limpiarSelect type tipoEnvioId', () => {
    const id = 'tipoEnvioId';
    const spy = spyOn(component, 'limpiarSelect').and.callThrough();
    component.limpiarSelect(id);
    expect(spy).toHaveBeenCalled();
    expect(component.tipoEnvioId).toEqual('');
  });

  it('should validate limpiarSelect type tipoVehiculoId', () => {
    const id = 'tipoVehiculoId';
    const spy = spyOn(component, 'limpiarSelect').and.callThrough();
    component.limpiarSelect(id);
    expect(spy).toHaveBeenCalled();
    expect(component.tipoVehiculoId).toEqual('');
  });

  it('should validate limpiarSelect type termPortAeropId', () => {
    const id = 'termPortAeropId';
    const spy = spyOn(component, 'limpiarSelect').and.callThrough();
    component.limpiarSelect(id);
    expect(spy).toHaveBeenCalled();
    expect(component.termPortAeropId).toEqual('');
  });

  it('should validate limpiarSelect type opeTipOpeCircunscripcionId', () => {
    const id = 'opeTipOpeCircunscripcionId';
    const spy = spyOn(component, 'limpiarSelect').and.callThrough();
    component.limpiarSelect(id);
    expect(spy).toHaveBeenCalled();
    expect(component.opeTipOpeCircunscripcionId).toEqual('');
  });

  it('should validate limpiarSelect type lineaNavieraId', () => {
    const id = 'lineaNavieraId';
    const spy = spyOn(component, 'limpiarSelect').and.callThrough();
    component.limpiarSelect(id);
    expect(spy).toHaveBeenCalled();
    expect(component.lineaNavieraId).toEqual('');
  });

  it('should validate limpiarSelect type modTranspId', () => {
    const id = 'modTranspId';
    const spy = spyOn(component, 'limpiarSelect').and.callThrough();
    component.limpiarSelect(id);
    expect(spy).toHaveBeenCalled();
    expect(component.modTranspId).toEqual('');
  });

  it('should validate limpiarSelect type modoTransporteId', () => {
    const id = 'modoTransporteId';
    const spy = spyOn(component, 'limpiarSelect').and.callThrough();
    component.limpiarSelect(id);
    expect(spy).toHaveBeenCalled();
    expect(component.modoTransporteId).toEqual('');
  });

  it('should validate limpiarSelect type monedaId', () => {
    const id = 'monedaId';
    const spy = spyOn(component, 'limpiarSelect').and.callThrough();
    component.limpiarSelect(id);
    expect(spy).toHaveBeenCalled();
    expect(component.monedaId).toEqual('');
  });

  it('should validate limpiarSelect type categoriaId', () => {
    const id = 'categoriaId';
    const spy = spyOn(component, 'limpiarSelect').and.callThrough();
    component.limpiarSelect(id);
    expect(spy).toHaveBeenCalled();
    expect(component.categoriaId).toEqual('');
  });

  it('should validate limpiarSelect type origenPaisId', () => {
    const id = 'origenPaisId';
    const spy = spyOn(component, 'limpiarSelect').and.callThrough();
    component.limpiarSelect(id);
    expect(spy).toHaveBeenCalled();
    expect(component.origenPaisId).toEqual('');
  });

  it('should validate limpiarSelect type destinoPaisId', () => {
    const id = 'destinoPaisId';
    const spy = spyOn(component, 'limpiarSelect').and.callThrough();
    component.limpiarSelect(id);
    expect(spy).toHaveBeenCalled();
    expect(component.destinoPaisId).toEqual('');
  });

  it('should validate limpiarSelect type origenZonaId', () => {
    const id = 'origenZonaId';
    const spy = spyOn(component, 'limpiarSelect').and.callThrough();
    component.limpiarSelect(id);
    expect(spy).toHaveBeenCalled();
    expect(component.origenZonaId).toEqual('');
  });

  it('should validate limpiarSelect type destinoZonaId', () => {
    const id = 'destinoZonaId';
    const spy = spyOn(component, 'limpiarSelect').and.callThrough();
    component.limpiarSelect(id);
    expect(spy).toHaveBeenCalled();
    expect(component.destinoZonaId).toEqual('');
  });

  it('should validate limpiarSelect type puertoOrigenId', () => {
    const id = 'puertoOrigenId';
    const spy = spyOn(component, 'limpiarSelect').and.callThrough();
    component.limpiarSelect(id);
    expect(spy).toHaveBeenCalled();
    expect(component.puertoOrigenId).toEqual('');
  });

  it('should validate limpiarSelect type puertoDestinoId', () => {
    const id = 'puertoDestinoId';
    const spy = spyOn(component, 'limpiarSelect').and.callThrough();
    component.limpiarSelect(id);
    expect(spy).toHaveBeenCalled();
    expect(component.puertoDestinoId).toEqual('');
  });

  it('should validate limpiarSelect type denominacionServicio', () => {
    const id = 'denominacionServicio';
    const spy = spyOn(component, 'limpiarSelect').and.callThrough();
    component.limpiarSelect(id);
    expect(spy).toHaveBeenCalled();
    expect(component.denominacionServicio).toEqual('');
  });

  it('should validate limpiarSelect type ciudadOrigen', () => {
    const id = 'ciudadOrigen';
    const spy = spyOn(component, 'limpiarSelect').and.callThrough();
    component.limpiarSelect(id);
    expect(spy).toHaveBeenCalled();
    expect(component.ciudadOrigen).toEqual('');
  });

  it('should validate setUniqueOperator', () => {
    const arrayData = [{ id: '123' }];
    const operator = { id: '123' };
    const spy = spyOn(component, 'setUniqueOperator').and.callThrough();
    component.setUniqueOperator(arrayData, operator);
    expect(spy).toHaveBeenCalled();
  });

  it('should validate removeChip validate selectToChips to length equal 0', () => {
    component.selectToChips = [];
    const dataSelect = { id: '234', data: 'data 2', tipo: 'puertoDestinoId' };
    const spy = spyOn(component, 'removeChip').and.callThrough();
    const spyBuscar = spyOn(component, 'buscar').and.callThrough();
    component.removeChip(dataSelect);
    expect(spy).toHaveBeenCalled();
    expect(spyBuscar).toHaveBeenCalled();
  });

  xit('should validate removeChip', () => {
    component.contadorSelectChips = 2;
    component.selectToChips = [
      { id: '123', data: 'data 2', tipo: 'denominacionServicio' },
      { id: '234', data: 'data', tipo: 'puertoDestinoId' },
      { id: '235', data: 'data 3', tipo: 'puertoOrigenId' },
      { id: '236', data: 'data 4', tipo: 'destinoZonaId' },
      { id: '237', data: 'data 5', tipo: 'destinoPaisId' },
      { id: '238', data: 'data 6', tipo: 'modoTransporteId' },
    ];
    const dataSelect = { id: '234', data: 'data 2', tipo: 'puertoDestinoId' };
    const spy = spyOn(component, 'removeChip').and.callThrough();
    const spyLimpiarSelect = spyOn(
      component,
      'limpiarSelect'
    ).and.callThrough();
    component.removeChip(dataSelect);
    expect(spy).toHaveBeenCalled();
    expect(spyLimpiarSelect).toHaveBeenCalled();
    expect(component.contadorSelectChips).toEqual(1);
  });
});
