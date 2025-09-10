import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { Heroi } from '../../models/heroi.model';
import { HeroiService } from '../../services/heroi.service';

@Component({
  selector: 'app-lista-herois',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatSortModule,
    MatSnackBarModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatTooltipModule
  ],
  templateUrl: './lista-herois.component.html',
  styleUrls: ['./lista-herois.component.scss']
})
export class ListaHeroisComponent implements OnInit {
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['id', 'nome', 'nomeHeroi', 'dataNascimento', 'altura', 'peso', 'superpoderes', 'acoes'];
  dataSource = new MatTableDataSource<Heroi>();
  carregando = false;

  constructor(
    private heroiService: HeroiService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.carregarHerois();
  }

  carregarHerois(): void {
    this.carregando = true;
    this.heroiService.listarHerois().subscribe({
      next: (herois) => {
        this.dataSource.data = herois;
        this.dataSource.sort = this.sort;
        this.carregando = false;
      },
      error: (erro) => {
        this.mostrarMensagem(`Erro ao carregar heróis: ${erro.message}`, 'Erro');
        this.carregando = false;
      }
    });
  }

  aplicarFiltro(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editarHeroi(heroi: Heroi): void {
    this.router.navigate(['/herois/editar', heroi.id]);
  }

  excluirHeroi(heroi: Heroi): void {
    if (confirm(`Tem certeza que deseja excluir o herói ${heroi.nomeHeroi}?`)) {
      this.carregando = true;
      this.heroiService.deletarHeroi(heroi.id!).subscribe({
        next: () => {
          this.mostrarMensagem('Herói excluído com sucesso!', 'Sucesso');
          this.carregarHerois();
        },
        error: (erro) => {
          this.mostrarMensagem(`Erro ao excluir herói: ${erro.message}`, 'Erro');
          this.carregando = false;
        }
      });
    }
  }

  formatarData(data: string): string {
    return new Date(data).toLocaleDateString('pt-BR');
  }

  obterSuperpoderes(heroi: Heroi): string {
    return heroi.superpoderes.map(sp => sp.superpoder).join(', ');
  }

  private mostrarMensagem(mensagem: string, tipo: string): void {
    this.snackBar.open(mensagem, 'Fechar', {
      duration: 3000,
      panelClass: tipo === 'Erro' ? ['snack-error'] : ['snack-success']
    });
  }
}