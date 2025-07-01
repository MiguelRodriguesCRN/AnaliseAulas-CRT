# Analise-CRT

Analise-CRT é uma aplicação web para gerenciamento e análise de aulas, com funcionalidades para cadastro, listagem, visualização de aulas do usuário e geração de relatórios em PDF. A aplicação é composta por um backend em Node.js com Express e Prisma, e um frontend em React, utilizando bibliotecas como Bootstrap e Chart.js para uma interface moderna e responsiva.

## Funcionalidades

- **Cadastro de Aulas**: Permite registrar novas aulas com informações como RENACH, número da aula, data e mês de referência.
- **Listagem de Aulas**: Exibe todas as aulas com filtros por mês de referência e número da aula, permitindo revisores aprovar ou rejeitar aulas.
- **Minhas Aulas**: Mostra as aulas do usuário logado, com filtro por status (Aguardando, Aprovada, Rejeitada).
- **Dashboard**: Apresenta estatísticas de aulas por status em um gráfico de pizza e permite gerar um relatório em PDF com aulas no status "Aguardando" para um mês específico.
- **Autenticação**: Usa JWT para autenticação de usuários, restrito a revisores para certas funcionalidades.

## Tecnologias Utilizadas

### Backend
- **Node.js** e **Express**: Framework para construção da API REST.
- **Prisma**: ORM para interação com o banco de dados.
- **PDFKit**: Geração de relatórios em PDF.
- **jsonwebtoken**: Autenticação baseada em JWT.
- **CORS**: Suporte para requisições cross-origin.

### Frontend
- **React**: Biblioteca para construção da interface.
- **Bootstrap**: Estilização de componentes.
- **Chart.js**: Geração de gráficos (gráfico de pizza no Dashboard).
- **Axios**: Requisições HTTP para comunicação com o backend.

## Estrutura do Projeto

```
analise-crt/
├── backend-analise-crt/
│   ├── src/
│   │   ├── controllers/
│   │   │   └── dashboardController.js
│   │   ├── middleware/
│   │   │   └── authMiddleware.js
│   │   ├── routes/
│   │   │   └── dashboardRoutes.js
│   │   ├── services/
│   │   │   └── dashboardService.js
│   │   ├── utils/
│   │   │   └── gerarPDF.js
│   │   └── app.js
│   ├── .env
│   └── package.json
├── frontend/
│   └── src/
│       └── components/
│           ├── Dashboard.jsx
│           ├── CadastroAula.jsx
│           ├── ListagemAulas.jsx
│           └── MinhasAulas.jsx
├── README.md
```

## Pré-requisitos

- **Node.js** (v22.14.0 ou superior)
- **npm** (gerenciador de pacotes)
- Banco de dados compatível com Prisma (ex.: PostgreSQL, MySQL)
- Navegador moderno (para o frontend)

## Instalação

### Backend
1. Navegue até o diretório do backend:
   ```bash
   cd backend-analise-crt
   ```

2. Instale as dependências:
   ```bash
   npm install express pdfkit jsonwebtoken @prisma/client cors
   ```

3. Configure o arquivo `.env` na raiz do backend:
   ```plaintext
   JWT_SECRET=seu-segredo-aqui
   DATABASE_URL=seu-url-do-banco-de-dados
   PORT=3000
   ```
   - Substitua `seu-segredo-aqui` por uma chave secreta forte para JWT.
   - Configure `DATABASE_URL` conforme seu banco de dados (ex.: `postgresql://user:password@localhost:5432/dbname`).

4. Configure o Prisma:
   - Certifique-se de que o arquivo `prisma/schema.prisma` está configurado com o modelo de dados correto.
   - Execute as migrações:
     ```bash
     npx prisma migrate dev
     ```

5. Inicie o servidor:
   ```bash
   npm start
   ```
   Ou, com nodemon:
   ```bash
   nodemon src/app.js
   ```

### Frontend
1. Navegue até o diretório do frontend:
   ```bash
   cd frontend
   ```

