import app from "./app";
import { AppDataSource } from "./database/data-source";
import * as dotenv from "dotenv";
dotenv.config();

console.log(process.env.DB_NAME);
//Definição da porta do servidor
const PORT = process.env.PORT || 3001; //Definição da porta do servidor

//Inicialização da fonte de dados
AppDataSource.initialize()
    .then(() => {
        //Fonte de dados inicializada com sucesso
        console.log("Data Source has been initialized!");
    })
    .catch((err) => {
        //Erro durante a inicialização da fonte de dados
        console.error("Error during Data Source initialization:", err);
    });

//Início do servidor
function onListen(){
    console.log(`Server is running on http://localhost:${PORT}`);
}


app.listen(PORT, onListen); //Início do servidor na porta definida 