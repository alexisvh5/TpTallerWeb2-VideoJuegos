import { type Request, type Response } from "express";
import { JuegoRepository } from "../repository/juego.repository.js";
import { JuegoService } from "../services/juego.service.js";
import { parse } from "path";

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

      const { nombre, genero, precioMin, precioMax } = req.query;
      const where = {};

      if(genero && genero !== "Cualquiera"){
        where['categoria'] = genero as string;
      }

      if(precioMin || precioMax){
        where['precio'] = {};

        if(precioMin){
          where['precio']['gte'] = parseFloat(precioMin as string);
        }
        if(precioMax){
          where['precio']['lte'] = parseFloat(precioMax as string);
        }
      }

      console.log('Where object:', where);
      const juegos = await juegoService.getAllJuegos({ where });
      res.status(200).json(juegos);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async getGeneros(req: Request, res: Response) {
    try {
      const generos = await juegoService.getGeneros();
      res.status(200).json(generos);
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

  async modificarJuego(req: Request, res: Response){
    try{
      const id = Number(req.params.id);
      if(isNaN(id)){
        return  res.status(400).json({message:"Id inválido"});
      }

      const juegoModificado = await juegoService.modificarJuego(id, req.body);
      res.status(200).json({message:"Juego modificado correctamente", juego: juegoModificado});
    } catch(error:any){
      res.status(500).json({error: error.message});
    }
  }

}
