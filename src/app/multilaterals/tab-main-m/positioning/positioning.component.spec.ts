import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PositioningComponent } from './positioning.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { FormBuilder } from '@angular/forms';
import { IndicadorMultilateralService } from '../../services/indicador-multilateral.service';
import { SendCodeService } from '../../services/tab/send-code.service';
import { of } from 'rxjs';

fdescribe('PositioningComponent', () => {
  let component: PositioningComponent;
  let fixture: ComponentFixture<PositioningComponent>;
  /* CREAS EL SPY DEL SERVICIO - PASO 1 */
  let indicadorMultilateralServiceSpy: jasmine.SpyObj<IndicadorMultilateralService>;
  // let sendCodeServiceSpy: jasmine.SpyObj<SendCodeService>;

  const formBuilderMock: FormBuilder = new FormBuilder();
  beforeEach(async () => {
    /* CREAR UN SPY DE CADA FUNCIÓN QUE EJECUTA EL SERVICIO - PASO 3 */
    indicadorMultilateralServiceSpy =
      jasmine.createSpyObj<IndicadorMultilateralService>(
        'IndicadorMultilateralService',
        ['getIndicatorMultilateralByCode']
      );
    /* sendCodeServiceSpy = jasmine.createSpyObj<SendCodeService>(
      'SendCodeService',
      ['onChangeIndicador$']
    ); */

    /* SIMULAR LAS FUNCIONES DE LOS SEVICIOS QUE SE EJECUTA EN EL NGONINIT - PASO 4 */
    indicadorMultilateralServiceSpy.getIndicatorMultilateralByCode.and.returnValue(
      of({
        nombreIndicador: '',
        data: [{ series: 'valor' }, { series: 'valor' }],
      })
    );

    await TestBed.configureTestingModule({
      declarations: [PositioningComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: FormBuilder,
          useValue: formBuilderMock,
        },
        /* PASO DOS IMPORTAR EN LOS PROVIDERS EL SERVICIO - PASO 2 */
        {
          provide: IndicadorMultilateralService,
          useValue: indicadorMultilateralServiceSpy,
        },
        /* {
          provide: SendCodeService,
          useValue: sendCodeServiceSpy,
        }, */
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PositioningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should validate getIndicatorMultilateralPositioning', () => {
    const code = 'CODE01';
    const spyFn = spyOn(
      component,
      'getIndicatorMultilateralPositioning'
    ).and.callThrough();
    const spyServices =
      indicadorMultilateralServiceSpy.getIndicatorMultilateralByCode.and.returnValue(
        of({
          nombreIndicador: '',
          data: [{ series: ['2022', '2023'] }, { series: ['2022', '2023'] }],
        })
      );
    component.getIndicatorMultilateralPositioning(code);
    expect(spyFn).toHaveBeenCalled();
    expect(spyServices).toHaveBeenCalled();
  });
});
