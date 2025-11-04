import { Router } from "express";
import { UsuarioController } from "../../controllers/usuario.controller.js";

const usuarioRouter = Router();
const usuarioController = new UsuarioController();

// Rutas
usuarioRouter.post("/signup", usuarioController.signup.bind(usuarioController));
usuarioRouter.post("/login", usuarioController.login.bind(usuarioController));
usuarioRouter.get("/",usuarioController.getAll.bind(usuarioController));

export default usuarioRouter;
