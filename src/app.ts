import express from "express";
import cors from "cors";
import countryRoutes from "./routes/countryRoutes";


const app = express(); //Criação da aplicação Express

//Middlewares
app.use(express.json()); //Middleware para interpretar JSON no corpo das requisições
app.use(cors()); //Habilitação do CORS para permitir requisições de diferentes origens


//Configuração das rotas
app.get("/countries",countryRoutes) //Rota para obter a lista de países
app.get("/countries/:name",countryRoutes) //Rota para obter detalhes de um país específico
app.post("/countries",countryRoutes) //Rota para adicionar um novo país
app.put("/countries/:name",countryRoutes) //Rota para atualizar informações de um país
app.delete("/countries/:name",countryRoutes) //Rota para remover um país


export default app; //Exportação da aplicação para uso em outros módulos
