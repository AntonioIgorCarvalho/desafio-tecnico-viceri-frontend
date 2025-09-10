# Frontend - Gerenciamento de Super-Heróis

## Descrição

Este é o frontend da aplicação de gerenciamento de super-heróis, desenvolvido em Angular 17 com Material Design. A aplicação fornece uma interface moderna e intuitiva para realizar operações CRUD (Create, Read, Update, Delete) em uma base de dados de super-heróis.

## Tecnologias Utilizadas

- **Angular 17** (Standalone Components)
- **Angular Material 17** (Material Design)
- **TypeScript 5**
- **RxJS** (Programação reativa)
- **SCSS** (Estilização)
- **Angular Router** (Navegação)
- **Angular Reactive Forms** (Formulários)

## Funcionalidades

### ✅ Gerenciamento de Heróis
- **Listagem**: Tabela responsiva com paginação, ordenação e filtros
- **Cadastro**: Formulário completo para criação de novos heróis
- **Edição**: Atualização de informações existentes
- **Exclusão**: Remoção com confirmação
- **Busca**: Filtro em tempo real por nome ou superpoderes

### ✅ Interface do Usuário
- **Design Responsivo**: Adaptável a diferentes tamanhos de tela
- **Feedback Visual**: Mensagens de sucesso/erro, loadings e validações

### ✅ Validações
- Campos obrigatórios
- Validação de tipos de dados
- Limites de valores (altura, peso)

## Arquitetura

### Standalone Components
O projeto utiliza a nova arquitetura de **Standalone Components** do Angular 17, oferecendo:
- **Modularidade**: Cada componente gerencia suas próprias dependências
- **Performance**: Lazy loading automático dos componentes
- **Simplicidade**: Eliminação da necessidade de módulos complexos
- **Manutenibilidade**: Código mais limpo e fácil de entender

### Padrão de Arquitetura
- **Separação de Responsabilidades**: Componentes, serviços e modelos bem definidos
- **Reactive Programming**: Uso extensivo de RxJS para gerenciamento de estado
- **Type Safety**: TypeScript garantindo tipagem estática

## Pré-requisitos

- **Node.js** 18 ou superior
- **Angular CLI** 17 ou superior
- **npm**
- **API Backend** rodando na porta 8080

## Instalação e Configuração

### 1. Clonar o repositório
```bash
git clone https://github.com/AntonioIgorCarvalho/desafio-tecnico-viceri-frontend
cd superheroes-frontend
```

### 2. Instalar dependências
```bash
npm install
```

### 3. Configurar proxy (se necessário)
O service está configurado para redirecionar chamadas para `http://localhost:8080/api`.

### 4. Executar a aplicação
```bash
ng serve
```

### 5. Acessar a aplicação
- **Frontend**: http://localhost:4200

## Scripts Disponíveis

```bash
# Iniciar servidor de desenvolvimento
ng serve

## Componentes Principais

### ListaHeroisComponent
- **Responsabilidade**: Exibição e gerenciamento da lista de heróis
- **Recursos**: Paginação, ordenação, filtros, ações CRUD
- **Tecnologias**: Material Table, Paginator, Sort

### FormularioHeroiComponent
- **Responsabilidade**: Cadastro e edição de heróis
- **Recursos**: Validação reativa, feedback visual, seleção múltipla
- **Tecnologias**: Reactive Forms, Material Form Fields

### HeroiService
- **Responsabilidade**: Comunicação com a API backend
- **Recursos**: Tratamento de erros, interceptação HTTP
- **Padrões**: Observable, Error Handling

## Modelos de Dados

```typescript
interface Heroi {
  id?: number;
  nome: string;
  nomeHeroi: string;
  dataNascimento: string;
  altura: number;
  peso: number;
  superpoderes: Superpoder[];
}

interface Superpoder {
  id: number;
  superpoder: string;
  descricao: string;
}
```

## Roteamento

| Rota | Componente | Descrição |
|------|------------|-----------|
| `/` | Redirect | Redireciona para `/herois` |
| `/herois` | ListaHeroisComponent | Lista todos os heróis |
| `/herois/novo` | FormularioHeroiComponent | Cadastro de novo herói |
| `/herois/editar/:id` | FormularioHeroiComponent | Edição de herói existente |

## Tratamento de Erros

A aplicação possui tratamento robusto de erros:

- **Erros de Conexão**: Detecta quando a API não está disponível
- **Erros de Validação**: Exibe mensagens claras nos formulários  
- **Erros HTTP**: Traduz códigos de status em mensagens amigáveis
- **Feedback Visual**: Snackbars para sucesso/erro das operações

## Responsividade

### Desktop (1024px+)
- Layout em colunas
- Tabela completa com todas as colunas
- Formulários em linha

### Tablet (768px - 1023px)
- Layout adaptativo
- Tabela com scroll horizontal se necessário
- Formulários em coluna única

### Mobile (< 768px)
- Layout vertical
- Tabela otimizada para mobile
- Botões e campos full-width

## Customizações de Tema

O projeto utiliza o tema padrão do Angular Material (Indigo/Pink), mas pode ser customizado:

```scss
// styles.scss
:root {
  --primary-color: #1976d2;
  --accent-color: #e91e63;
  --warn-color: #f44336;
}
```
