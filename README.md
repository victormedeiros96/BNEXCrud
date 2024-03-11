# BNEX PRODUCT MANAGER

## Introdução

Esse projeto trata-se de uma POC (proof of concept), para integração e deploy de um CRUD utilizando as tecnologias Python/Django, React JS, e Docker.

<img src="https://static.vecteezy.com/system/resources/previews/019/629/263/original/cobra-icon-vector.jpg" >

## Parte 1 | Arquitetura Back-End

O Back-end consiste em uma API para controle (CRUD) de produtos, com sistema autenticação, autorização, e logging, que consome de um banco de dados Postgresql, e foi escrita em Django, com o Django Rest Framework.

## Parte 2 | Arquitetura Front-End

O Front-end foi criado com os frameworks React-js e Materialize CSS, e consome a API gerada pelo backend. 

## Parte 3 | Infraestrutura

Utilizando o orquestrador Docker compose, foi estruturada uma infraestrutura para gerenciar os containers de banco de dados, back-end e front-end, de forma a tornar facilmente replicável o projeto de estudo.

## Requisitos

Para rodar este projeto, você precisará ter instalado em sua máquina:

- Docker: Para criar e gerenciar os containers necessários para o banco de dados, back-end e front-end.
- Docker Compose: Para facilitar a configuração e a execução de múltiplos containers Docker.

Instruções de instalação para o Docker e o Docker Compose podem ser encontradas nos seguintes links:

- Docker: [Get Docker](https://docs.docker.com/get-docker/)
- Docker Compose: [Install Docker Compose](https://docs.docker.com/compose/install/)

## Como Executar

1. Clone o repositório para sua máquina local usando o seguinte comando: 
git clone https://github.com/victormedeiros96/BNEXCrud.git

2. Navegue até a pasta da infraestrutura:
cd  BNEXCrud/infra

3. Antes de iniciar os serviços, ajuste a variável de ambiente `REACT_APP_API_URL` no arquivo docker-compose.yml, para representar o endereço local.

4. Para iniciar todos os serviços, execute o seguinte comando na pasta infra:

docker-compose up

5. Após todos os serviços estarem rodando, o front-end estará acessível em `http://localhost:3000`, e o back-end responderá em `http://localhost:8000`.
