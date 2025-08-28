import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Bidder } from './bidder';

describe('Bidder', () => {
  let component: Bidder;
  let fixture: ComponentFixture<Bidder>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Bidder]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Bidder);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
