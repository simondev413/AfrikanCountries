import express from "express";
import cors from "cors";
import { Request, Response } from "express";

import countryRoutes from "./routes/countryRoutes";
import userRoutes from "./routes/userRoutes";
import authRoutes from "./routes/authRoutes";

import { authMiddleware } from "./middlewares/authMiddlewares";
import {auditMiddleware} from "./middlewares/auditMiddlewares";
import { requireRole } from "./middlewares/rolesMiddlewares";

import { getAuditLogs } from "./controllers/auditController";



const app = express(); //Criação da aplicação Express

//Middlewares
app.use(express.json()); //Middleware para interpretar JSON no corpo das requisições
app.use(cors()); //Habilitação do CORS para permitir requisições de diferentes origens
app.use(auditMiddleware)

//Configuração das rotas

// Home API Page
const homePage = (req: Request, res: Response) => {
  res.send(
    "<h1>Welcome to Afrikan Countries API</h1><p>Explore information about African countries and manage user accounts.</p>"
);
};

//Home Route
app.get("/api/v1", homePage); //Rota inicial da API

//Audit Logs Route (protected)
app.get("/api/v1/audits",authMiddleware,requireRole('admin'), getAuditLogs); //Rota para obter logs de auditoria



//Auth
app.post("/api/v1/login", authRoutes); //Rota para login de usuários

// Countries
// Rotas publicas para obter informações sobre países
app.get("/api/v1/countries", countryRoutes); //Rota para obter a lista de países
app.get("/api/v1/countries/:id", countryRoutes); //Rota para obter detalhes de um país específico

// Rotas protegidas para operações administrativas em países
app.post("/api/v1/countries",authMiddleware,requireRole('admin'),countryRoutes); //Rota para adicionar um novo país
app.put("/api/v1/countries/:id",authMiddleware,requireRole('admin'), countryRoutes); //Rota para atualizar informações de um país
app.delete("/api/v1/countries/:id",authMiddleware,requireRole('admin'), countryRoutes); //Rota para remover um país

//Users
app.get("/api/v1/users", userRoutes);
app.get("/api/v1/users/:id", userRoutes);


app.post("/api/v1/register/users",authMiddleware,auditMiddleware,requireRole('admin'), userRoutes);
app.put("/api/v1/users/:id",authMiddleware,requireRole('admin'), userRoutes);
app.delete("/api/v1/users/:id",authMiddleware,requireRole('admin'), userRoutes);

export default app; //Exportação da aplicação para uso em outros módulos
