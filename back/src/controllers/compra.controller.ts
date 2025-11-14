import { type Request, type Response } from "express";
import { CarritoRepository } from "../repository/carrito.repository.js";
import { CompraRepository } from "../repository/compra.repository.js";
import { CompraService } from "../services/compra.service.js";

const compraRepository = new CompraRepository();
const carritoRepository = new CarritoRepository();
const compraService = new CompraService(compraRepository, carritoRepository);

export class CompraController {
    async comprar(req:Request, res:Response){
        try{
            const idUsuario = Number(req.body.idUsuario);
            const compra = await compraService.realizarCompra(idUsuario);

            return res.status(201).json({
                message: 'Compra realizada con exito', compra
            });
        } catch(error){
            res.status(400).json({error: error.message})
        }
    }
}