2. Instale as dependências:
   ```bash
   npm install react react-dom axios bootstrap react-chartjs-2 chart.js
   ```

3. Inicie o frontend:
   ```bash
   npm start
   ```

## Configuração

### Banco de Dados
- O projeto usa Prisma como ORM. Certifique-se de que o modelo no `prisma/schema.prisma` inclui pelo menos a tabela `Aula` com campos como `renach`, `numeroAula`, `dataAula`, `numeroChamado`, `mesReferencia`, `status`, e `motivoRejeicao`.
- Exemplo de modelo:
  ```prisma
  model Aula {
    id            Int      @id @default(autoincrement())
    renach        String
    numeroAula    String
    dataAula      DateTime
    numeroChamado String?
    mesReferencia String
    status        String
    motivoRejeicao String?
  }
  ```

### Autenticação
- A autenticação é baseada em JWT. Um endpoint de login (não incluído no código fornecido) deve gerar um token JWT e armazená-lo no `localStorage` do frontend com a chave `token`.
- O token deve conter o campo `tipo` (ex.: `"revisor"`) para verificar permissões.

## Uso

1. **Acesse o frontend**:
   - Abra o navegador em `http://localhost:3000` (ou a porta configurada para o frontend).
   - Faça login para obter um token JWT e armazená-lo no `localStorage`.

2. **Dashboard**:
   - Navegue até a página de Dashboard.
   - Selecione um mês no campo de entrada.
   - Visualize o gráfico de pizza com as estatísticas de aulas por status.
   - Clique em "Gerar PDF (Aguardando)" para baixar um relatório em PDF com as aulas no status "Aguardando" para o mês selecionado.

3. **Outras funcionalidades**:
   - **Cadastro de Aulas**: Registre novas aulas na interface correspondente.
   - **Listagem de Aulas**: Filtre e gerencie aulas (aprovar/rejeitar, se for revisor).
   - **Minhas Aulas**: Veja suas aulas com filtro por status.

## Endpoints da API

- **GET /api/dashboard?mes=YYYY-MM**
  - Retorna estatísticas de aulas para o mês especificado.
  - Requer autenticação (JWT com `tipo: "revisor"`).
  - Resposta:
    ```json
    {
      "totalAulas": 10,
      "aulasPorStatus": [
        { "status": "Aguardando", "_count": { "status": 3 } },
        { "status": "Aprovada", "_count": { "status": 5 } },
        { "status": "Rejeitada", "_count": { "status": 2 } }
      ],
      "mesSelecionado": "2025-07"
    }
    ```

- **GET /api/dashboard/aulas-aguardando?mes=YYYY-MM**
  - Gera e retorna um PDF com aulas no status "Aguardando" para o mês especificado.
  - Requer autenticação (JWT com `tipo: "revisor"`).
  - Resposta: Arquivo PDF (`aulas_aguardando_YYYY-MM.pdf`).

## Solução de Problemas

- **Erro: Cannot find module '../middleware/authMiddleware'**
  - Verifique se o arquivo `src/middleware/authMiddleware.js` existe.
  - Confirme que o caminho no `require` em `dashboardRoutes.js` está correto.
  - Reinstale as dependências com `npm install`.

- **Erro 401 (Token não fornecido ou inválido)**
  - Certifique-se de que o token JWT está armazenado no `localStorage` do frontend.
  - Verifique se o `JWT_SECRET` no `.env` corresponde ao usado no login.

- **PDF vazio ou com mensagem "Nenhuma aula encontrada"**
  - Confirme que existem aulas com `status: "Aguardando"` no banco de dados para o mês selecionado.
  - Use o Prisma Studio (`npx prisma studio`) para inspecionar o banco.

- **CORS**
  - Se o frontend não se conectar ao backend, adicione o middleware CORS no `app.js`:
    ```javascript
    const cors = require('cors');
    app.use(cors());
    ```


## Licença

Este projeto não possui uma licença definida. Entre em contato com os mantenedores para mais informações.