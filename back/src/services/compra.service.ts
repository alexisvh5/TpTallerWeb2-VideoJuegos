import { CompraRepository } from "../repository/compra.repository.js";
import { CarritoRepository } from "../repository/carrito.repository.js";
import { JuegoRepository } from "../repository/juego.repository.js";

export class CompraService{

    constructor(private compraRepository:CompraRepository, private carritoRepository:CarritoRepository, private juegoRepository:JuegoRepository){}

    async realizarCompra(idUsuario:number){
        const carrito = await this.carritoRepository.getCarritoByUsuario(idUsuario);

        if(!carrito || carrito.CarritoJuego.length === 0){
            throw new Error('El carrito esta vacio.')
        }

        const items = carrito.CarritoJuego.map(cj => ({
            idJuego: cj.Juego.id,
            precio: cj.Juego.precio
        }));

        const totalAPagar = items.reduce(
            (acc, item) => acc + Number(item.precio), 0
        );

        const compra = await this.compraRepository.createCompraConItems(
            idUsuario, items, totalAPagar, carrito.id
        );
        return compra;
    }

    async realizarCompraIndividual(idUsuario:number, idJuego:number){        
        const juego = await this.juegoRepository.findJuegoById(idJuego);

        if(!juego){
            throw new Error('Juego no encontrado o null.')
        }

        const item = [{
            idJuego: juego.id,
            precio: juego.precio
        }];

        const compra = await this.compraRepository.createCompraConItems(
            idUsuario, item, Number(juego.precio), undefined
        );
        return compra;
    }

    async getAllCompras(){
        return await this.compraRepository.getAll();
    }

    async obtenerCompraByUsuario(idUsuario:number){
        const compras = this.compraRepository.getComprasByUsuario(idUsuario);

        if(!compras){
            throw new Error('No hay compras registradas en el usuario');
        }

        return compras;
    }
}


    
