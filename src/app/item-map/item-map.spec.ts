import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemMap } from './item-map';

describe('ItemMap', () => {
  let component: ItemMap;
  let fixture: ComponentFixture<ItemMap>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemMap]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemMap);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
