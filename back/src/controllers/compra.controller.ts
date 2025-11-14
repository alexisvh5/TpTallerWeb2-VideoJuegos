import { type Request, type Response } from "express";
import { CarritoRepository } from "../repository/carrito.repository.js";
import { CompraRepository } from "../repository/compra.repository.js";
import { CompraService } from "../services/compra.service.js";
import { JuegoRepository } from "../repository/juego.repository.js";

const compraRepository = new CompraRepository();
const carritoRepository = new CarritoRepository();
const juegoRepository = new JuegoRepository();
const compraService = new CompraService(compraRepository, carritoRepository, juegoRepository);

export class CompraController {
    async comprar(req:Request, res:Response){
        try{
            const idUsuario = Number(req.body.idUsuario);
            const compra = await compraService.realizarCompra(idUsuario);

            return res.status(201).json({
                message: 'Compra realizada con exito', compra
            });
        } catch(error){
            return res.status(400).json({error: error.message})
        }
    }

    async comprarJuegoIndividual(req:Request, res:Response){
        try {
            const idUsuario = Number(req.body.idUsuario);
            const idJuego = Number(req.body.idJuego);

            const compra = await compraService.realizarCompraIndividual(idUsuario, idJuego);

            return res.status(201).json({
                message: 'Compra realizada con exito', compra
            });
        } catch (error) {
            return res.status(400).json({error: error.message});
        }
    }


    async getAllCompras(req:Request, res:Response){
        try {
            const compras= await compraService.getAllCompras();
            res.status(200).json(compras);
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    }

    async getComprasByUsuario(req:Request, res:Response){
        try {
            const idUsuario = await Number(req.params.idUsuario);

            const compras = await compraService.obtenerCompraByUsuario(idUsuario);

            return res.status(200).json({
                message: 'Compras del usuario obtenidas', compras
            });
        } catch (error) {
            return res.status(400).json({error: error.message});
        }
    }
}