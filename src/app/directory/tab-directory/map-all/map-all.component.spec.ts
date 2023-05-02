import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MapAllComponent } from './map-all.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('MapAllComponent', () => {
  let component: MapAllComponent;
  let fixture: ComponentFixture<MapAllComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MapAllComponent],
      imports: [HttpClientTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
