import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TabDirectoryComponent } from './tab-directory.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('TabDirectoryComponent', () => {
  let component: TabDirectoryComponent;
  let fixture: ComponentFixture<TabDirectoryComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TabDirectoryComponent],
      imports: [HttpClientTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabDirectoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
