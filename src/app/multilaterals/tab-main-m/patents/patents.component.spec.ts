import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PatentsComponent } from './patents.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { FormBuilder } from '@angular/forms';

describe('PatentsComponent', () => {
  let component: PatentsComponent;
  let fixture: ComponentFixture<PatentsComponent>;
  const formBuilderMock: FormBuilder = new FormBuilder();
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PatentsComponent],
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
    fixture = TestBed.createComponent(PatentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
