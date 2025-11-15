import { Router } from "express";
import { JuegoController } from "../../controllers/juego.controller.js";

const juegoRouter = Router();
const juegoController = new JuegoController();


juegoRouter.get("/",juegoController.getAll.bind(juegoController));
juegoRouter.get("/buscar", juegoController.buscarPorNombre.bind(juegoController));
juegoRouter.get("/generos",juegoController.getGeneros.bind(juegoController));
juegoRouter.get("/genero/:genero",juegoController.getJuegosPorGenero.bind(juegoController));//genero se pasa por query creo
juegoRouter.get("/new/nuevos",juegoController.getJuegosNuevos.bind(juegoController));// este no va es para probar
juegoRouter.post("/agregar", juegoController.agregarJuego.bind(juegoController));
juegoRouter.delete("/eliminar/:id", juegoController.eliminarJuego.bind(juegoController));
juegoRouter.put("/modificar/:id", juegoController.modificarJuego.bind(juegoController));
juegoRouter.get("/:id",juegoController.getById.bind(juegoController));


export default juegoRouter;
