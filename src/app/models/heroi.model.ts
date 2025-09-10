export interface Heroi {
  id?: number;
  nome: string;
  nomeHeroi: string;
  dataNascimento: string;
  altura: number;
  peso: number;
  superpoderes: Superpoder[];
}

export interface HeroiRequest {
  nome: string;
  nomeHeroi: string;
  dataNascimento: string;
  altura: number;
  peso: number;
  superpoderesIds: number[];
}

export interface Superpoder {
  id: number;
  superpoder: string;
  descricao: string;
}

export interface ApiResponse<T> {
  status: number;
  error?: string;
  message?: string;
  data?: T;
}