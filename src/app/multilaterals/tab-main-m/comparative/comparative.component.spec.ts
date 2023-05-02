import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComparativeComponent } from './comparative.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { FormBuilder } from '@angular/forms';

describe('ComparativeComponent', () => {
  let component: ComparativeComponent;
  let fixture: ComponentFixture<ComparativeComponent>;
  const formBuilderMock: FormBuilder = new FormBuilder();
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ComparativeComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: FormBuilder,
          useValue: formBuilderMock,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComparativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
