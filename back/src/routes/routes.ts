import { Router } from "express";
import usuariosRouter from "./usuario-.router/usuario.routes.js";

export class AppRoutes {

    static get routes():Router {

        const  router = Router();

        router.use('/api/usuarios',usuariosRouter)

        return router;
    }

}