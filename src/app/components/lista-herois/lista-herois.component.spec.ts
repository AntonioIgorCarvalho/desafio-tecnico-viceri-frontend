import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaHeroisComponent } from './lista-herois.component';

describe('ListaHeroisComponent', () => {
  let component: ListaHeroisComponent;
  let fixture: ComponentFixture<ListaHeroisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaHeroisComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListaHeroisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
