import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Heroi, HeroiRequest, Superpoder } from '../../models/heroi.model';
import { HeroiService } from '../../services/heroi.service';

@Component({
  selector: 'app-formulario-heroi',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  templateUrl: './formulario-heroi.component.html',
  styleUrls: ['./formulario-heroi.component.scss']
})
export class FormularioHeroiComponent implements OnInit {
  formularioHeroi!: FormGroup;
  superpoderes: Superpoder[] = [];
  heroiId: number | null = null;
  modoEdicao = false;
  carregando = false;
  salvando = false;

  constructor(
    private fb: FormBuilder,
    private heroiService: HeroiService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.criarFormulario();
  }

  ngOnInit(): void {
    this.carregarSuperpoderes();
    
    // Verificar se é edição
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.heroiId = +id;
      this.modoEdicao = true;
      this.carregarHeroi(this.heroiId);
    }
  }

  private criarFormulario(): void {
    this.formularioHeroi = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(2)]],
      nomeHeroi: ['', [Validators.required, Validators.minLength(2)]],
      dataNascimento: ['', Validators.required],
      altura: ['', [Validators.required, Validators.min(0.5), Validators.max(3.0)]],
      peso: ['', [Validators.required, Validators.min(20), Validators.max(500)]],
      superpoderesIds: [[], [Validators.required, Validators.minLength(1)]]
    });
  }

  private carregarSuperpoderes(): void {
    this.heroiService.listarSuperpoderes().subscribe({
      next: (superpoderes) => {
        this.superpoderes = superpoderes;
      },
      error: (erro) => {
        this.mostrarMensagem(`Erro ao carregar superpoderes: ${erro.message}`, 'erro');
      }
    });
  }

  private carregarHeroi(id: number): void {
    this.carregando = true;
    this.heroiService.buscarHeroiPorId(id).subscribe({
      next: (heroi) => {
        this.preencherFormulario(heroi);
        this.carregando = false;
      },
      error: (erro) => {
        this.mostrarMensagem(`Erro ao carregar herói: ${erro.message}`, 'erro');
        this.carregando = false;
        this.router.navigate(['/herois']);
      }
    });
  }

  private preencherFormulario(heroi: Heroi): void {
    // Converter data para formato do input date
    const data = new Date(heroi.dataNascimento);
    const dataFormatada = data.toISOString().split('T')[0];

    this.formularioHeroi.patchValue({
      nome: heroi.nome,
      nomeHeroi: heroi.nomeHeroi,
      dataNascimento: dataFormatada,
      altura: heroi.altura,
      peso: heroi.peso,
      superpoderesIds: heroi.superpoderes.map(sp => sp.id)
    });
  }

  onSubmit(): void {
    if (this.formularioHeroi.valid) {
      this.salvando = true;
      const heroiData = this.preparaDadosParaSalvar();

      if (this.modoEdicao) {
        this.atualizarHeroi(heroiData);
      } else {
        this.criarNovoHeroi(heroiData);
      }
    } else {
      this.marcarCamposComoTocados();
    }
  }

  private preparaDadosParaSalvar(): HeroiRequest {
    const formValue = this.formularioHeroi.value;
    
    const data = new Date(formValue.dataNascimento);

    const dataFormatada = data.getFullYear() + '-' +
    String(data.getMonth() + 1).padStart(2, '0') + '-' +
    String(data.getDate()).padStart(2, '0') + ' ' +
    String(data.getHours()).padStart(2, '0') + ':' +
    String(data.getMinutes()).padStart(2, '0') + ':' +
    String(data.getSeconds()).padStart(2, '0');

    return {
      nome: formValue.nome.trim(),
      nomeHeroi: formValue.nomeHeroi.trim(),
      dataNascimento: dataFormatada,
      altura: Number(formValue.altura),
      peso: Number(formValue.peso),
      superpoderesIds: formValue.superpoderesIds
    };
  }

  private criarNovoHeroi(heroiData: HeroiRequest): void {
    this.heroiService.criarHeroi(heroiData).subscribe({
      next: (heroi) => {
        this.mostrarMensagem('Herói criado com sucesso!', 'sucesso');
        this.router.navigate(['/herois']);
      },
      error: (erro) => {
        this.mostrarMensagem(`Erro ao criar herói: ${erro.message}`, 'erro');
        this.salvando = false;
      }
    });
  }

  private atualizarHeroi(heroiData: HeroiRequest): void {
    this.heroiService.atualizarHeroi(this.heroiId!, heroiData).subscribe({
      next: (heroi) => {
        this.mostrarMensagem('Herói atualizado com sucesso!', 'sucesso');
        this.router.navigate(['/herois']);
      },
      error: (erro) => {
        this.mostrarMensagem(`Erro ao atualizar herói: ${erro.message}`, 'erro');
        this.salvando = false;
      }
    });
  }

  private marcarCamposComoTocados(): void {
    Object.keys(this.formularioHeroi.controls).forEach(key => {
      this.formularioHeroi.get(key)?.markAsTouched();
    });
  }

  cancelar(): void {
    this.router.navigate(['/herois']);
  }

  obterMensagemErro(campo: string): string {
    const control = this.formularioHeroi.get(campo);
    
    if (control?.hasError('required')) {
      return 'Este campo é obrigatório';
    }
    
    if (control?.hasError('minlength')) {
      const minLength = control.errors?.['minlength'].requiredLength;
      return `Mínimo de ${minLength} caracteres`;
    }
    
    if (control?.hasError('min')) {
      const min = control.errors?.['min'].min;
      return `Valor mínimo: ${min}`;
    }
    
    if (control?.hasError('max')) {
      const max = control.errors?.['max'].max;
      return `Valor máximo: ${max}`;
    }
    
    return '';
  }

  private mostrarMensagem(mensagem: string, tipo: string): void {
    this.snackBar.open(mensagem, 'Fechar', {
      duration: 4000,
      panelClass: tipo === 'erro' ? ['snack-error'] : ['snack-success']
    });
  }
}