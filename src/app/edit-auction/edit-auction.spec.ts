import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAuction } from './edit-auction';

describe('EditAuction', () => {
  let component: EditAuction;
  let fixture: ComponentFixture<EditAuction>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditAuction]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditAuction);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
