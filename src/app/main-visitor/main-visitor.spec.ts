import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainVisitor } from './main-visitor';

describe('MainVisitor', () => {
  let component: MainVisitor;
  let fixture: ComponentFixture<MainVisitor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainVisitor]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainVisitor);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
