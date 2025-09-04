import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaceBid } from './place-bid';

describe('PlaceBid', () => {
  let component: PlaceBid;
  let fixture: ComponentFixture<PlaceBid>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlaceBid]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlaceBid);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
