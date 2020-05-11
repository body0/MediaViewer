import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExploerComponent } from './exploer.component';

describe('ExploerComponent', () => {
  let component: ExploerComponent;
  let fixture: ComponentFixture<ExploerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExploerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExploerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
