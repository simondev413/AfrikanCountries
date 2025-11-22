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

router.get("/countries", getAllCountries); //Rota para obter todos os países
router.get("/countries/:id", getCountryById);//Rota para obter um país por ID
router.post("/countries", createCountry); //Rota para criar um novo país
router.put("/countries/:id", updateCountry); //Rota para atualizar um país existente
router.delete("/countries/:id", deleteCountry); //Rota para remover um país (opcional  )

export default router;