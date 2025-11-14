import { Router } from "express";
import { CompraController } from "../../controllers/compra.controller.js";

const compraRouter = Router();
const compraController = new CompraController();

compraRouter.get('/usuario/:idUsuario', compraController.getComprasByUsuario.bind(compraController));
compraRouter.post('/checkout', compraController.comprar.bind(compraController));
compraRouter.post('/adquirir', compraController.comprarJuegoIndividual.bind(compraController));
compraRouter.get('/', compraController.getAllCompras.bind(compraController));


export default compraRouter;