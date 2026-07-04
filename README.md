# 💰 Controle de Gastos Residenciais

Sistema desenvolvido como teste técnico utilizando **ASP.NET Core (.NET 9)** no back-end e **React + TypeScript** no front-end.

O objetivo da aplicação é realizar o gerenciamento de pessoas e transações financeiras residenciais, permitindo consultar receitas, despesas e saldo por pessoa, além do total geral.

---

# 🚀 Tecnologias Utilizadas

## Back-end

- ASP.NET Core Web API (.NET 9)
- Entity Framework Core
- SQLite
- C#

## Front-end

- React
- TypeScript
- Axios
- Bootstrap 5
- Bootstrap Icons

---

# 📁 Estrutura do Projeto

```
gastoResidencial
│
├── Backend
│   ├── Controllers
│   ├── Data
│   ├── Models
│   ├── Migrations
│   └── Program.cs
│
└── Frontend
    ├── src
    │   ├── components
    │   ├── pages
    │   ├── services
    │   └── App.tsx
```

---

# ⚙️ Funcionalidades

## Pessoas

- Cadastro de pessoas
- Listagem de pessoas
- Exclusão de pessoas
- Exclusão automática das transações relacionadas (Cascade Delete)

Cada pessoa possui:

- Id
- Nome
- Idade

---

## Transações

Cadastro de transações contendo:

- Id
- Descrição
- Valor
- Tipo (Receita ou Despesa)
- Pessoa

Regras implementadas:

- Não é permitido cadastrar transações para pessoas inexistentes.
- Pessoas menores de 18 anos podem possuir apenas despesas.

---

## Resumo Financeiro

Consulta contendo:

- Total de receitas por pessoa
- Total de despesas por pessoa
- Saldo por pessoa
- Total geral da aplicação

---

# 💾 Persistência

Os dados são persistidos utilizando **SQLite**, permanecendo armazenados mesmo após o encerramento da aplicação.

---

# ▶️ Executando o Back-end

Entrar na pasta:

```bash
cd Backend
```

Restaurar dependências:

```bash
dotnet restore
```

Executar as migrations:

```bash
dotnet ef database update
```

Executar a aplicação:

```bash
dotnet run
```

A API será iniciada em:

```
https://localhost:7000
```

---

# ▶️ Executando o Front-end

Entrar na pasta:

```bash
cd Frontend
```

Instalar dependências:

```bash
npm install
```

Executar:

```bash
npm run dev
```

Aplicação disponível em:

```
http://localhost:5173
```

---

# 📌 Endpoints da API

## Pessoas

| Método | Endpoint |
|---------|----------|
| GET | /api/people |
| POST | /api/people |
| DELETE | /api/people/{id} |

---

## Transações

| Método | Endpoint |
|---------|----------|
| GET | /api/transactions |
| POST | /api/transactions |

---

## Resumo

| Método | Endpoint |
|---------|----------|
| GET | /api/summary |

---

# 🏗 Arquitetura

O projeto foi desenvolvido utilizando uma arquitetura simples baseada em MVC, composta por:

- Controllers
- Models
- Entity Framework Core
- SQLite

Essa estrutura foi escolhida por manter o projeto organizado e de fácil manutenção, sendo adequada para a complexidade proposta pelo desafio.

---

# 📷 Interface

A interface foi construída utilizando React, TypeScript e Bootstrap 5, priorizando simplicidade, responsividade e facilidade de utilização.

---
