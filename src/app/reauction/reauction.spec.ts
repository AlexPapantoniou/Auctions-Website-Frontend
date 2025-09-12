import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Reauction } from './reauction';

describe('Reauction', () => {
  let component: Reauction;
  let fixture: ComponentFixture<Reauction>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Reauction]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Reauction);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
