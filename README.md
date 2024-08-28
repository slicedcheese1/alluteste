# Allu full stack - Estou disponibilizando este projeto para seletiva do Laboratório Nexus.

Este repositório foi criado para seleção do laboratório nexus. Sobre o projeto, o Backend foi desenvolvido usando NestJS. Ele inclui funcionalidades de criação de usuários, autenticação, mapeamento de banco de ados com TypeORM, e está configurado para rodar em um ambiente Docker com uma instância MySQL. Também desenvolvi uma seed para o banco de dados para povoá-lo antes de iniciar o server.
O Frontend foi criado utilizando React com Vite, Material UI Design e styled-components. Além de utilizar axios para fazer as requisições e react-query para gestão de algumas rotas que utilizam cache para melhorar a performance da aplicação

## Requisitos para conseguir rodar o projeto sem dor de cabeça:

1. Possuir o node instalado. Versão utilizada no projeto: v18.15.0
2. Possuir o npm instalado. Versão utilizada no projeto: v9.5.0
3. Possuir o docker instalado. Versão utilizada no projeto: Docker version 24.0.4, build 3713ee1
4. Possuir o docker compose instalado. Versão utilizada no projeto: Docker Compose version v2.19.1

## Inicialização simplificada:

### Instalação

1. Clone o repositório:

   ```sh
   git clone <URL_DO_REPOSITORIO>
   ```

2. Navegue até o diretório do projeto:

   ```sh
   cd Allu-technical-test
   ```

3. Navegue até o diretório do backend do projeto:

   ```sh
   cd backend
   ```

4. Instale as dependências:

   ```sh
   npm install
   ```

5. Navegue até o diretório raíz do projeto:

   ```sh
   cd ..
   ```

6. Navegue até o diretório do frontend projeto:

   ```sh
   cd frontend
   ```

7. Instale as dependências:

   ```sh
   npm install
   ```

8. Navegue até o diretório raíz do projeto:

   ```sh
   cd ..
   ```

9. Rode o comando no terminal:

   ```sh
   docker compose up --build
   ```

10. Para checar os endpoints, foi feito a documentação do mesmo utilizando Swagger. Então abra o navegador e coloque a URL:

    ```sh
    http://localhost:3000/api
    ```

11. Para abrir o frontend da aplicação, coloque no navegador a URL:
    ```sh
    http://localhost:5173
    ```

