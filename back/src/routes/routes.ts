import { Router } from "express";
import usuarioRouter from "./usuario.router/usuario.routes.js";
import juegoRouter from "./juego.router/juego.routes.js";

export class AppRoutes {

    static get routes():Router {

        const  router = Router();

        router.use('/api/usuario',usuarioRouter);
        router.use('/api/juego',juegoRouter);

        return router;
    }

}