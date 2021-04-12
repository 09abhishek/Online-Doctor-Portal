import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorDirectoryComponent } from './doctor-directory.component';

describe('DoctorDirectoryComponent', () => {
  let component: DoctorDirectoryComponent;
  let fixture: ComponentFixture<DoctorDirectoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorDirectoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorDirectoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
