import { type Request, type Response } from "express";
import { CarritoRepository } from "../repository/carrito.repository.js";
import { CarritoService } from "../services/carrito.service.js";

const carritoRepository = new CarritoRepository();

const carritoService = new CarritoService(carritoRepository);

export class CarritoController {
  async obtenerCarrito(req, res) {
    try {
      const idUsuario = Number(req.params.idUsuario);
      if (isNaN(idUsuario)) {
        return res.status(400).json({ error: "ID de usuario inválido" });
      }

      const carrito = await carritoService.obtenerCarrito(idUsuario);
      res.json(carrito);
    } catch (error: any) {
      res.status(500).json({ error: error.message || "Error al obtener el carrito" });
    }
  }

  async agregarJuego(req, res) {
    try {
      const { idUsuario, idJuego } = req.body;
      if (!idUsuario || !idJuego) {
        return res.status(400).json({ error: "Faltan datos requeridos" });
      }

      const result = await carritoService.agregarJuegoAlCarrito(idUsuario, idJuego);
      res.status(201).json(result);
    } catch (error: any) {
      res.status(500).json({ error: error.message || "Error al agregar el juego" });
    }
  }

  async eliminarJuego(req, res) {
    try {
      const { idUsuario, idJuego } = req.body;
      if (!idUsuario || !idJuego) {
        return res.status(400).json({ error: "Faltan datos requeridos" });
      }

      const result = await carritoService.eliminarJuegoDelCarrito(idUsuario, idJuego);
      res.json(result);
    } catch (error: any) {
      res.status(500).json({ error: error.message || "Error al eliminar el juego" });
    }
  }

  async vaciar(req, res) {
    try {
      const { idUsuario } = req.body;
      if (!idUsuario) {
        return res.status(400).json({ error: "Falta el ID de usuario" });
      }

      const result = await carritoService.vaciarCarrito(idUsuario);
      res.json(result);
    } catch (error: any) {
      res.status(500).json({ error: error.message || "Error al vaciar el carrito" });
    }
  }
}

