import { Router } from "express";
import {
  updateCountry,
  createCountry,
  getAllCountries,
  getCountryById,
  deleteCountry
} from "../controllers/countryContrrolers";

//Criação do roteador para as rotas de país
const router = Router();

router.get("/api/v1/countries", getAllCountries); //Rota para obter todos os países
router.get("/api/v1/countries/:id", getCountryById);//Rota para obter um país por ID

router.post("/api/v1/countries", createCountry); //Rota para criar um novo país
router.put("/api/v1/countries/:id", updateCountry); //Rota para atualizar um país existente
router.delete("/api/v1/countries/:id", deleteCountry); //Rota para remover um país (opcional  )

export default router;