import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Carritocompra } from './carritocompra';

describe('Carritocompra', () => {
  let component: Carritocompra;
  let fixture: ComponentFixture<Carritocompra>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Carritocompra]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Carritocompra);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
