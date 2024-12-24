import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSearchTableComponent } from './product-search-table.component';

describe('ProductSearchTableComponent', () => {
  let component: ProductSearchTableComponent;
  let fixture: ComponentFixture<ProductSearchTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductSearchTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductSearchTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
