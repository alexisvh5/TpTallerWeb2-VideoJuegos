import { type Request, type Response } from "express";
import { JuegoRepository } from "../repository/juego.repository.js";
import { JuegoService } from "../services/juego.service.js";

const juegoRepository = new JuegoRepository();
const juegoService = new JuegoService(juegoRepository);

export class JuegoController {

  async agregarJuego(req: Request, res: Response) {
  
    try {
      const nuevoJuego = await juegoService.agregarJuego(req.body);
      res.status(201).json({ mensaje: "Juego agregado correctamente", juego: nuevoJuego });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  
  }

  async getAll(req: Request, res: Response) {
    try {
      const juegos = await juegoService.getAllJuegos();
      res.status(200).json(juegos);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Id inválido" });
      }
      const juego = await juegoService.getJuegoById(id);
      if (!juego) {
        return res.status(404).json({ message: "Juego no encontrado" });
      }
      res.status(200).json(juego);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async getJuegosPorGenero(req: Request, res: Response) {
    try {
      const { genero } = req.params;

      if (!genero || genero.trim() === "") {
        return res
          .status(400)
          .json({ message: "El parámetro 'genero' es requerido" });
      }

      const generoEnMayusculas = genero.toUpperCase(); // en la bbdd tenemos ACCION , AVENTURA y asi
      const juegos = await juegoService.getJuegosPorGenero(generoEnMayusculas);

      if (juegos.length === 0) {
        return res
          .status(404)
          .json({ message: "No se encontraron juegos para ese genero" });
      }

      res.status(200).json(juegos);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async getJuegosNuevos(req: Request, res: Response) {
    try {
      const juegos = await juegoService.getJuegosNuevos();
      if (juegos.length === 0) {
        return res
          .status(404)
          .json({ message: "No se encontraron nuevos juegos" });
      }
      res.status(200).json(juegos);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async eliminarJuego(req: Request, res: Response){
    try{
      const id = Number(req.params.id);
      if(isNaN(id)){
        return  res.status(400).json({message:"Id inválido"});
      }

      await juegoService.eliminarJuego(id);
      res.status(200).json({message:'Juego eliminado correctamente'});
    } catch(error:any){
      res.status(500).json({error: error.message});
    }
  }

}
