import { Request,Response } from "express";
import { AppDataSource } from "../database/data-source";
import { Country } from "../entities/Country";

const countryRepository = AppDataSource.getRepository(Country); //obtém o repositório para a entidade Country



//Controlador para obter todos os países
export const getAllCountries = async (req: Request, res: Response): Promise<Response> => {
    try {
        const countries =  await countryRepository.find(); //busca todos os países no banco de dados        
        return res.status(200).json(countries); //retorna a lista de países com status 200
    }
    catch (error) {
        return res.status(500).json({message: "Internal Server Error"}); //retorna erro 500 em caso de falha
    }
}

//Controlador para obter um país por ID
export const getCountryById = async (req: Request, res: Response): Promise<Response> => {
    const id = parseInt(req.params.id); //obtém o ID do país a partir dos parâmetros da requisição
    try {
        const country = await countryRepository.findOneBy({id}); //busca o país pelo ID no banco de dados
        if (!country) {
            return res.status(404).json({message: "Country not found"}); //retorna erro 404 se o país não for encontrado
        }       
        return res.status(200).json(country); //retorna o país encontrado com status 200
    }
    catch (error) {
        return res.status(500).json({message: "Internal Server Error"}); //retorna erro 500 em caso de falha
    }
}

//Controlador para criar um novo país
export const createCountry = async (req:Request,resp:Response): Promise<Response> => {
    const countryData = req.body; //obtém os dados do país a partir do corpo da requisição
    try {
        const newCountry = countryRepository.create(countryData); //cria uma nova entidade Country com os dados fornecidos
        const savedCountry = await countryRepository.save(newCountry); //salva a nova entidade no banco de dados
        return resp.status(201).json(savedCountry); //retorna o país criado com status 201
    }
    catch (error) {
        return resp.status(500).json({message: "Internal Server Error"}); //retorna erro 500 em caso de falha
    }       
}

//Controlador para atualizar um país existente
export const updateCountry = async (req:Request,resp:Response): Promise<Response> => {
    const id = parseInt(req.params.id); //obtém o ID do país a partir dos parâmetros da requisição
    const countryData = req.body; //obtém os dados atualizados do país a partir do corpo da requisição
    try {
        const country = await countryRepository.findOneBy({id}); //busca o país pelo ID no banco de dados       
        if (!country) {
            return resp.status(404).json({message: "Country not found"}); //retorna erro 404 se o país não for encontrado
        }
        countryRepository.merge(country, countryData); //mescla os dados atualizados na entidade existente
        const updatedCountry = await countryRepository.save(country); //salva a entidade atualizada no banco de dados
        return resp.status(200).json(updatedCountry); //retorna o país atualizado com status 200
    } 
    catch (error) {
        return resp.status(500).json({message: "Internal Server Error"}); //retorna erro 500 em caso de falha
    }   
}

//Delete controlador para remover um país (opcional)
export const deleteCountry = async (req:Request,resp:Response): Promise<Response> => {
    const id = parseInt(req.params.id); //obtém o ID do país a partir dos parâmetros da requisição  
    try {
        const country = await countryRepository.findOneBy({id}); //busca o país pelo ID no banco de dados       
        if (!country) {
            return resp.status(404).json({message: "Country not found"}); //retorna erro 404 se o país não for encontrado
        }
        await countryRepository.remove(country); //remove o país do banco de dados
        return resp.status(204).send(); //retorna status 204 (No Content) indicando sucesso na remoção
    }
    catch (error) {
        return resp.status(500).json({message: "Internal Server Error"}); //retorna erro 500 em caso de falha
    }
}