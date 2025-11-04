import { Router } from "express";
import { UsuarioController } from "../../controllers/usuario.controller.js";

const usuariosRouter = Router();
const usuarioController = new UsuarioController();

// Rutas
usuariosRouter.post("/signup", (req, res) => usuarioController.signup(req, res));
usuariosRouter.post("/login", (req, res) => usuarioController.login(req, res));
usuariosRouter.get("/", (req, res) => usuarioController.getAll(req, res));

export default usuariosRouter;
