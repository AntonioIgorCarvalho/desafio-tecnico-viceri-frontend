import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Heroi, HeroiRequest, Superpoder } from '../models/heroi.model';

@Injectable({
  providedIn: 'root'
})
export class HeroiService {
  private readonly API_URL = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  // Listar todos os heróis
  listarHerois(): Observable<Heroi[]> {
    return this.http.get<Heroi[]>(`${this.API_URL}/herois`)
      .pipe(
        catchError(this.tratarErro)
      );
  }

  // Buscar herói por ID
  buscarHeroiPorId(id: number): Observable<Heroi> {
    return this.http.get<Heroi>(`${this.API_URL}/herois/${id}`)
      .pipe(
        catchError(this.tratarErro)
      );
  }

  // Criar novo herói
  criarHeroi(heroi: HeroiRequest): Observable<Heroi> {
    return this.http.post<Heroi>(`${this.API_URL}/herois`, heroi)
      .pipe(
        catchError(this.tratarErro)
      );
  }

  // Atualizar herói
  atualizarHeroi(id: number, heroi: HeroiRequest): Observable<Heroi> {
    return this.http.put<Heroi>(`${this.API_URL}/herois/${id}`, heroi)
      .pipe(
        catchError(this.tratarErro)
      );
  }

  // Deletar herói
  deletarHeroi(id: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/herois/${id}`)
      .pipe(
        catchError(this.tratarErro)
      );
  }

  // Listar superpoderes
  listarSuperpoderes(): Observable<Superpoder[]> {
    return this.http.get<Superpoder[]>(`${this.API_URL}/herois/superpoderes`)
      .pipe(
        catchError(this.tratarErro)
      );
  }

  private tratarErro(erro: HttpErrorResponse) {
    let mensagemErro = 'Ocorreu um erro desconhecido!';
    
    if (erro.error instanceof ErrorEvent) {
      // Erro do lado do cliente
      mensagemErro = `Erro: ${erro.error.message}`;
    } else {
      // Erro retornado pelo backend
      if (erro.error?.message) {
        mensagemErro = erro.error.message;
      } else {
        switch (erro.status) {
          case 404:
            mensagemErro = 'Recurso não encontrado';
            break;
          case 409:
            mensagemErro = 'Conflito: Nome de herói já existe';
            break;
          case 400:
            mensagemErro = 'Dados inválidos fornecidos';
            break;
          case 500:
            mensagemErro = 'Erro interno do servidor';
            break;
        }
      }
    }
    
    return throwError(() => new Error(mensagemErro));
  }
}