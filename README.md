🌍 Afrikan Countries API – README.md

# 🌍 Afrikan Countries API

A **Afrikan Countries API** é uma API construída com **Node.js**, **TypeScript** e **TypeORM**, conectada a um banco de dados **MySQL**, com o objetivo de disponibilizar informações sobre os países do continente africano, como:

- Nome
- Capital
- Região
- População
- Código CCA2 / CCA3
- Localização geográfica (latitude/longitude)
- Bandeira

Esta API é ideal para estudos, integração em apps educativos, dashboards geográficos, e aplicações que precisem de dados estruturados sobre países africanos.

---

## 🚀 Tecnologias Utilizadas

- **Node.js**
- **TypeScript**
- **Express**
- **TypeORM**
- **MySQL**
- **ts-node-dev**
- **dotenv**

---

## 📌 Pré-requisitos

Antes de iniciar, você precisar ter instalado:

- **Node.js 18+**
- **MySQL 8+**
- **npm ou yarn**

---

## 🔧 Como executar o projeto

### 1️⃣ Clonar o repositório

```bash
git clone https://github.com/seu-usuario/african-countries-api.git
cd african-countries-api


---

2️⃣ Instalar dependências

npm install


---

3️⃣ Configurar variáveis de ambiente

Crie o arquivo:

.env

Conteúdo:

PORT=3333

DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=sua_senha
DB_DATABASE=africa_db


---

4️⃣ Executar migrations

npm run typeorm migration:run


---

5️⃣ Iniciar o servidor

Modo desenvolvimento (com reload automático):

npm run dev


---

📂 Estrutura do Projeto

src/
  ├── controllers/
  │     └── GetCountriesController.ts
  ├── database/
  │     ├── migrations/
  │     └── data-source.ts
  ├── entities/
  │     └── Country.ts
  ├── routes/
  │     └── index.ts
  ├── services/
  │     └── GetCountriesService.ts
  └── server.ts


---

📚 Endpoints Disponíveis

🔹 GET /countries

Retorna todos os países.

Exemplo:

GET http://localhost:3333/countries

❗ Filtro opcional por nome

GET http://localhost:3333/countries?name=angola


---

📤 Exemplo de Resposta (JSON)

[
  {
    "id": 1,
    "name": "Angola",
    "capital": "Luanda",
    "region": "Africa",
    "subregion": "Sub-Saharan Africa",
    "population": 32866272,
    "cca2": "AO",
    "cca3": "AGO",
    "flag": "https://flagcdn.com/ao.svg",
    "latitude": -8.8383,
    "longitude": 13.2344
  }
]


---

🛠 Scripts Úteis

Script	Ação

npm run dev	Inicia servidor em modo dev
npm run build	Compila TypeScript
npm run start	Executa código compilado
npm run typeorm	Acessa CLI do TypeORM



---

🤝 Contribuições

Pull requests são bem-vindos!
Para grandes alterações, abra uma issue antes para discutirmos detalhes.


---

📜 Licença

MIT License © 2025
