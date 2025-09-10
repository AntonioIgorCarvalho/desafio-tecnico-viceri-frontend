import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioHeroiComponent } from './formulario-heroi.component';

describe('FormularioHeroiComponent', () => {
  let component: FormularioHeroiComponent;
  let fixture: ComponentFixture<FormularioHeroiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioHeroiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormularioHeroiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
