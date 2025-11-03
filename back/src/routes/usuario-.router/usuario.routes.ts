import { Router } from "express";
import { UsuarioController } from "../../controllers/usuario.controller.js";

const router = Router();
const usuarioController = new UsuarioController();

// Rutas
router.post("/signup", (req, res) => usuarioController.signup(req, res));
router.post("/login", (req, res) => usuarioController.login(req, res));
router.get("/", (req, res) => usuarioController.getAll(req, res));

export default router;
