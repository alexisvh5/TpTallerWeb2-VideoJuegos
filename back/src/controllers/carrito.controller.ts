import { type Request, type Response } from "express";
import { CarritoRepository } from "../repository/carrito.repository.js";
import { CarritoService } from "../services/carrito.service.js";


const carritoRepository = new CarritoRepository();

const carritoService = new CarritoService(carritoRepository);

export class CarritoController {

  async obtenerCarrito(req, res) {
    const idUsuario = Number(req.params.idUsuario);
    const carrito = await carritoService.obtenerCarrito(idUsuario);
    res.json(carrito);
  }

  async agregarJuego(req, res) {
    const { idUsuario, idJuego } = req.body;
    const result = await carritoService.agregarJuegoAlCarrito(idUsuario, idJuego);
    res.status(201).json(result);
  }

  async eliminarJuego(req, res) {
    const { idUsuario, idJuego } = req.body;
    const result = await carritoService.eliminarJuegoDelCarrito(idUsuario, idJuego);
    res.json(result);
  }

  async vaciar(req, res) {
    const { idUsuario } = req.body;
    const result = await carritoService.vaciarCarrito(idUsuario);
    res.json(result);
  }
}
