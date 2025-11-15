import { Router } from "express";
import usuarioRouter from "./usuario.router/usuario.routes.js";
import carritoRouter from "./usuario.router/carrito.routes.js";
import juegoRouter from "./juego.router/juego.routes.js";
import compraRouter from "./compra.router/compra.routes.js";

export class AppRoutes {

    static get routes():Router {

        const  router = Router();

        router.use('/api/carrito',carritoRouter)
        router.use('/api/usuario',usuarioRouter);
        router.use('/api/juego',juegoRouter);
        router.use('/api/comprar', compraRouter);

        return router;
    }

}