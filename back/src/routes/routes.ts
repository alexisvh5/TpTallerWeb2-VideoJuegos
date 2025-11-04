import { Router } from "express";
import usuarioRouter from "./usuario.router/usuario.routes.js";

export class AppRoutes {

    static get routes():Router {

        const  router = Router();

        router.use('/api/usuario',usuarioRouter)

        return router;
    }

}