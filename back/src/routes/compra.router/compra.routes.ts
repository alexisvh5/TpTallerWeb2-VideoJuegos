import { Router } from "express";
import { CompraController } from "../../controllers/compra.controller.js";

const compraRouter = Router();
const compraController = new CompraController();

compraRouter.post('/checkout', compraController.comprar.bind(compraController));

export default compraRouter;