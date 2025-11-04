import { Router } from "express";
import { CarritoController } from "../../controllers/carrito.controller.js";

const carritoRouter = Router();
const carritoController = new CarritoController();

carritoRouter.get("/:idUsuario", carritoController.obtenerCarrito.bind(carritoController));
carritoRouter.post("/agregar", carritoController.agregarJuego.bind(carritoController));
carritoRouter.delete("/eliminar", carritoController.eliminarJuego.bind(carritoController));
carritoRouter.delete("/vaciar", carritoController.vaciar.bind(carritoController));

export default carritoRouter;
